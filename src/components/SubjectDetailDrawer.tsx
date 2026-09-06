import React from 'react';
import { X, ExternalLink, BookOpen, CheckCircle2, AlertTriangle, ArrowRight, User, Award, ClipboardCheck } from 'lucide-react';
import type { Course } from '../types/syllabus';
import type { HighlightContext } from '../utils/prerequisiteChecker';
import { getCourseCategoryStyle } from '../utils/courseCategoryUtils';

interface SubjectDetailDrawerProps {
  course: Course | null;
  onClose: () => void;
  isPlanned: boolean;
  highlightContext: HighlightContext | null;
  onAddToPlan: (course: Course) => void;
  onRemoveFromPlan: (courseName: string) => void;
}

export const SubjectDetailDrawer: React.FC<SubjectDetailDrawerProps> = ({
  course,
  onClose,
  isPlanned,
  highlightContext,
  onAddToPlan,
  onRemoveFromPlan,
}) => {
  if (!course) return null;

  const cardStyle = getCourseCategoryStyle(course);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.4)',
        backdropFilter: 'blur(3px)',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '420px',
          maxWidth: '90vw',
          height: '100%',
          background: '#ffffff',
          boxShadow: '-4px 0 24px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div className="flex-between" style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  background: cardStyle.badgeBg,
                  color: cardStyle.badgeText,
                  padding: '2px 8px',
                  borderRadius: '4px',
                  border: `1px solid ${cardStyle.border}`,
                }}
              >
                {cardStyle.label}
              </span>
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  color: cardStyle.badgeText,
                  background: '#f8fafc',
                  padding: '1px 6px',
                  borderRadius: '4px',
                  border: `1px dashed ${cardStyle.border}`,
                }}
              >
                {cardStyle.kubun}
              </span>
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.3 }}>
              {course.科目名}
            </h3>
            {course.科目ナンバー && (
              <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>#{course.科目ナンバー}</span>
            )}
          </div>
          <button
            onClick={onClose}
            style={{ border: 'none', background: '#f1f5f9', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={16} color="#64748b" />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '0.68rem', color: '#64748b' }}>単位数</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>{course.単位数}単位</div>
            </div>
            <div>
              <div style={{ fontSize: '0.68rem', color: '#64748b' }}>想定年次</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>{course.履修想定年次 || '1年次'}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.68rem', color: '#64748b' }}>開講Q</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>{course.開講Q || '1Q/2Q'}</div>
            </div>
          </div>

          {course.シラバスURL && (
            <a
              href={course.シラバスURL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-zento btn-primary"
              style={{ justifyContent: 'center', textDecoration: 'none', padding: '10px' }}
            >
              <BookOpen size={16} />
              <span>🔗 公式シラバスを開く</span>
              <ExternalLink size={14} />
            </a>
          )}

          {course.前提必須科目 && course.前提必須科目.length > 0 && course.前提必須科目[0] !== 'なし' && (
            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Award size={15} color="#4f46e5" />
                前提必須科目 ({course.前提必須科目.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {course.前提必須科目.map((req) => {
                  const isOk = highlightContext?.prereqsSatisfied.has(req);
                  return (
                    <div
                      key={req}
                      className="flex-between"
                      style={{
                        fontSize: '0.76rem',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        background: isOk ? '#ecfdf5' : '#fef2f2',
                        border: '1px solid',
                        borderColor: isOk ? '#a7f3d0' : '#fecdd3',
                        color: isOk ? '#047857' : '#be123c',
                        fontWeight: 600,
                      }}
                    >
                      <span>{req}</span>
                      {isOk ? (
                        <span style={{ fontSize: '0.68rem', display: 'flex', alignItems: 'center', gap: '2px' }}>
                          <CheckCircle2 size={13} /> 配置済み
                        </span>
                      ) : (
                        <span style={{ fontSize: '0.68rem', display: 'flex', alignItems: 'center', gap: '2px' }}>
                          <AlertTriangle size={13} /> 未配置
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {highlightContext && highlightContext.successorsUnlocked.size > 0 && (
            <div style={{ background: '#ecfeff', padding: '12px', borderRadius: '8px', border: '1px solid #a5f3fc' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0e7490', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ArrowRight size={15} />
                この科目を履修すると開放される後継科目 ({highlightContext.successorsUnlocked.size})
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {Array.from(highlightContext.successorsUnlocked).slice(0, 6).map((succ) => (
                  <span
                    key={succ}
                    style={{
                      fontSize: '0.72rem',
                      background: '#ffffff',
                      color: '#0891b2',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      border: '1px solid #67e8f9',
                      fontWeight: 600,
                    }}
                  >
                    {succ}
                  </span>
                ))}
              </div>
            </div>
          )}

          {course.担当教員 && (
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
                <User size={14} /> 担当教員
              </div>
              <div style={{ fontSize: '0.8rem', color: '#1e293b', fontWeight: 500 }}>
                {Array.isArray(course.担当教員) ? course.担当教員.join(', ') : course.担当教員}
              </div>
            </div>
          )}

          {course.評価方法 && (
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                <ClipboardCheck size={14} color="#4f46e5" /> 成績評価方法
              </div>
              <div style={{ fontSize: '0.76rem', color: '#334155', lineHeight: 1.5, background: '#f8fafc', padding: '8px 10px', borderRadius: '6px', border: '1px solid #e2e8f0', whiteSpace: 'pre-wrap' }}>
                {course.評価方法}
              </div>
            </div>
          )}

          {course.到達目標 && (
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '2px' }}>
                到達目標
              </div>
              <div style={{ fontSize: '0.76rem', color: '#334155', lineHeight: 1.5, background: '#f8fafc', padding: '8px', borderRadius: '6px' }}>
                {course.到達目標}
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: '14px 20px', borderTop: '1px solid #f1f5f9', background: '#f8fafc' }}>
          {isPlanned ? (
            <button
              onClick={() => {
                onRemoveFromPlan(course.科目名);
                onClose();
              }}
              className="btn-zento"
              style={{ width: '100%', justifyContent: 'center', background: '#fef2f2', color: '#be123c', border: '1px solid #fecdd3' }}
            >
              履修計画から削除する
            </button>
          ) : (
            <button
              onClick={() => {
                onAddToPlan(course);
                onClose();
              }}
              className="btn-zento btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '10px' }}
            >
              履修計画に追加する
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
