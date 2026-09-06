import React, { useState } from 'react';
import { Trash2, AlertTriangle, ExternalLink } from 'lucide-react';
import type { PlanItem, Year, Quarter, Course, EnrollmentTerm, PrerequisiteStatus, Grade } from '../types/syllabus';
import type { HighlightContext } from '../utils/prerequisiteChecker';
import { isPassedGrade, isFailedGrade } from '../utils/gpaCalculator';
import { normalizeName } from '../utils/prerequisiteChecker';
import { getCourseCategoryStyle } from '../utils/courseCategoryUtils';

interface TimelineCanvasProps {
  plan: PlanItem[];
  setPlan: React.Dispatch<React.SetStateAction<PlanItem[]>>;
  coursesMap: Map<string, Course>;
  prereqStatusMap: Map<string, PrerequisiteStatus>;
  selectedSubject: string | null;
  onSelectSubject: (name: string) => void;
  highlightContext: HighlightContext | null;
  enrollmentTerm: EnrollmentTerm;
  setEnrollmentTerm: (term: EnrollmentTerm) => void;
  onDropCourseToSlot: (subjectName: string, year: Year, quarter: Quarter) => void;
}

export const TimelineCanvas: React.FC<TimelineCanvasProps> = ({
  plan,
  setPlan,
  coursesMap,
  prereqStatusMap,
  onSelectSubject,
  highlightContext,
  enrollmentTerm,
  setEnrollmentTerm,
  onDropCourseToSlot,
}) => {
  const [dragOverCell, setDragOverCell] = useState<{ year: Year; quarter: Quarter } | null>(null);
  const [selectedMobileYear, setSelectedMobileYear] = useState<Year | 'all'>(
    typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 'all'
  );

  const years: Year[] = [1, 2, 3, 4];
  const quarters: Quarter[] = enrollmentTerm === 'spring' ? ['1Q', '2Q', '3Q', '4Q'] : ['3Q', '4Q', '1Q', '2Q'];

  const displayedYears = selectedMobileYear === 'all' ? years : [selectedMobileYear];

  const handleDragOver = (e: React.DragEvent, year: Year, quarter: Quarter) => {
    e.preventDefault();
    setDragOverCell({ year, quarter });
  };

  const handleDragLeave = () => {
    setDragOverCell(null);
  };

  const handleDrop = (e: React.DragEvent, year: Year, quarter: Quarter) => {
    e.preventDefault();
    setDragOverCell(null);

    const subjectName = e.dataTransfer.getData('text/plain');
    if (subjectName) {
      onDropCourseToSlot(subjectName, year, quarter);
    }
  };

  const handleRemoveItem = (e: React.MouseEvent, subjectName: string) => {
    e.stopPropagation();
    setPlan((prev) => prev.filter((item) => item.subjectName !== subjectName));
  };

  const handleGradeChange = (e: React.ChangeEvent<HTMLSelectElement>, subjectName: string) => {
    e.stopPropagation();
    const newGrade = e.target.value as Grade;
    setPlan((prev) =>
      prev.map((item) =>
        normalizeName(item.subjectName) === normalizeName(subjectName)
          ? { ...item, grade: newGrade }
          : item
      )
    );
  };

  const [capLimit, setCapLimit] = useState<number>(12);

  const getItemPerQuarterCredits = (item: PlanItem): number => {
    const course = coursesMap.get(item.subjectName);
    const totalCredits = course?.単位数 ?? 2;
    const numSlots = plan.filter((p) => p.subjectName === item.subjectName).length || 1;
    return totalCredits / numSlots;
  };

  return (
    <main className="flex-col" style={{ flex: 1, background: '#f8fafc', overflowY: 'auto' }}>
      {/* Top Bar for Control & Term selection */}
      <div
        className="flex-between"
        style={{
          background: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          padding: '6px 12px',
          fontSize: '0.78rem',
          flexWrap: 'wrap',
          gap: '6px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontWeight: 700, color: '#334155', fontSize: '0.72rem' }}>入学:</span>
            <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '9999px', padding: '2px' }}>
              <button
                onClick={() => setEnrollmentTerm('spring')}
                style={{
                  border: 'none',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: enrollmentTerm === 'spring' ? '#4f46e5' : 'transparent',
                  color: enrollmentTerm === 'spring' ? '#ffffff' : '#64748b',
                }}
              >
                春 (1Q~)
              </button>
              <button
                onClick={() => setEnrollmentTerm('fall')}
                style={{
                  border: 'none',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: enrollmentTerm === 'fall' ? '#4f46e5' : 'transparent',
                  color: enrollmentTerm === 'fall' ? '#ffffff' : '#64748b',
                }}
              >
                秋 (3Q~)
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: '#475569' }}>
            <span style={{ fontWeight: 700 }}>CAP:</span>
            <select
              value={capLimit}
              onChange={(e) => setCapLimit(Number(e.target.value))}
              style={{
                padding: '2px 5px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '0.72rem',
                background: '#ffffff',
                fontWeight: 700,
                color: '#4f46e5',
                cursor: 'pointer',
              }}
            >
              <option value={10}>10単位</option>
              <option value={12}>12単位(標準)</option>
              <option value={14}>14単位</option>
              <option value={16}>16単位</option>
            </select>
          </div>
        </div>

        {/* Mobile Year Filter Tabs */}
        <div className="mobile-year-tabs">
          <button
            onClick={() => setSelectedMobileYear('all')}
            className={`mobile-year-tab ${selectedMobileYear === 'all' ? 'active' : ''}`}
          >
            全年次
          </button>
          {years.map((y) => (
            <button
              key={y}
              onClick={() => setSelectedMobileYear(y)}
              className={`mobile-year-tab ${selectedMobileYear === y ? 'active' : ''}`}
            >
              {y}年次
            </button>
          ))}
        </div>
      </div>

      <div id="zento-timeline-board" style={{ flex: 1, padding: '8px', overflowX: 'auto' }}>
        <div className="timeline-grid" style={{ gridTemplateColumns: `repeat(${displayedYears.length}, 1fr)` }}>
          {displayedYears.map((year) => {
            const yearItems = plan.filter((p) => p.year === year);
            const uniqueSubjectNamesInYear = Array.from(new Set(yearItems.map((p) => p.subjectName)));
            const yearCredits = yearItems.reduce((sum, item) => sum + getItemPerQuarterCredits(item), 0);

            return (
              <div key={year} className="timeline-year-column">
                <div className="timeline-year-header">
                  <span>{year}年次</span>
                  <span style={{ fontSize: '0.72rem', opacity: 0.85, fontWeight: 500 }}>
                    計 {yearCredits} 単位 ({uniqueSubjectNamesInYear.length}科目)
                  </span>
                </div>

                {quarters.map((quarter) => {
                  const itemsInSlot = plan.filter((p) => p.year === year && p.quarter === quarter);
                  const isDragOver = dragOverCell?.year === year && dragOverCell?.quarter === quarter;
                  const slotCredits = itemsInSlot.reduce((sum, item) => sum + getItemPerQuarterCredits(item), 0);
                  const isCapExceeded = slotCredits > capLimit;

                  return (
                    <div
                      key={quarter}
                      onDragOver={(e) => handleDragOver(e, year, quarter)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, year, quarter)}
                      className={`quarter-cell ${isDragOver ? 'drag-over' : ''}`}
                    >
                      <div className="quarter-cell-header flex-between">
                        <span>{quarter}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ color: isCapExceeded ? '#be123c' : 'inherit', fontWeight: isCapExceeded ? 800 : 'normal' }}>
                            {itemsInSlot.length}科目 ({slotCredits}単位)
                          </span>
                          {isCapExceeded && (
                            <span
                              style={{
                                background: '#fef2f2',
                                color: '#be123c',
                                border: '1px solid #fecdd3',
                                padding: '0 4px',
                                borderRadius: '4px',
                                fontSize: '0.6rem',
                                fontWeight: 800,
                              }}
                              title={`推奨CAP上限 (${capLimit}単位) を超過しています`}
                            >
                              ⚠️ CAP超過
                            </span>
                          )}
                        </span>
                      </div>

                      {itemsInSlot.length === 0 ? (
                        <div
                          className="flex-center"
                          style={{
                            flex: 1,
                            color: '#cbd5e1',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            border: '1px dashed #e2e8f0',
                            borderRadius: '4px',
                            margin: '4px 0',
                            minHeight: '36px',
                          }}
                        >
                          ここに配置
                        </div>
                      ) : (
                        itemsInSlot.map((item) => {
                          const course = coursesMap.get(item.subjectName);
                          const status = prereqStatusMap.get(item.subjectName);

                          const qStr = course?.開講Q || '';
                          const methodStr = course?.授業の方法 || '';
                          const isOnDemand = methodStr.includes('オンデマンド');
                          const isFullYear = !isOnDemand && (qStr === '通年' || course?.科目名 === 'プロジェクト実践');
                          const isMultiQuarter =
                            !isOnDemand &&
                            !isFullYear &&
                            (qStr.includes('1-2') ||
                              qStr.includes('3-4') ||
                              qStr.includes('連続') ||
                              methodStr.includes('ライブ') ||
                              methodStr.includes('演習') ||
                              methodStr.includes('ゼミ'));
                          const badgeText = isFullYear ? '4Q通年' : isMultiQuarter ? '2Qペア' : null;

                          const itemPerQCredit = getItemPerQuarterCredits(item);
                          const courseTotalCredits = course?.単位数 ?? 2;
                          const numSlots = plan.filter((p) => p.subjectName === item.subjectName).length || 1;

                          let highlightClass = '';
                          if (highlightContext) {
                            if (highlightContext.prereqsSatisfied.has(item.subjectName)) {
                              highlightClass = 'highlight-prereq-ok';
                            } else if (highlightContext.prereqsMissing.has(item.subjectName)) {
                              highlightClass = 'highlight-prereq-missing';
                            } else if (highlightContext.successorsUnlocked.has(item.subjectName)) {
                              highlightClass = 'highlight-successor';
                            }
                          }

                          const hasWarn = status && !status.isOk;
                          const cardStyle = course ? getCourseCategoryStyle(course, false) : null;

                          return (
                            <div
                              key={item.id}
                              draggable
                              onDragStart={(e) => {
                                e.dataTransfer.setData('text/plain', item.subjectName);
                              }}
                              onClick={() => onSelectSubject(item.subjectName)}
                              className={`course-card-item ${
                                hasWarn ? 'placed-prereq-missing' : ''
                              } ${highlightClass}`}
                              style={{
                                background: hasWarn ? '#fff1f2' : (cardStyle ? cardStyle.bg : '#ffffff'),
                                border: hasWarn ? '1px solid #fecdd3' : (cardStyle ? `1px solid ${cardStyle.border}` : '1px solid #e2e8f0'),
                                borderLeft: hasWarn ? '4px solid #e11d48' : (cardStyle ? `4px solid ${cardStyle.stripeColor}` : '3px solid #6366f1'),
                                borderRadius: '6px',
                                padding: '6px 8px',
                                marginBottom: '5px',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                                transition: 'all 0.15s ease',
                              }}
                            >
                              <div className="flex-between">
                                <div style={{ fontWeight: 700, fontSize: '0.78rem', color: '#0f172a', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
                                  <span>{item.subjectName}</span>
                                  {cardStyle && (
                                    <span
                                      style={{
                                        fontSize: '0.62rem',
                                        background: cardStyle.badgeBg,
                                        color: cardStyle.badgeText,
                                        padding: '1px 5px',
                                        borderRadius: '4px',
                                        fontWeight: 700,
                                        border: `1px solid ${cardStyle.border}`,
                                      }}
                                    >
                                      {cardStyle.label}
                                    </span>
                                  )}
                                  {badgeText && (
                                    <span
                                      style={{
                                        fontSize: '0.62rem',
                                        background: '#e0e7ff',
                                        color: '#4338ca',
                                        padding: '1px 5px',
                                        borderRadius: '4px',
                                        fontWeight: 600,
                                      }}
                                    >
                                      {badgeText}
                                    </span>
                                  )}
                                </div>
                                <button
                                  onClick={(e) => handleRemoveItem(e, item.subjectName)}
                                  style={{
                                    border: 'none',
                                    background: 'none',
                                    color: '#94a3b8',
                                    cursor: 'pointer',
                                    padding: '0 2px',
                                  }}
                                  title="削除"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>

                              {hasWarn && (
                                <div
                                  style={{
                                    color: '#be123c',
                                    fontSize: '0.65rem',
                                    fontWeight: 700,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '3px',
                                    marginTop: '3px',
                                  }}
                                >
                                  <AlertTriangle size={11} />
                                  <span>
                                    {status.missingPrereqs.length > 0
                                      ? `前提未配置: ${status.missingPrereqs.join(', ')}`
                                      : `順序エラー: ${status.prereqsPlacedLater.join(', ')}`}
                                  </span>
                                </div>
                              )}

                              <div
                                className="flex-between"
                                style={{
                                  marginTop: '5px',
                                  fontSize: '0.68rem',
                                  color: '#64748b',
                                  alignItems: 'center',
                                  flexWrap: 'wrap',
                                  gap: '4px',
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <span style={{ fontWeight: 600, color: '#475569' }}>
                                    {itemPerQCredit}単位
                                    {numSlots > 1 && (
                                      <span style={{ fontSize: '0.62rem', opacity: 0.75, marginLeft: '2px' }}>
                                        (全{courseTotalCredits})
                                      </span>
                                    )}
                                  </span>

                                  {course?.シラバスURL && (
                                    <a
                                      href={course.シラバスURL}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      style={{
                                        color: '#2563eb',
                                        textDecoration: 'none',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '2px',
                                        fontWeight: 600,
                                        fontSize: '0.66rem',
                                      }}
                                      title="公式シラバス"
                                    >
                                      シラバス
                                      <ExternalLink size={9} />
                                    </a>
                                  )}
                                </div>

                                <div className="grade-select-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                  <span style={{ fontSize: '0.64rem', fontWeight: 700, color: '#64748b' }}>成績:</span>
                                  <select
                                    value={item.grade || '-'}
                                    onChange={(e) => handleGradeChange(e, item.subjectName)}
                                    onClick={(e) => e.stopPropagation()}
                                    style={{
                                      padding: '1px 3px',
                                      fontSize: '0.68rem',
                                      borderRadius: '4px',
                                      border: '1px solid',
                                      borderColor: isFailedGrade(item.grade)
                                        ? '#fecdd3'
                                        : isPassedGrade(item.grade)
                                        ? '#a7f3d0'
                                        : '#cbd5e1',
                                      background: isFailedGrade(item.grade)
                                        ? '#fff1f2'
                                        : isPassedGrade(item.grade)
                                        ? '#ecfdf5'
                                        : '#ffffff',
                                      color: isFailedGrade(item.grade)
                                        ? '#be123c'
                                        : isPassedGrade(item.grade)
                                        ? '#047857'
                                        : '#334155',
                                      fontWeight: 700,
                                      cursor: 'pointer',
                                    }}
                                  >
                                    <option value="-">- 未履修</option>
                                    <option value="A">A (4分/修得)</option>
                                    <option value="B">B (3分/修得)</option>
                                    <option value="C">C (2分/修得)</option>
                                    <option value="D">D (1分/修得)</option>
                                    <option value="F">F (0分/不可)</option>
                                    <option value="G">G (0分/未受)</option>
                                    <option value="P">P (合格/修得)</option>
                                    <option value="Fd">Fd (不合格)</option>
                                    <option value="認定">認定 (単位認定)</option>
                                    <option value="W">W (履修取消)</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};
