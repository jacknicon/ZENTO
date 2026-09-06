import React, { useState, useMemo } from 'react';
import { X, Copy, Check, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import type { PlanItem, GraduationSummary, Course } from '../types/syllabus';
import { generateAIPrompt } from '../utils/storage';

interface AiConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: PlanItem[];
  setPlan: React.Dispatch<React.SetStateAction<PlanItem[]>>;
  summary: GraduationSummary;
  coursesMap: Map<string, Course>;
}

export const AiConsultModal: React.FC<AiConsultModalProps> = ({
  isOpen,
  onClose,
  plan,
  setPlan,
  summary,
  coursesMap,
}) => {
  const [activeTab, setActiveTab] = useState<'prompt' | 'import'>('prompt');
  const [copied, setCopied] = useState(false);
  const [importText, setImportText] = useState('');
  const [importSuccessMsg, setImportSuccessMsg] = useState<string | null>(null);

  const generatedPrompt = useMemo(() => {
    return generateAIPrompt(plan, summary, coursesMap);
  }, [plan, summary, coursesMap]);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const parsedImportItems = useMemo(() => {
    if (!importText.trim()) return [];
    const lines = importText.split(/\r?\n/);
    const items: Array<{
      year: 1 | 2 | 3 | 4;
      quarter: '1Q' | '2Q' | '3Q' | '4Q';
      subjectId: string;
      rawSubjectName: string;
      matchedCourse: Course | null;
      isAlreadyInPlan: boolean;
      reason: string;
    }> = [];

    const plannedNamesSet = new Set(plan.map((p) => p.subjectName));

    for (const line of lines) {
      if (!line.includes('|')) continue;
      const parts = line
        .split('|')
        .map((s) => s.trim())
        .filter((_str, idx, arr) => idx !== 0 && idx !== arr.length - 1);
      if (parts.length < 4) continue;

      const rawYear = parts[0];
      const rawQ = parts[1];
      const subjectId = parts[2];
      const rawSubjectName = parts[3];
      const reason = parts[4] || '';

      // Skip table header rows
      if (
        rawYear === '年次' ||
        rawYear.includes('---') ||
        rawSubjectName.includes('科目名') ||
        (rawYear.includes('年次') && rawQ.includes('Q') && rawSubjectName.includes('科目'))
      ) {
        continue;
      }

      const yearNum = Math.min(4, Math.max(1, parseInt(rawYear.replace(/[^1-4]/g, ''), 10) || 1)) as 1 | 2 | 3 | 4;
      let quarterStr: '1Q' | '2Q' | '3Q' | '4Q' = '1Q';
      if (rawQ.includes('2Q')) quarterStr = '2Q';
      else if (rawQ.includes('3Q')) quarterStr = '3Q';
      else if (rawQ.includes('4Q')) quarterStr = '4Q';

      // Match course by Name or ID
      let matchedCourse: Course | null = coursesMap.get(rawSubjectName) || null;

      // Try normalized name lookup
      if (!matchedCourse) {
        for (const [cName, cObj] of coursesMap.entries()) {
          if (cName === rawSubjectName) {
            matchedCourse = cObj;
            break;
          }
        }
      }

      // Try subjectId / numbering code matching
      if (!matchedCourse && subjectId && subjectId !== '要確認') {
        const cleanId = subjectId.trim().toUpperCase();
        for (const [, cObj] of coursesMap.entries()) {
          const cNum = (cObj.科目ナンバー || '').trim().toUpperCase();
          const cUrl = (cObj.シラバスURL || '').trim().toUpperCase();
          if ((cNum && cNum === cleanId) || (cUrl && cUrl.includes(cleanId))) {
            matchedCourse = cObj;
            break;
          }
        }
      }

      // Fallback: substring matching
      if (!matchedCourse && rawSubjectName && rawSubjectName.length >= 2) {
        for (const [cName, cObj] of coursesMap.entries()) {
          if (cName.includes(rawSubjectName) || rawSubjectName.includes(cName)) {
            matchedCourse = cObj;
            break;
          }
        }
      }

      const finalSubjectName = matchedCourse ? matchedCourse.科目名 : rawSubjectName;

      items.push({
        year: yearNum,
        quarter: quarterStr,
        subjectId,
        rawSubjectName: finalSubjectName,
        matchedCourse,
        isAlreadyInPlan: plannedNamesSet.has(finalSubjectName),
        reason,
      });
    }

    return items;
  }, [importText, plan, coursesMap]);

  const validNewItems = useMemo(() => {
    return parsedImportItems.filter((item) => item.matchedCourse && !item.isAlreadyInPlan);
  }, [parsedImportItems]);

  const handleApplyImport = () => {
    if (validNewItems.length === 0) return;

    const newPlanItems: PlanItem[] = validNewItems.map((item, idx) => ({
      id: `${item.rawSubjectName}-${item.year}-${item.quarter}-${Date.now()}-${idx}`,
      subjectName: item.rawSubjectName,
      year: item.year,
      quarter: item.quarter,
      grade: '-',
    }));

    setPlan((prev) => [...prev, ...newPlanItems]);
    setImportSuccessMsg(`${validNewItems.length} 件の科目を履修計画に追加しました！`);
    setTimeout(() => {
      setImportSuccessMsg(null);
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: '16px',
          maxWidth: '680px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden',
          color: '#f8fafc',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '16px 24px',
            borderBottom: '1px solid #334155',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#0f172a',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={20} color="#38bdf8" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
              AIに相談
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              border: 'none',
              background: '#334155',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94a3b8',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div style={{ padding: '0 24px', borderBottom: '1px solid #334155', display: 'flex', gap: '24px', background: '#0f172a' }}>
          <button
            onClick={() => setActiveTab('prompt')}
            style={{
              padding: '14px 4px',
              border: 'none',
              background: 'none',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: 'pointer',
              color: activeTab === 'prompt' ? '#38bdf8' : '#94a3b8',
              borderBottom: activeTab === 'prompt' ? '2.5px solid #38bdf8' : '2.5px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Copy size={16} />
            <span>1. プロンプトをコピー</span>
          </button>
          <button
            onClick={() => setActiveTab('import')}
            style={{
              padding: '14px 4px',
              border: 'none',
              background: 'none',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: 'pointer',
              color: activeTab === 'import' ? '#38bdf8' : '#94a3b8',
              borderBottom: activeTab === 'import' ? '2.5px solid #38bdf8' : '2.5px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <FileText size={16} />
            <span>2. AI回答をインポート</span>
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '20px 24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {activeTab === 'prompt' ? (
            <>
              <div style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                現在の履修状況と不足要件をまとめたプロンプトです。下のボタンでコピーし、AI（ChatGPT / Claude / Gemini / Perplexity 等）に貼り付けて相談してください。
              </div>

              <div>
                <textarea
                  readOnly
                  value={generatedPrompt}
                  style={{
                    width: '100%',
                    height: '240px',
                    padding: '12px',
                    fontSize: '0.8rem',
                    fontFamily: 'monospace',
                    borderRadius: '8px',
                    border: '1px solid #334155',
                    background: '#0f172a',
                    color: '#e2e8f0',
                    resize: 'none',
                    outline: 'none',
                    lineHeight: 1.5,
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                AIから返ってきた Markdown テーブルの回答をそのまま下に貼り付け、「計画に追加」を押してください。
              </div>

              <div>
                <textarea
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder={`AIの回答をここに貼り付け...\n\n| 年次 | Q | 科目ID | 科目名 | 理由 |\n| 1 | 1Q | MTH-1-C1-1030-006 | 線形代数2 | AI学習に必要な基礎数学... |`}
                  style={{
                    width: '100%',
                    height: '140px',
                    padding: '12px',
                    fontSize: '0.8rem',
                    fontFamily: 'monospace',
                    borderRadius: '8px',
                    border: '1px solid #334155',
                    outline: 'none',
                    resize: 'none',
                    color: '#f8fafc',
                    background: '#0f172a',
                    lineHeight: 1.5,
                  }}
                />
              </div>

              {parsedImportItems.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>検出された科目案 ({parsedImportItems.length}件)</span>
                    <span style={{ fontSize: '0.78rem', color: '#34d399', fontWeight: 600 }}>
                      追加可能: {validNewItems.length}件
                    </span>
                  </div>
                  <div style={{ maxHeight: '180px', overflowY: 'auto', border: '1px solid #334155', borderRadius: '8px', background: '#0f172a' }}>
                    <table style={{ width: '100%', fontSize: '0.78rem', borderCollapse: 'collapse' }}>
                      <thead style={{ background: '#1e293b', color: '#94a3b8', position: 'sticky', top: 0 }}>
                        <tr>
                          <th style={{ padding: '8px 10px', textAlign: 'left' }}>年次/Q</th>
                          <th style={{ padding: '8px 10px', textAlign: 'left' }}>科目名</th>
                          <th style={{ padding: '8px 10px', textAlign: 'left' }}>状態 / 理由</th>
                        </tr>
                      </thead>
                      <tbody>
                        {parsedImportItems.map((item, idx) => (
                          <tr key={idx} style={{ borderTop: '1px solid #334155', background: item.isAlreadyInPlan ? '#1e293b' : 'transparent' }}>
                            <td style={{ padding: '8px 10px', fontWeight: 700, color: '#38bdf8', whiteSpace: 'nowrap' }}>
                              {item.year}年 {item.quarter}
                            </td>
                            <td style={{ padding: '8px 10px', fontWeight: 700, color: '#f8fafc' }}>
                              {item.rawSubjectName}
                              {!item.matchedCourse && (
                                <span style={{ color: '#f87171', fontSize: '0.7rem', marginLeft: '6px' }}>
                                  (未検出)
                                </span>
                              )}
                            </td>
                            <td style={{ padding: '8px 10px', color: '#94a3b8' }}>
                              {item.isAlreadyInPlan ? (
                                <span style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 600 }}>
                                  ⚠️ 配置済
                                </span>
                              ) : (
                                <span style={{ fontSize: '0.74rem' }}>{item.reason || '推奨科目'}</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {importSuccessMsg && (
                <div style={{ background: '#064e3b', border: '1px solid #059669', color: '#6ee7b7', padding: '10px 14px', borderRadius: '8px', fontSize: '0.84rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={18} />
                  <span>{importSuccessMsg}</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '16px 24px',
            background: '#0f172a',
            borderTop: '1px solid #334155',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
          }}
        >
          <button
            onClick={onClose}
            className="btn-zento btn-secondary"
            style={{ padding: '8px 18px', fontSize: '0.84rem' }}
          >
            閉じる
          </button>

          {activeTab === 'prompt' ? (
            <button
              onClick={handleCopyPrompt}
              className="btn-zento btn-primary"
              style={{
                padding: '8px 20px',
                fontSize: '0.84rem',
                background: copied ? '#059669' : '#0284c7',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? 'コピーしました！' : 'プロンプトをコピー'}</span>
            </button>
          ) : (
            <button
              onClick={handleApplyImport}
              disabled={validNewItems.length === 0}
              className="btn-zento btn-primary"
              style={{
                padding: '8px 20px',
                fontSize: '0.84rem',
                opacity: validNewItems.length === 0 ? 0.5 : 1,
                cursor: validNewItems.length === 0 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <FileText size={16} />
              <span>計画に追加 ({validNewItems.length}件)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
