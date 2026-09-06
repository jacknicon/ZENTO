import React, { useState, useMemo } from 'react';
import { Search, Plus, Check, ChevronUp, ChevronDown, Filter } from 'lucide-react';
import type { Course } from '../types/syllabus';
import {
  getCourseCategoryStyle,
  getCourseKubun,
  getCourseCategoryLabel,
  COURSE_KUBUN_LIST,
  type CourseKubun,
  type CourseBunrui,
} from '../utils/courseCategoryUtils';

interface CourseCatalogProps {
  courses: Course[];
  plannedNames: Set<string>;
  onSelectCourse: (course: Course) => void;
  onDragStartCourse: (e: React.DragEvent, course: Course) => void;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({
  courses,
  plannedNames,
  onSelectCourse,
  onDragStartCourse,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter Dimensions
  const [selectedYears, setSelectedYears] = useState<Set<number>>(new Set());
  const [selectedKubuns, setSelectedKubuns] = useState<Set<CourseKubun>>(new Set());
  const [selectedCategories, setSelectedCategories] = useState<Set<CourseBunrui>>(new Set());
  const [selectedMethods, setSelectedMethods] = useState<Set<string>>(new Set());
  const [selectedEvals, setSelectedEvals] = useState<Set<string>>(new Set());

  const [unplannedOnly, setUnplannedOnly] = useState(false);
  const [sortBy] = useState<'year' | 'name' | 'credits'>('year');

  // Accordion Expand/Collapse State
  const [accordions, setAccordions] = useState({
    kubun: true,
    bunrui: false,
    method: false,
    eval: false,
  });

  const toggleAccordion = (key: 'kubun' | 'bunrui' | 'method' | 'eval') => {
    setAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleSelection = <T,>(set: Set<T>, val: T, setter: (s: Set<T>) => void) => {
    const next = new Set(set);
    if (next.has(val)) {
      next.delete(val);
    } else {
      next.add(val);
    }
    setter(next);
  };

  const bunruiList: CourseBunrui[] = ['導入', '基礎', '展開', '卒業プロジェクト', '自由'];

  const methodsList = [
    { label: '📽️ オンデマンド', value: 'オンデマンド' },
    { label: '🔬 ライブ授業', value: 'ライブ' },
    { label: '🏫 ゼミ・演習', value: '演習' },
  ];

  const evalsList = [
    { label: '📝 レポート', value: 'レポート' },
    { label: '🖊️ 小テスト/確認テスト', value: 'テスト' },
    { label: '🎓 単位認定試験', value: '試験' },
    { label: '🤝 平常点/発表', value: '平常点' },
  ];

  const filteredCourses = useMemo(() => {
    return courses
      .filter((c) => {
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const nameMatch = c.科目名.toLowerCase().includes(q);
          const teacherMatch = c.担当教員?.some((t) => t.toLowerCase().includes(q));
          const fieldMatch = c.学問分野名?.toLowerCase().includes(q);
          const summaryMatch = c.科目の概要?.toLowerCase().includes(q);
          if (!nameMatch && !teacherMatch && !fieldMatch && !summaryMatch) return false;
        }

        if (selectedYears.size > 0) {
          const yNum = parseInt(c.履修想定年次 || '1') || 1;
          if (!selectedYears.has(yNum)) return false;
        }

        // 科目区分 filter (11 categories)
        if (selectedKubuns.size > 0) {
          const kubun = getCourseKubun(c);
          if (!selectedKubuns.has(kubun)) return false;
        }

        // 科目分類 filter (5 categories)
        if (selectedCategories.size > 0) {
          const bunrui = getCourseCategoryLabel(c);
          if (!selectedCategories.has(bunrui)) return false;
        }

        if (selectedMethods.size > 0) {
          const method = c.授業の方法 || '';
          const matchMethod = Array.from(selectedMethods).some((mVal) => {
            if (mVal === 'オンデマンド') return method.includes('オンデマンド');
            if (mVal === 'ライブ') return method.includes('ライブ');
            if (mVal === '演習') return method.includes('演習') || method.includes('ゼミ');
            return false;
          });
          if (!matchMethod) return false;
        }

        if (selectedEvals.size > 0) {
          const evalText = c.評価方法 || '';
          const matchEval = Array.from(selectedEvals).some((eVal) => {
            if (eVal === 'レポート') return evalText.includes('レポート') || evalText.includes('論文');
            if (eVal === 'テスト') return evalText.includes('確認テスト') || evalText.includes('小テスト') || evalText.includes('クイズ');
            if (eVal === '試験') return evalText.includes('単位認定試験') || evalText.includes('期末') || evalText.includes('試験');
            if (eVal === '平常点') return evalText.includes('平常点') || evalText.includes('発表') || evalText.includes('参加度') || evalText.includes('成果物');
            return false;
          });
          if (!matchEval) return false;
        }

        if (unplannedOnly && plannedNames.has(c.科目名)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.科目名.localeCompare(b.科目名, 'ja');
        if (sortBy === 'credits') return b.単位数 - a.単位数;

        const getYearNum = (yStr?: string) => parseInt(yStr || '1') || 1;
        return getYearNum(a.履修想定年次) - getYearNum(b.履修想定年次);
      });
  }, [courses, searchQuery, selectedYears, selectedKubuns, selectedCategories, selectedMethods, selectedEvals, unplannedOnly, sortBy, plannedNames]);

  return (
    <aside
      style={{
        background: '#ffffff',
        borderRight: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxHeight: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Search Header */}
      <div style={{ padding: '12px 14px 8px 14px', background: '#ffffff', borderBottom: '1px solid #f1f5f9', flexShrink: 0 }}>
        <div className="search-bar" style={{ position: 'relative' }}>
          <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="科目名・教員・キーワードで検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              paddingLeft: '32px',
              paddingRight: '12px',
              paddingTop: '6px',
              paddingBottom: '6px',
              fontSize: '0.8rem',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Accordion Filter Section */}
      <div style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc', flexShrink: 0 }}>
        {/* 1. 想定年次 (Chips) */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>
            想定年次
          </div>
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {[1, 2, 3, 4].map((y) => {
              const isSelected = selectedYears.has(y);
              return (
                <button
                  key={y}
                  onClick={() => toggleSelection(selectedYears, y, setSelectedYears)}
                  style={{
                    fontSize: '0.7rem',
                    padding: '2px 8px',
                    fontWeight: 600,
                    borderRadius: '16px',
                    border: '1px solid',
                    borderColor: isSelected ? '#4f46e5' : '#cbd5e1',
                    background: isSelected ? '#4f46e5' : '#ffffff',
                    color: isSelected ? '#ffffff' : '#475569',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {y}年次
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. 科目区分 (Accordion: 11 categories) */}
        <div style={{ marginBottom: '8px' }}>
          <div
            onClick={() => toggleAccordion('kubun')}
            className="flex-between"
            style={{ fontSize: '0.74rem', fontWeight: 700, color: '#64748b', cursor: 'pointer', marginBottom: '4px' }}
          >
            <span>科目区分 (色分け)</span>
            {accordions.kubun ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </div>
          {accordions.kubun && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {COURSE_KUBUN_LIST.map((k) => {
                const isSelected = selectedKubuns.has(k);
                return (
                  <button
                    key={k}
                    onClick={() => toggleSelection(selectedKubuns, k, setSelectedKubuns)}
                    style={{
                      fontSize: '0.7rem',
                      padding: '3px 8px',
                      borderRadius: '16px',
                      border: '1px solid',
                      borderColor: isSelected ? '#4f46e5' : '#cbd5e1',
                      background: isSelected ? '#4f46e5' : '#ffffff',
                      color: isSelected ? '#ffffff' : '#475569',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {k}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 3. 科目分類 (Accordion: 5 categories) */}
        <div style={{ marginBottom: '8px' }}>
          <div
            onClick={() => toggleAccordion('bunrui')}
            className="flex-between"
            style={{ fontSize: '0.74rem', fontWeight: 700, color: '#64748b', cursor: 'pointer', marginBottom: '4px' }}
          >
            <span>科目分類 (バッジ)</span>
            {accordions.bunrui ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </div>
          {accordions.bunrui && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {bunruiList.map((b) => {
                const isSelected = selectedCategories.has(b);
                return (
                  <button
                    key={b}
                    onClick={() => toggleSelection(selectedCategories, b, setSelectedCategories)}
                    style={{
                      fontSize: '0.7rem',
                      padding: '3px 8px',
                      borderRadius: '16px',
                      border: '1px solid',
                      borderColor: isSelected ? '#4f46e5' : '#cbd5e1',
                      background: isSelected ? '#4f46e5' : '#ffffff',
                      color: isSelected ? '#ffffff' : '#475569',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {b}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 4. 授業方法 (Accordion) */}
        <div style={{ marginBottom: '8px' }}>
          <div
            onClick={() => toggleAccordion('method')}
            className="flex-between"
            style={{ fontSize: '0.74rem', fontWeight: 700, color: '#64748b', cursor: 'pointer', marginBottom: '4px' }}
          >
            <span>授業方法</span>
            {accordions.method ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </div>
          {accordions.method && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {methodsList.map((m) => {
                const isSelected = selectedMethods.has(m.value);
                return (
                  <button
                    key={m.value}
                    onClick={() => toggleSelection(selectedMethods, m.value, setSelectedMethods)}
                    style={{
                      fontSize: '0.7rem',
                      padding: '3px 10px',
                      borderRadius: '16px',
                      border: '1px solid',
                      borderColor: isSelected ? '#4f46e5' : '#cbd5e1',
                      background: isSelected ? '#4f46e5' : '#ffffff',
                      color: isSelected ? '#ffffff' : '#475569',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {m.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 5. 評価方法 (Accordion) */}
        <div style={{ marginBottom: '8px' }}>
          <div
            onClick={() => toggleAccordion('eval')}
            className="flex-between"
            style={{ fontSize: '0.74rem', fontWeight: 700, color: '#64748b', cursor: 'pointer', marginBottom: '4px' }}
          >
            <span>評価方法</span>
            {accordions.eval ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </div>
          {accordions.eval && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {evalsList.map((ev) => {
                const isSelected = selectedEvals.has(ev.value);
                return (
                  <button
                    key={ev.value}
                    onClick={() => toggleSelection(selectedEvals, ev.value, setSelectedEvals)}
                    style={{
                      fontSize: '0.7rem',
                      padding: '3px 10px',
                      borderRadius: '16px',
                      border: '1px solid',
                      borderColor: isSelected ? '#4f46e5' : '#cbd5e1',
                      background: isSelected ? '#4f46e5' : '#ffffff',
                      color: isSelected ? '#ffffff' : '#475569',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {ev.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom Bar: Unplanned Toggle & Counter */}
        <div className="flex-between" style={{ paddingTop: '4px', borderTop: '1px solid #f1f5f9' }}>
          <button
            onClick={() => setUnplannedOnly(!unplannedOnly)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '3px 10px',
              borderRadius: '16px',
              border: '1px solid',
              borderColor: unplannedOnly ? '#4f46e5' : '#cbd5e1',
              background: unplannedOnly ? '#e0e7ff' : '#ffffff',
              color: unplannedOnly ? '#3730a3' : '#64748b',
              fontSize: '0.7rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Filter size={11} /> 未配置のみ
          </button>

          <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>
            {filteredCourses.length}/{courses.length}
          </span>
        </div>
      </div>

      {/* Course Cards List Scrollable Area */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          padding: '10px',
        }}
      >
        {filteredCourses.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.8rem', padding: '30px 10px' }}>
            条件に一致する科目が見つかりませんでした
          </div>
        ) : (
          filteredCourses.map((course) => {
            const isPlaced = plannedNames.has(course.科目名);
            const cardStyle = getCourseCategoryStyle(course, isPlaced);

            return (
              <div
                key={course.科目名}
                draggable={!isPlaced}
                onDragStart={(e) => !isPlaced && onDragStartCourse(e, course)}
                onClick={() => onSelectCourse(course)}
                className="course-card-item"
                style={{
                  background: isPlaced ? '#f8fafc' : cardStyle.bg,
                  border: `1px solid ${isPlaced ? '#e2e8f0' : cardStyle.border}`,
                  borderLeft: `4px solid ${isPlaced ? '#cbd5e1' : cardStyle.stripeColor}`,
                  borderRadius: '8px',
                  padding: '10px 12px',
                  opacity: isPlaced ? 0.55 : 1,
                  filter: isPlaced ? 'grayscale(0.5)' : 'none',
                  marginBottom: '8px',
                  cursor: isPlaced ? 'default' : 'grab',
                  boxShadow: isPlaced ? 'none' : '0 1px 3px rgba(0,0,0,0.04)',
                  transition: 'all 0.15s ease',
                }}
              >
                <div className="flex-between" style={{ alignItems: 'flex-start' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.83rem', color: isPlaced ? '#64748b' : '#0f172a', lineHeight: 1.35 }}>
                    {course.科目名}
                  </div>
                  {isPlaced ? (
                    <span
                      style={{
                        fontSize: '0.65rem',
                        background: '#ecfdf5',
                        color: '#047857',
                        border: '1px solid #a7f3d0',
                        padding: '1px 6px',
                        borderRadius: '12px',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '2px',
                        flexShrink: 0,
                      }}
                    >
                      <Check size={10} /> 配置済
                    </span>
                  ) : (
                    <button
                      style={{
                        border: 'none',
                        background: cardStyle.badgeBg,
                        color: cardStyle.badgeText,
                        borderRadius: '6px',
                        padding: '3px 6px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                      title="履修計画に追加"
                    >
                      <Plus size={12} />
                    </button>
                  )}
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: '6px',
                    fontSize: '0.7rem',
                    color: '#64748b',
                    flexWrap: 'wrap',
                  }}
                >
                  {/* 科目分類 Badge (導入 | 基礎 | 展開 | 卒業プロジェクト | 自由) */}
                  <span
                    style={{
                      background: cardStyle.badgeBg,
                      color: cardStyle.badgeText,
                      padding: '2px 7px',
                      borderRadius: '4px',
                      fontWeight: 700,
                      border: `1px solid ${cardStyle.border}`,
                    }}
                  >
                    {cardStyle.label}
                  </span>

                  {/* 科目区分 Tag */}
                  <span
                    style={{
                      fontSize: '0.66rem',
                      color: cardStyle.badgeText,
                      fontWeight: 600,
                      background: '#ffffff',
                      padding: '1px 5px',
                      borderRadius: '4px',
                      border: `1px dashed ${cardStyle.border}`,
                    }}
                  >
                    {cardStyle.kubun}
                  </span>

                  <span style={{ fontWeight: 600, color: '#334155' }}>{course.単位数}単位</span>
                  <span>{course.履修想定年次 || '1年次'}</span>
                  <span>{course.開講Q || '1Q/2Q'}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};
