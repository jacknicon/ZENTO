import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import type { Course, PlanItem, Year, Quarter, EnrollmentTerm, ManualEdge } from './types/syllabus';
import { calculateGraduationRequirements } from './utils/graduationChecker';
import { validatePrerequisites, getHighlightContext, normalizeName, isQuarterAvailable } from './utils/prerequisiteChecker';
import { savePlanToLocalStorage, loadPlanFromLocalStorage } from './utils/storage';
import { calculateGpaSummary } from './utils/gpaCalculator';

import { Header } from './components/Header';
import { CourseCatalog } from './components/CourseCatalog';
import { TimelineCanvas } from './components/TimelineCanvas';
import { GraduationDashboard } from './components/GraduationDashboard';
import { SubjectDetailDrawer } from './components/SubjectDetailDrawer';
import { NetworkGraphModal } from './components/NetworkGraphModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { QuarterPickerModal } from './components/QuarterPickerModal';
import { DisclaimerModal } from './components/DisclaimerModal';
import { PresetModelModal } from './components/PresetModelModal';
import { AiConsultModal } from './components/AiConsultModal';
import { UsageModal } from './components/UsageModal';
import type { PresetModel } from './data/presetModels';

import rawSyllabusData from './data/syllabus_data.json';
import rawManualEdges from './data/manual_edges.json';

