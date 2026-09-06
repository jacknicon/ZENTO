import React, { useState, useMemo } from 'react';
import { Search, Plus, Check, ChevronUp, ChevronDown, Filter, SlidersHorizontal, Star } from 'lucide-react';
import type { Course, Quarter } from '../types/syllabus';
import { isQuarterAvailable } from '../utils/prerequisiteChecker';
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
  favoriteNames: Set<string>;
  onToggleFavorite: (subjectName: string) => void;
  onSelectCourse: (course: Course) => void;
  onDragStartCourse: (e: React.DragEvent, course: Course) => void;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({
  courses,
  plannedNames,
  favoriteNames,
  onToggleFavorite,
  onSelectCourse,
  onDragStartCourse,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter Panel Open/Close Toggle (Default closed on mobile/desktop for maximum card area)
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // Filter Dimensions
  const [selectedYears, setSelectedYears] = useState<Set<number>>(new Set());
  const [selectedQuarters, setSelectedQuarters] = useState<Set<Quarter>>(new Set());
  const [selectedKubuns, setSelectedKubuns] = useState<Set<CourseKubun>>(new Set());
  const [selectedCategories, setSelectedCategories] = useState<Set<CourseBunrui>>(new Set());
  const [selectedMethods, setSelectedMethods] = useState<Set<string>>(new Set());
  const [selectedEvals, setSelectedEvals] = useState<Set<string>>(new Set());

  const [unplannedOnly, setUnplannedOnly] = useState(false);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [sortBy] = useState<'year' | 'name' | 'credits'>('year');

  // Accordion Expand/Collapse State
  const [accordions, setAccordions] = useState({
    kubun: true,
    bunrui: true,
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

  const activeFilterCount =
    selectedYears.size +
    selectedQuarters.size +
    selectedKubuns.size +
    selectedCategories.size +
    selectedMethods.size +
    selectedEvals.size +
    (favoritesOnly ? 1 : 0);

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

        if (favoritesOnly && !favoriteNames.has(c.科目名)) {
          return false;
        }

        if (selectedYears.size > 0) {
          const yNum = parseInt(c.履修想定年次 || '1') || 1;
          if (!selectedYears.has(yNum)) return false;
        }

        if (selectedQuarters.size > 0) {
          const matchQ = Array.from(selectedQuarters).some((q) => isQuarterAvailable(c.開講Q, q));
          if (!matchQ) return false;
        }

        if (selectedKubuns.size > 0) {
          const kubun = getCourseKubun(c);
          if (!selectedKubuns.has(kubun)) return false;
        }

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
  }, [courses, searchQuery, favoritesOnly, favoriteNames, selectedYears, selectedQuarters, selectedKubuns, selectedCategories, selectedMethods, selectedEvals, unplannedOnly, sortBy, plannedNames]);

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
      {/* Compact Top Bar: Search Input + Filter Toggle Button */}
      <div style={{ padding: '8px 10px', background: '#ffffff', borderBottom: '1px solid #e2e8f0', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div className="search-bar" style={{ position: 'relative', flex: 1 }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="科目名・教員名検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                paddingLeft: '28px',
                paddingRight: '8px',
                paddingTop: '5px',
                paddingBottom: '5px',
                fontSize: '0.78rem',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                outline: 'none',
              }}
            />
          </div>

          <button
            onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '5px 8px',
              borderRadius: '6px',
              border: '1px solid',
              borderColor: activeFilterPanelOpenOrHasFilter(isFilterPanelOpen, activeFilterCount) ? '#4f46e5' : '#cbd5e1',
              background: isFilterPanelOpen ? '#4f46e5' : activeFilterCount > 0 ? '#e0e7ff' : '#ffffff',
              color: isFilterPanelOpen ? '#ffffff' : activeFilterCount > 0 ? '#3730a3' : '#475569',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            <SlidersHorizontal size={12} />
            <span>絞り込み</span>
            {activeFilterCount > 0 && (
              <span
                style={{
                  background: isFilterPanelOpen ? '#ffffff' : '#4f46e5',
                  color: isFilterPanelOpen ? '#4f46e5' : '#ffffff',
                  borderRadius: '9999px',
                  fontSize: '0.6rem',
                  fontWeight: 800,
                  padding: '0 5px',
                  lineHeight: '1.2',
                }}
              >
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Sub-bar: Unplanned Toggle & Favorites Toggle & Counter */}
        <div className="flex-between" style={{ marginTop: '6px', paddingTop: '4px', borderTop: '1px dashed #f1f5f9' }}>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <button
              onClick={() => setUnplannedOnly(!unplannedOnly)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px',
                padding: '2px 7px',
                borderRadius: '12px',
                border: '1px solid',
                borderColor: unplannedOnly ? '#4f46e5' : '#cbd5e1',
                background: unplannedOnly ? '#e0e7ff' : '#ffffff',
                color: unplannedOnly ? '#3730a3' : '#64748b',
                fontSize: '0.68rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Filter size={10} /> 未配置
            </button>

            <button
              onClick={() => setFavoritesOnly(!favoritesOnly)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px',
                padding: '2px 7px',
                borderRadius: '12px',
                border: '1px solid',
                borderColor: favoritesOnly ? '#d97706' : '#cbd5e1',
                background: favoritesOnly ? '#fffbeb' : '#ffffff',
                color: favoritesOnly ? '#b45309' : '#64748b',
                fontSize: '0.68rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Star size={11} fill={favoritesOnly ? '#f59e0b' : 'none'} color={favoritesOnly ? '#d97706' : '#94a3b8'} />
              <span>キープ</span>
              {favoriteNames.size > 0 && (
                <span style={{ fontSize: '0.62rem', fontWeight: 800 }}>({favoriteNames.size})</span>
              )}
            </button>
          </div>

          <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>
            {filteredCourses.length}/{courses.length}科目
          </span>
        </div>
      </div>

      {/* Expandable Filter Panel (Toggled by 絞り込み button) */}
      {isFilterPanelOpen && (
        <div style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc', flexShrink: 0, maxHeight: '65vh', overflowY: 'auto' }}>
          {/* 1. 想定年次 */}
          <div style={{ marginBottom: '8px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>
              想定年次
            </div>
            <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '2px' }}>
              {[1, 2, 3, 4].map((y) => {
                const isSelected = selectedYears.has(y);
                return (
                  <button
                    key={y}
                    onClick={() => toggleSelection(selectedYears, y, setSelectedYears)}
                    style={{
                      fontSize: '0.68rem',
                      padding: '2px 8px',
                      fontWeight: 600,
                      borderRadius: '14px',
                      border: '1px solid',
                      borderColor: isSelected ? '#4f46e5' : '#cbd5e1',
                      background: isSelected ? '#4f46e5' : '#ffffff',
                      color: isSelected ? '#ffffff' : '#475569',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {y}年次
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. 開講Q */}
          <div style={{ marginBottom: '8px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>
              開講Q
            </div>
            <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '2px' }}>
              {(['1Q', '2Q', '3Q', '4Q'] as const).map((q) => {
                const isSelected = selectedQuarters.has(q);
                return (
                  <button
                    key={q}
                    onClick={() => toggleSelection(selectedQuarters, q, setSelectedQuarters)}
                    style={{
                      fontSize: '0.68rem',
                      padding: '2px 8px',
                      fontWeight: 600,
                      borderRadius: '14px',
                      border: '1px solid',
                      borderColor: isSelected ? '#4f46e5' : '#cbd5e1',
                      background: isSelected ? '#4f46e5' : '#ffffff',
                      color: isSelected ? '#ffffff' : '#475569',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {q}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accordions Container */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {/* 科目区分 */}
            <div>
              <div
                onClick={() => toggleAccordion('kubun')}
                className="flex-between"
                style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', cursor: 'pointer', padding: '2px 0' }}
              >
                <span>科目区分 (色分け)</span>
                {accordions.kubun ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              </div>
              {accordions.kubun && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginTop: '3px' }}>
                  {COURSE_KUBUN_LIST.map((k) => {
                    const isSelected = selectedKubuns.has(k);
                    return (
                      <button
                        key={k}
                        onClick={() => toggleSelection(selectedKubuns, k, setSelectedKubuns)}
                        style={{
                          fontSize: '0.66rem',
                          padding: '2px 7px',
                          borderRadius: '12px',
                          border: '1px solid',
                          borderColor: isSelected ? '#4f46e5' : '#cbd5e1',
                          background: isSelected ? '#4f46e5' : '#ffffff',
                          color: isSelected ? '#ffffff' : '#475569',
                          fontWeight: 500,
                          cursor: 'pointer',
                        }}
                      >
                        {k}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 科目分類 */}
            <div>
              <div
                onClick={() => toggleAccordion('bunrui')}
                className="flex-between"
                style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', cursor: 'pointer', padding: '2px 0' }}
              >
                <span>科目分類 (バッジ)</span>
                {accordions.bunrui ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              </div>
              {accordions.bunrui && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginTop: '3px' }}>
                  {bunruiList.map((b) => {
                    const isSelected = selectedCategories.has(b);
                    return (
                      <button
                        key={b}
                        onClick={() => toggleSelection(selectedCategories, b, setSelectedCategories)}
                        style={{
                          fontSize: '0.66rem',
                          padding: '2px 7px',
                          borderRadius: '12px',
                          border: '1px solid',
                          borderColor: isSelected ? '#4f46e5' : '#cbd5e1',
                          background: isSelected ? '#4f46e5' : '#ffffff',
                          color: isSelected ? '#ffffff' : '#475569',
                          fontWeight: 500,
                          cursor: 'pointer',
                        }}
                      >
                        {b}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 授業方法 */}
            <div>
              <div
                onClick={() => toggleAccordion('method')}
                className="flex-between"
                style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', cursor: 'pointer', padding: '2px 0' }}
              >
                <span>授業方法</span>
                {accordions.method ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              </div>
              {accordions.method && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginTop: '3px' }}>
                  {methodsList.map((m) => {
                    const isSelected = selectedMethods.has(m.value);
                    return (
                      <button
                        key={m.value}
                        onClick={() => toggleSelection(selectedMethods, m.value, setSelectedMethods)}
                        style={{
                          fontSize: '0.66rem',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          border: '1px solid',
                          borderColor: isSelected ? '#4f46e5' : '#cbd5e1',
                          background: isSelected ? '#4f46e5' : '#ffffff',
                          color: isSelected ? '#ffffff' : '#475569',
                          fontWeight: 500,
                          cursor: 'pointer',
                        }}
                      >
                        {m.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 評価方法 */}
            <div>
              <div
                onClick={() => toggleAccordion('eval')}
                className="flex-between"
                style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', cursor: 'pointer', padding: '2px 0' }}
              >
                <span>評価方法</span>
                {accordions.eval ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              </div>
              {accordions.eval && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginTop: '3px' }}>
                  {evalsList.map((ev) => {
                    const isSelected = selectedEvals.has(ev.value);
                    return (
                      <button
                        key={ev.value}
                        onClick={() => toggleSelection(selectedEvals, ev.value, setSelectedEvals)}
                        style={{
                          fontSize: '0.66rem',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          border: '1px solid',
                          borderColor: isSelected ? '#4f46e5' : '#cbd5e1',
                          background: isSelected ? '#4f46e5' : '#ffffff',
                          color: isSelected ? '#ffffff' : '#475569',
                          fontWeight: 500,
                          cursor: 'pointer',
                        }}
                      >
                        {ev.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Course Cards List Scrollable Area */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          padding: '8px 10px 80px 10px',
        }}
      >
        {filteredCourses.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.78rem', padding: '24px 10px' }}>
            条件に一致する科目が見つかりませんでした
          </div>
        ) : (
          filteredCourses.map((course) => {
            const isPlaced = plannedNames.has(course.科目名);
            const isFav = favoriteNames.has(course.科目名);
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
                  padding: '8px 10px',
                  opacity: isPlaced ? 0.55 : 1,
                  filter: isPlaced ? 'grayscale(0.5)' : 'none',
                  marginBottom: '6px',
                  cursor: isPlaced ? 'default' : 'pointer',
                  boxShadow: isPlaced ? 'none' : '0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
                <div className="flex-between" style={{ alignItems: 'flex-start', gap: '6px' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.8rem', color: isPlaced ? '#64748b' : '#0f172a', lineHeight: 1.3, flex: 1 }}>
                    {course.科目名}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(course.科目名);
                      }}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        padding: '2px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      title={isFav ? 'キープ解除' : '気になる科目にキープ'}
                    >
                      <Star size={14} fill={isFav ? '#f59e0b' : 'none'} color={isFav ? '#d97706' : '#94a3b8'} />
                    </button>

                    {isPlaced ? (
                      <span
                        style={{
                          fontSize: '0.62rem',
                          background: '#ecfdf5',
                          color: '#047857',
                          border: '1px solid #a7f3d0',
                          padding: '1px 5px',
                          borderRadius: '10px',
                          fontWeight: 700,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '2px',
                        }}
                      >
                        <Check size={9} /> 配置済
                      </span>
                    ) : (
                      <button
                        style={{
                          border: 'none',
                          background: cardStyle.badgeBg,
                          color: cardStyle.badgeText,
                          borderRadius: '6px',
                          padding: '2px 6px',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                        title="履修計画に追加"
                      >
                        <Plus size={11} />
                      </button>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    marginTop: '5px',
                    fontSize: '0.68rem',
                    color: '#64748b',
                    flexWrap: 'wrap',
                  }}
                >
                  <span
                    style={{
                      background: cardStyle.badgeBg,
                      color: cardStyle.badgeText,
                      padding: '1px 5px',
                      borderRadius: '3px',
                      fontWeight: 700,
                      border: `1px solid ${cardStyle.border}`,
                    }}
                  >
                    {cardStyle.label}
                  </span>

                  <span
                    style={{
                      fontSize: '0.64rem',
                      color: cardStyle.badgeText,
                      fontWeight: 600,
                      background: '#ffffff',
                      padding: '1px 4px',
                      borderRadius: '3px',
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

function activeFilterPanelOpenOrHasFilter(isOpen: boolean, count: number): boolean {
  return isOpen || count > 0;
}
