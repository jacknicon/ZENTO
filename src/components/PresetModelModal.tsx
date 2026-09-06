import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Check,
  ChevronDown,
  ChevronUp,
  Brain,
  Code,
  Palette,
  TrendingUp,
  BookOpen,
  Binary,
  Leaf,
  ShieldCheck,
  Film,
  Cpu,
  Compass,
  Award,
  Layers,
} from 'lucide-react';
import { PRESET_MODELS, type PresetModel, type PresetCourseEntry } from '../data/presetModels';
import type { PlanItem } from '../types/syllabus';

interface PresetModelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyModel: (model: PresetModel, planItems: PlanItem[]) => void;
}

const ICON_MAP: Record<string, React.FC<{ size?: number; color?: string }>> = {
  Brain: ({ size = 20, color }) => <Brain size={size} color={color} />,
  Code: ({ size = 20, color }) => <Code size={size} color={color} />,
  Palette: ({ size = 20, color }) => <Palette size={size} color={color} />,
  TrendingUp: ({ size = 20, color }) => <TrendingUp size={size} color={color} />,
  BookOpen: ({ size = 20, color }) => <BookOpen size={size} color={color} />,
  Binary: ({ size = 20, color }) => <Binary size={size} color={color} />,
  Leaf: ({ size = 20, color }) => <Leaf size={size} color={color} />,
  ShieldCheck: ({ size = 20, color }) => <ShieldCheck size={size} color={color} />,
  Film: ({ size = 20, color }) => <Film size={size} color={color} />,
  Cpu: ({ size = 20, color }) => <Cpu size={size} color={color} />,
  Compass: ({ size = 20, color }) => <Compass size={size} color={color} />,
};

export function convertPresetToPlanItems(courses: PresetCourseEntry[]): PlanItem[] {
  const planItems: PlanItem[] = [];

  courses.forEach((c, idx) => {
    const qStr = c.quarterStr;
    const year = c.year;
    const subjectName = c.subjectName;

    let targetQuarters: ('1Q' | '2Q' | '3Q' | '4Q')[] = [];

    if (qStr === '1Q') targetQuarters = ['1Q'];
    else if (qStr === '2Q') targetQuarters = ['2Q'];
    else if (qStr === '3Q') targetQuarters = ['3Q'];
    else if (qStr === '4Q') targetQuarters = ['4Q'];
    else if (qStr === '1-2Q') targetQuarters = ['1Q', '2Q'];
    else if (qStr === '3-4Q') targetQuarters = ['3Q', '4Q'];
    else if (qStr === '1-4Q' || qStr === '通年') targetQuarters = ['1Q', '2Q', '3Q', '4Q'];
    else targetQuarters = ['1Q'];

    targetQuarters.forEach((q) => {
      planItems.push({
        id: `${subjectName}-${year}-${q}-${idx}`,
        subjectName,
        year,
        quarter: q,
      });
    });
  });

  return planItems;
}