export const App: React.FC = () => {
  const courses: Course[] = rawSyllabusData as Course[];
  const manualEdges: ManualEdge[] = rawManualEdges as ManualEdge[];

  const coursesMap = useMemo(() => {
    const map = new Map<string, Course>();
    courses.forEach((c) => {
      map.set(c.科目名, c);
      map.set(normalizeName(c.科目名), c);
    });
    return map;
  }, [courses]);

  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [planTitle, setPlanTitle] = useState('マイ履修計画');
  const [selectedSubjectName, setSelectedSubjectName] = useState<string | null>(null);
  const [pickerCourse, setPickerCourse] = useState<Course | null>(null);
  const [isGraphModalOpen, setIsGraphModalOpen] = useState(false);
  const [isPresetModalOpen, setIsPresetModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isUsageModalOpen, setIsUsageModalOpen] = useState(false);
  const [mobileActiveTab, setMobileActiveTab] = useState<'timeline' | 'catalog' | 'dashboard'>('timeline');
  const [enrollmentTerm, setEnrollmentTerm] = useState<EnrollmentTerm>('spring');
  const [showArrows, setShowArrows] = useState(false);
  const [isDisclaimerAccepted, setIsDisclaimerAccepted] = useState(false);

  const [favoriteNames, setFavoriteNames] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('zento_favorites_v1');
      if (saved) {
        return new Set(JSON.parse(saved));
      }
    } catch (e) {}
    return new Set();
  });

  const handleToggleFavorite = (subjectName: string) => {
    setFavoriteNames((prev) => {
      const next = new Set(prev);
      if (next.has(subjectName)) {
        next.delete(subjectName);
      } else {
        next.add(subjectName);
      }
      try {
        localStorage.setItem('zento_favorites_v1', JSON.stringify(Array.from(next)));
      } catch (e) {}
      return next;
    });
  };

  useEffect(() => {
    const loaded = loadPlanFromLocalStorage();
    if (loaded && loaded.plan && loaded.plan.length > 0) {
      setPlan(loaded.plan);
      setPlanTitle(loaded.title || 'マイ履修計画');
    }
  }, []);

  useEffect(() => {
    savePlanToLocalStorage(plan, planTitle);
  }, [plan, planTitle]);

  const plannedNames = useMemo(() => {
    return new Set(plan.map((p) => p.subjectName));
  }, [plan]);

  const summary = useMemo(() => {
    return calculateGraduationRequirements(plan, coursesMap);
  }, [plan, coursesMap]);

  const gpaSummary = useMemo(() => {
    return calculateGpaSummary(plan, coursesMap);
  }, [plan, coursesMap]);

  const prereqStatusMap = useMemo(() => {
    return validatePrerequisites(plan, coursesMap);
  }, [plan, coursesMap]);

  const highlightContext = useMemo(() => {
    if (!selectedSubjectName) return null;
    return getHighlightContext(selectedSubjectName, plan, coursesMap);
  }, [selectedSubjectName, plan, coursesMap]);

  useEffect(() => {
    if (summary.unsatisfiedCount === 0 && summary.totalCredits >= 124 && plan.length > 0) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [summary, plan]);

  // Handle 2-Quarter and 4-Quarter Linked Drop Placement
  const handleDropCourseToSlot = (subjectName: string, year: Year, quarter: Quarter) => {
    const course = coursesMap.get(subjectName);
    const qStr = course?.開講Q || '';
    const methodStr = course?.授業の方法 || '';

    // Validate quarter availability (e.g. 1Q/3Q or 2Q/4Q restrictions)
    if (!isQuarterAvailable(qStr, quarter)) {
      alert(`「${subjectName}」は【${qStr}】開講のため、${quarter} には配置できません。`);
      return;
    }

    // On-demand courses are strictly single quarter (1Q, 2Q, 3Q, or 4Q only)
    const isOnDemand = methodStr.includes('オンデマンド');

    // Full-Year 4-Quarter courses
    const isFullYear = !isOnDemand && (qStr === '通年' || course?.科目名 === 'プロジェクト実践');

    // 2-Quarter paired courses (演習, ライブ映像, ゼミ, 1-2Q, 3-4Q)
    const isMultiQuarter =
      !isOnDemand &&
      !isFullYear &&
      (qStr.includes('1-2') ||
        qStr.includes('3-4') ||
        qStr.includes('連続') ||
        methodStr.includes('ライブ') ||
        methodStr.includes('演習') ||
        methodStr.includes('ゼミ'));

    let targetQuarters: Quarter[] = [quarter];

    if (isFullYear) {
      targetQuarters = ['1Q', '2Q', '3Q', '4Q'];
    } else if (isMultiQuarter) {
      if (quarter === '1Q' || quarter === '2Q') {
        targetQuarters = ['1Q', '2Q'];
      } else {
        targetQuarters = ['3Q', '4Q'];
      }
    }

    setPlan((prev) => {
      // Remove any existing placement for this subject
      const filtered = prev.filter((p) => normalizeName(p.subjectName) !== normalizeName(subjectName));

      // Add new items for all target quarters
      const newItems: PlanItem[] = targetQuarters.map((q) => ({
        id: `${subjectName}-${year}-${q}-${Date.now()}`,
        subjectName,
        year,
        quarter: q,
      }));

      return [...filtered, ...newItems];
    });
  };

  const handleSelectCourseFromCatalog = (course: Course) => {
    if (window.innerWidth < 1024) {
      setPickerCourse(course);
    } else {
      setSelectedSubjectName(course.科目名);
    }
  };

  const handleRemoveFromPlan = (subjectName: string) => {
    setPlan((prev) => prev.filter((p) => normalizeName(p.subjectName) !== normalizeName(subjectName)));
  };

  const selectedCourseObject = selectedSubjectName ? coursesMap.get(selectedSubjectName) || null : null;

  const handleImportFavorites = (names: string[]) => {
    setFavoriteNames((prev) => {
      const next = new Set([...Array.from(prev), ...names]);
      try {
        localStorage.setItem('zento_favorites_v1', JSON.stringify(Array.from(next)));
      } catch (e) {}
      return next;
    });
  };

  return (
    <div className="zento-layout">
      <DisclaimerModal
        isOpen={!isDisclaimerAccepted}
        onAccept={() => setIsDisclaimerAccepted(true)}
      />

      <Header
        planTitle={planTitle}
        setPlanTitle={setPlanTitle}
        summary={summary}
        coursesMap={coursesMap}
        plan={plan}
        setPlan={setPlan}
        favoriteNames={favoriteNames}
        onImportFavorites={handleImportFavorites}
        onOpenGraphModal={() => setIsGraphModalOpen(true)}
        onOpenPresetModal={() => setIsPresetModalOpen(true)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onOpenUsageModal={() => setIsUsageModalOpen(true)}
        showArrows={showArrows}
        setShowArrows={setShowArrows}
      />

      <div className="zento-main-container">
        <div
          style={{
            display: mobileActiveTab === 'catalog' || window.innerWidth >= 1024 ? 'flex' : 'none',
            flexDirection: 'column',
            height: '100%',
            overflow: 'hidden',
            minHeight: 0,
          }}
          className="zento-sidebar-left"
        >
          <CourseCatalog
            courses={courses}
            plannedNames={plannedNames}
            favoriteNames={favoriteNames}
            onToggleFavorite={handleToggleFavorite}
            onSelectCourse={handleSelectCourseFromCatalog}
            onDragStartCourse={(e, c) => e.dataTransfer.setData('text/plain', c.科目名)}
          />
        </div>

        <div
          style={{
            display: mobileActiveTab === 'timeline' || window.innerWidth >= 1024 ? 'flex' : 'none',
            flexDirection: 'column',
            height: '100%',
            flex: 1,
            overflow: 'hidden',
            minHeight: 0,
          }}
          className="zento-canvas-center"
        >
          <TimelineCanvas
            plan={plan}
            setPlan={setPlan}
            coursesMap={coursesMap}
            prereqStatusMap={prereqStatusMap}
            selectedSubject={selectedSubjectName}
            onSelectSubject={(name) => setSelectedSubjectName(name)}
            highlightContext={highlightContext}
            enrollmentTerm={enrollmentTerm}
            setEnrollmentTerm={setEnrollmentTerm}
            onDropCourseToSlot={handleDropCourseToSlot}
          />
        </div>

        <div
          style={{
            display: mobileActiveTab === 'dashboard' || window.innerWidth >= 1024 ? 'flex' : 'none',
            flexDirection: 'column',
            height: '100%',
            overflow: 'hidden',
            minHeight: 0,
          }}
          className="zento-sidebar-right"
        >
          <GraduationDashboard summary={summary} gpaSummary={gpaSummary} planItemCount={plan.length} />
        </div>
      </div>

      <MobileBottomNav
        activeTab={mobileActiveTab}
        setActiveTab={setMobileActiveTab}
        unsatisfiedCount={summary.unsatisfiedCount}
      />

      <SubjectDetailDrawer
        course={selectedCourseObject}
        onClose={() => setSelectedSubjectName(null)}
        isPlanned={selectedSubjectName ? plannedNames.has(selectedSubjectName) : false}
        highlightContext={highlightContext}
        onAddToPlan={(c) => {
          const defaultQ: Quarter = isQuarterAvailable(c.開講Q, '1Q')
            ? '1Q'
            : isQuarterAvailable(c.開講Q, '2Q')
            ? '2Q'
            : isQuarterAvailable(c.開講Q, '3Q')
            ? '3Q'
            : '4Q';
          handleDropCourseToSlot(c.科目名, 1, defaultQ);
        }}
        onRemoveFromPlan={handleRemoveFromPlan}
      />

      <QuarterPickerModal
        course={pickerCourse}
        onClose={() => setPickerCourse(null)}
        onSelectSlot={(y, q) => {
          if (pickerCourse) {
            handleDropCourseToSlot(pickerCourse.科目名, y, q);
          }
        }}
      />

      <PresetModelModal
        isOpen={isPresetModalOpen}
        onClose={() => setIsPresetModalOpen(false)}
        onApplyModel={(model: PresetModel, planItems: PlanItem[]) => {
          setPlan(planItems);
          setPlanTitle(`${model.name}モデル`);
        }}
      />

      <NetworkGraphModal
        isOpen={isGraphModalOpen}
        onClose={() => setIsGraphModalOpen(false)}
        courses={courses}
        plan={plan}
        manualEdges={manualEdges}
      />

      <AiConsultModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        plan={plan}
        setPlan={setPlan}
        summary={summary}
        coursesMap={coursesMap}
      />

      <UsageModal
        isOpen={isUsageModalOpen}
        onClose={() => setIsUsageModalOpen(false)}
      />
    </div>
  );
};

export default App;
