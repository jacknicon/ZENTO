import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, ChevronDown, ChevronRight, ShieldCheck, Award, Bug, ExternalLink } from 'lucide-react';
import type { GraduationSummary, GpaSummary, Year, Quarter } from '../types/syllabus';

interface GraduationDashboardProps {
  summary: GraduationSummary;
  gpaSummary: GpaSummary;
  planItemCount: number;
}

export const GraduationDashboard: React.FC<GraduationDashboardProps> = ({ summary, gpaSummary, planItemCount }) => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    基礎科目: true,
    展開科目: true,
    導入科目: true,
    卒業プロジェクト科目: true,
  });

  const [gpaViewTab, setGpaViewTab] = useState<'cumulative' | 'annual' | 'quarterly'>('cumulative');

  const toggleCategory = (name: string) => {
    setExpandedCategories((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const years: Year[] = [1, 2, 3, 4];
  const quarters: Quarter[] = ['1Q', '2Q', '3Q', '4Q'];

  return (
    <aside
      style={{
        background: '#ffffff',
        borderLeft: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxHeight: '100%',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '16px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
          color: '#ffffff',
          flexShrink: 0,
        }}
        className="flex-between"
      >
        <h2 style={{ fontSize: '1.05rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={20} color="#818cf8" />
          卒業判定ダッシュボード
        </h2>
        <span style={{ fontSize: '0.74rem', background: '#312e81', color: '#c7d2fe', padding: '2px 8px', borderRadius: '9999px', fontWeight: 700, border: '1px solid #4338ca' }}>
          {planItemCount} 科目
        </span>
      </div>

      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '14px' }}>
        {/* GPA Analysis Section */}
        <div
          style={{
            background: 'linear-gradient(135deg, #312e81 0%, #4338ca 100%)',
            color: '#ffffff',
            borderRadius: '12px',
            padding: '14px',
            marginBottom: '14px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div className="flex-between" style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, fontSize: '0.88rem' }}>
              <Award size={18} color="#fbbf24" />
              <span>成績 & GPA分析</span>
            </div>
            <div style={{ display: 'flex', gap: '4px', background: '#1e1b4b', padding: '2px', borderRadius: '6px' }}>
              <button
                onClick={() => setGpaViewTab('cumulative')}
                style={{
                  border: 'none',
                  padding: '2px 7px',
                  borderRadius: '4px',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: gpaViewTab === 'cumulative' ? '#6366f1' : 'transparent',
                  color: '#ffffff',
                }}
              >
                通算
              </button>
              <button
                onClick={() => setGpaViewTab('annual')}
                style={{
                  border: 'none',
                  padding: '2px 7px',
                  borderRadius: '4px',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: gpaViewTab === 'annual' ? '#6366f1' : 'transparent',
                  color: '#ffffff',
                }}
              >
                年度
              </button>
              <button
                onClick={() => setGpaViewTab('quarterly')}
                style={{
                  border: 'none',
                  padding: '2px 7px',
                  borderRadius: '4px',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: gpaViewTab === 'quarterly' ? '#6366f1' : 'transparent',
                  color: '#ffffff',
                }}
              >
                学期Q
              </button>
            </div>
          </div>

          {/* Cumulative GPA Tab */}
          {gpaViewTab === 'cumulative' && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#c7d2fe', fontWeight: 600 }}>通算 (累積) GPA</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, lineHeight: 1.1, color: '#ffffff' }}>
                  {gpaSummary.cumulative.hasGrades ? gpaSummary.cumulative.gpa.toFixed(2) : '-.--'}
                </div>
                <div style={{ fontSize: '0.66rem', color: '#a5b4fc', marginTop: '2px' }}>
                  評価対象: {gpaSummary.cumulative.evaluatedCredits}単位 / GP計: {gpaSummary.cumulative.totalGp}
                </div>
              </div>
              <div style={{ textAlign: 'right', fontSize: '0.7rem', color: '#c7d2fe' }}>
                <div style={{ color: '#6ee7b7', fontWeight: 700 }}>習得: {gpaSummary.passedCredits}単位</div>
                <div style={{ color: '#fca5a5', fontWeight: 700 }}>未収得: {gpaSummary.failedCredits}単位</div>
                <div style={{ color: '#93c5fd', fontWeight: 700 }}>履修予定: {gpaSummary.plannedCredits}単位</div>
              </div>
            </div>
          )}

          {/* Annual GPA Tab */}
          {gpaViewTab === 'annual' && (
            <div>
              <div style={{ fontSize: '0.7rem', color: '#c7d2fe', fontWeight: 600, marginBottom: '6px' }}>年度別 GPA</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                {years.map((y) => {
                  const res = gpaSummary.annual[y];
                  return (
                    <div
                      key={y}
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '6px',
                        padding: '6px 8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ fontSize: '0.72rem', fontWeight: 700 }}>{y}年次</span>
                      <span style={{ fontSize: '0.95rem', fontWeight: 900, color: res.hasGrades ? '#fde047' : '#94a3b8' }}>
                        {res.hasGrades ? res.gpa.toFixed(2) : '-'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quarterly GPA Tab */}
          {gpaViewTab === 'quarterly' && (
            <div>
              <div style={{ fontSize: '0.7rem', color: '#c7d2fe', fontWeight: 600, marginBottom: '6px' }}>年度学期 (Q) 別 GPA</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
                {years.map((y) =>
                  quarters.map((q) => {
                    const key = `${y}-${q}`;
                    const res = gpaSummary.quarterly[key];
                    return (
                      <div
                        key={key}
                        style={{
                          background: 'rgba(255, 255, 255, 0.1)',
                          borderRadius: '4px',
                          padding: '4px 2px',
                          textAlign: 'center',
                        }}
                        title={`${y}年${q}: GPA ${res.hasGrades ? res.gpa.toFixed(2) : '-'} (${res.evaluatedCredits}単位)`}
                      >
                        <div style={{ fontSize: '0.6rem', color: '#c7d2fe' }}>{y}年{q}</div>
                        <div style={{ fontSize: '0.76rem', fontWeight: 800, color: res.hasGrades ? '#6ee7b7' : '#94a3b8' }}>
                          {res.hasGrades ? res.gpa.toFixed(2) : '-'}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {summary.unsatisfiedCount > 0 ? (
          <div
            style={{
              background: '#fffbeb',
              border: '1px solid #fde68a',
              borderRadius: '10px',
              padding: '12px',
              marginBottom: '14px',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#b45309',
                fontWeight: 800,
                fontSize: '0.84rem',
                marginBottom: '6px',
              }}
            >
              <AlertTriangle size={16} />
              <span>確認が必要な要件が {summary.unsatisfiedCount} 件あります</span>
            </div>
            <ul style={{ paddingLeft: '18px', fontSize: '0.74rem', color: '#92400e', lineHeight: 1.55 }}>
              {summary.unsatisfiedItems.slice(0, 4).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
              {summary.unsatisfiedItems.length > 4 && (
                <li style={{ fontStyle: 'italic', opacity: 0.85, marginTop: '2px' }}>
                  他 {summary.unsatisfiedItems.length - 4} 件の未達...
                </li>
              )}
            </ul>
          </div>
        ) : (
          <div
            style={{
              background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
              border: '1px solid #6ee7b7',
              borderRadius: '10px',
              padding: '14px',
              marginBottom: '14px',
              textAlign: 'center',
              color: '#047857',
              fontWeight: 800,
              fontSize: '0.9rem',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            🎉 すべての卒業条件をクリアしました！
          </div>
        )}

        <div className="flex-col" style={{ gap: '10px', marginBottom: '16px' }}>
          <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div className="flex-between" style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569' }}>
              <span>📈 進級要件 (1〜3年次累計)</span>
              <span style={{ color: summary.advancementSatisfied ? '#047857' : '#be123c', fontWeight: 800 }}>
                {summary.year1To3Credits} / 90 単位
              </span>
            </div>
            <div style={{ height: '7px', width: '100%', background: '#e2e8f0', borderRadius: '4px', marginTop: '6px', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${Math.min(100, (summary.year1To3Credits / 90) * 100)}%`,
                  background: summary.advancementSatisfied ? 'linear-gradient(90deg, #10b981, #059669)' : '#f59e0b',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div className="flex-between" style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0f172a' }}>
              <span>🎓 卒業必要総単位数</span>
              <span style={{ color: summary.isTotalSatisfied ? '#047857' : '#be123c', fontWeight: 900 }}>
                {summary.totalCredits} / 124 単位
              </span>
            </div>
            <div style={{ height: '9px', width: '100%', background: '#e2e8f0', borderRadius: '5px', marginTop: '6px', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${Math.min(100, (summary.totalCredits / 124) * 100)}%`,
                  background: summary.isTotalSatisfied ? 'linear-gradient(90deg, #10b981, #059669)' : 'linear-gradient(90deg, #4f46e5, #7c3aed)',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex-col" style={{ gap: '10px' }}>
          {summary.categories.map((cat) => {
            const isExpanded = expandedCategories[cat.name] ?? true;
            return (
              <div
                key={cat.name}
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  background: '#ffffff',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div
                  onClick={() => toggleCategory(cat.name)}
                  className="flex-between"
                  style={{
                    padding: '11px 13px',
                    background: cat.isSatisfied ? '#f0fdf4' : '#f8fafc',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {isExpanded ? <ChevronDown size={16} color="#64748b" /> : <ChevronRight size={16} color="#64748b" />}
                    <span style={{ fontWeight: 800, fontSize: '0.83rem', color: '#1e293b' }}>{cat.name}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 800 }}>
                    <span style={{ color: cat.isSatisfied ? '#047857' : '#b45309' }}>
                      {cat.current} / {cat.required}
                    </span>
                    {cat.isSatisfied && <CheckCircle2 size={16} color="#10b981" />}
                  </div>
                </div>

                {isExpanded && cat.subCategories && (
                  <div className="flex-col" style={{ padding: '8px 14px 12px 28px', borderTop: '1px solid #f1f5f9', gap: '6px' }}>
                    {cat.subCategories.map((sub) => (
                      <div
                        key={sub.name}
                        className="flex-between"
                        style={{
                          fontSize: '0.75rem',
                          color: sub.isSatisfied ? '#334155' : '#b45309',
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: sub.isSatisfied ? '#10b981' : '#f59e0b' }}></span>
                          {sub.name}
                        </span>
                        <span style={{ fontWeight: 700 }}>
                          {sub.current} / {sub.required}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          padding: '12px 14px',
          borderTop: '1px solid #e2e8f0',
          fontSize: '0.7rem',
          color: '#64748b',
          background: '#f8fafc',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <div style={{ lineHeight: 1.45, color: '#64748b' }}>
          ※ 最終的な確認は、学生便覧やZENPortal等の大学公式アナウンスを基にご自身で確認してください。
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '6px', borderTop: '1px dashed #cbd5e1' }}>
          <a
            href="https://zen-student.slack.com/team/U08KGNB35L2"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#dc2626',
              background: '#fef2f2',
              border: '1px solid #fca5a5',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '0.74rem',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.15s ease',
            }}
          >
            <Bug size={13} color="#ef4444" />
            <span>不具合報告 (Slack)</span>
            <ExternalLink size={11} color="#f87171" />
          </a>
        </div>
      </div>
    </aside>
  );
};