export const PresetModelModal: React.FC<PresetModelModalProps> = ({
  isOpen,
  onClose,
  onApplyModel,
}) => {
  const [expandedModelId, setExpandedModelId] = useState<string | null>(null);

  if (!isOpen) return null;

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const handleSelectModel = (model: PresetModel) => {
    const confirmMsg = `「${model.name}」履修モデルをタイムラインに適用しますか？\n\n※現在配置中の科目は上書きされ、モデルの全 ${model.totalCoursesCount} 科目（${model.totalCredits}単位・4年次卒業プロジェクト含む）が年次計画に自動配置されます。`;
    if (window.confirm(confirmMsg)) {
      const planItems = convertPresetToPlanItems(model.courses);
      onApplyModel(model, planItems);
      onClose();
    }
  };

  const toggleExpand = (modelId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedModelId((prev) => (prev === modelId ? null : modelId));
  };

  return (
    <div className="zento-modal-overlay" onClick={onClose}>
      <div
        className="zento-modal-content"
        style={{
          width: isMobile ? '98%' : '94%',
          maxWidth: '1000px',
          maxHeight: isMobile ? '95vh' : '90vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '0',
          overflow: 'hidden',
          background: '#0f172a',
          border: '1px solid #334155',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: isMobile ? '12px 16px' : '18px 24px',
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            borderBottom: '1px solid #334155',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: isMobile ? '36px' : '42px',
                height: isMobile ? '36px' : '42px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
              }}
            >
              <Sparkles size={isMobile ? 18 : 22} color="#ffffff" />
            </div>
            <div>
              <h2
                style={{
                  fontSize: isMobile ? '1rem' : '1.2rem',
                  fontWeight: 800,
                  color: '#ffffff',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                履修モデルコース (全11コース)
              </h2>
              <p style={{ fontSize: isMobile ? '0.74rem' : '0.82rem', color: '#94a3b8', margin: '2px 0 0 0' }}>
                興味や将来の進路に合わせた履修モデルを選び、1クリックで計画に反映できます。
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#1e293b',
              border: '1px solid #334155',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div
          style={{
            padding: isMobile ? '12px' : '20px 24px',
            overflowY: 'auto',
            flex: 1,
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(380px, 1fr))',
            gap: '12px',
            background: '#090d16',
          }}
        >
          {PRESET_MODELS.map((model) => {
            const isExpanded = expandedModelId === model.id;
            const IconComponent = ICON_MAP[model.iconName] || Sparkles;

            return (
              <div
                key={model.id}
                style={{
                  background: '#1e293b',
                  border: isExpanded ? '1px solid #10b981' : '1px solid #334155',
                  borderRadius: '12px',
                  padding: isMobile ? '12px' : '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  transition: 'all 0.2s ease',
                }}
              >
                {/* Top info */}
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: model.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                    }}
                  >
                    <IconComponent size={20} color="#ffffff" />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3
                      style={{
                        fontSize: '1rem',
                        fontWeight: 800,
                        color: '#ffffff',
                        margin: 0,
                        lineHeight: 1.3,
                      }}
                    >
                      {model.name}
                    </h3>

                    <p style={{ fontSize: '0.78rem', color: '#cbd5e1', margin: '3px 0 6px 0', lineHeight: '1.35' }}>
                      {model.tagline}
                    </p>

                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          background: 'rgba(56, 189, 248, 0.15)',
                          color: '#38bdf8',
                          padding: '2px 7px',
                          borderRadius: '10px',
                          border: '1px solid rgba(56, 189, 248, 0.3)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px',
                        }}
                      >
                        <Layers size={11} /> 1・2年次履修モデル
                      </span>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          background: 'rgba(16, 185, 129, 0.15)',
                          color: '#34d399',
                          padding: '2px 7px',
                          borderRadius: '10px',
                          border: '1px solid rgba(16, 185, 129, 0.3)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px',
                        }}
                      >
                        <Award size={11} /> {model.totalCoursesCount} 科目 ({model.totalCredits} 単位)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions Bar */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginTop: '2px',
                    paddingTop: '8px',
                    borderTop: '1px solid #334155',
                  }}
                >
                  <button
                    onClick={(e) => toggleExpand(model.id, e)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#94a3b8',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 0',
                    }}
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp size={15} /> 閉じる
                      </>
                    ) : (
                      <>
                        <ChevronDown size={15} /> 科目内訳 ({model.courses.length}件)
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleSelectModel(model)}
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '6px 12px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                      boxShadow: '0 2px 8px rgba(16, 185, 129, 0.25)',
                      flex: isMobile ? '1 1 100%' : 'none',
                    }}
                  >
                    <Check size={14} />
                    <span>このモデルを反映</span>
                  </button>
                </div>

                {/* Expanded course table preview */}
                {isExpanded && (
                  <div
                    style={{
                      marginTop: '6px',
                      background: '#0f172a',
                      borderRadius: '8px',
                      padding: '8px',
                      border: '1px solid #334155',
                      maxHeight: '220px',
                      overflowY: 'auto',
                    }}
                  >
                    <table
                      style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        fontSize: '0.72rem',
                        color: '#cbd5e1',
                      }}
                    >
                      <thead>
                        <tr style={{ borderBottom: '1px solid #334155', color: '#94a3b8', textAlign: 'left' }}>
                          <th style={{ padding: '3px 4px' }}>年</th>
                          <th style={{ padding: '3px 4px' }}>Q</th>
                          <th style={{ padding: '3px 4px' }}>科目名</th>
                          <th style={{ padding: '3px 4px' }}>単位</th>
                        </tr>
                      </thead>
                      <tbody>
                        {model.courses.map((c, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid #1e293b' }}>
                            <td style={{ padding: '3px 4px', color: '#f8fafc', fontWeight: 600 }}>{c.year}年</td>
                            <td style={{ padding: '3px 4px', color: '#38bdf8' }}>{c.quarterStr}</td>
                            <td style={{ padding: '3px 4px', color: '#ffffff', fontWeight: 500 }}>{c.subjectRaw}</td>
                            <td style={{ padding: '3px 4px' }}>{c.credits}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: isMobile ? '10px 16px' : '14px 24px',
            background: '#1e293b',
            borderTop: '1px solid #334155',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
            ※ モデル適用後もタイムラインで自由に変更可能です。
          </span>
          <button
            onClick={onClose}
            style={{
              background: '#334155',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '6px 14px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};
