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

  const handleSelectModel = (model: PresetModel) => {
    const confirmMsg = `「${model.name}」推奨履修モデルをタイムラインに適用しますか？\n\n※現在配置中の科目は上書きされ、モデルの全 ${model.totalCoursesCount} 科目（${model.totalCredits}単位・4年次「プロジェクト実践」含む）が年次計画に自動配置されます。`;
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
          width: '94%',
          maxWidth: '1000px',
          maxHeight: '90vh',
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
            padding: '20px 24px',
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            borderBottom: '1px solid #334155',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
              }}
            >
              <Sparkles size={22} color="#ffffff" />
            </div>
            <div>
              <h2
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                大学推奨 履修モデルコース（全11コース）
              </h2>
              <p style={{ fontSize: '0.83rem', color: '#94a3b8', margin: '3px 0 0 0' }}>
                専攻したい分野や興味に合わせた履修パターンを選択して、一括でタイムライン（4年次卒業プロジェクト含む）に反映できます。
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Content Body */}
        <div
          style={{
            padding: '20px 24px',
            overflowY: 'auto',
            flex: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(440px, 1fr))',
            gap: '16px',
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
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                }}
              >
                {/* Top info */}
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '10px',
                      background: model.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                    }}
                  >
                    <IconComponent size={24} color="#ffffff" />
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <h3
                        style={{
                          fontSize: '1.05rem',
                          fontWeight: 700,
                          color: '#ffffff',
                          margin: 0,
                        }}
                      >
                        {model.name}
                      </h3>
                    </div>

                    <p style={{ fontSize: '0.8rem', color: '#cbd5e1', margin: '4px 0 8px 0', lineHeight: '1.35' }}>
                      {model.tagline}
                    </p>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          background: 'rgba(56, 189, 248, 0.15)',
                          color: '#38bdf8',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          border: '1px solid rgba(56, 189, 248, 0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <Layers size={12} /> 1・2年次履修モデル
                      </span>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          background: 'rgba(16, 185, 129, 0.15)',
                          color: '#34d399',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          border: '1px solid rgba(16, 185, 129, 0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <Award size={12} /> {model.totalCoursesCount} 科目 ({model.totalCredits} 単位)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '4px',
                    paddingTop: '10px',
                    borderTop: '1px solid #334155',
                  }}
                >
                  <button
                    onClick={(e) => toggleExpand(model.id, e)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#94a3b8',
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 0',
                    }}
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp size={16} /> 科目一覧を閉じる
                      </>
                    ) : (
                      <>
                        <ChevronDown size={16} /> 履修科目内訳 ({model.courses.length}件) を表示
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
                      padding: '6px 14px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 2px 8px rgba(16, 185, 129, 0.25)',
                      transition: 'transform 0.1s ease',
                    }}
                    onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.97)')}
                    onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <Check size={15} />
                    <span>このモデルを適用</span>
                  </button>
                </div>

                {/* Expanded course table preview */}
                {isExpanded && (
                  <div
                    style={{
                      marginTop: '8px',
                      background: '#0f172a',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      border: '1px solid #334155',
                      maxHeight: '260px',
                      overflowY: 'auto',
                    }}
                  >
                    <table
                      style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        fontSize: '0.75rem',
                        color: '#cbd5e1',
                      }}
                    >
                      <thead>
                        <tr style={{ borderBottom: '1px solid #334155', color: '#94a3b8', textAlign: 'left' }}>
                          <th style={{ padding: '4px 6px' }}>年次</th>
                          <th style={{ padding: '4px 6px' }}>学期</th>
                          <th style={{ padding: '4px 6px' }}>科目名</th>
                          <th style={{ padding: '4px 6px' }}>単位</th>
                          <th style={{ padding: '4px 6px' }}>区分</th>
                          <th style={{ padding: '4px 6px' }}>備考</th>
                        </tr>
                      </thead>
                      <tbody>
                        {model.courses.map((c, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid #1e293b' }}>
                            <td style={{ padding: '4px 6px', color: '#f8fafc', fontWeight: 600 }}>{c.year}年</td>
                            <td style={{ padding: '4px 6px', color: '#38bdf8' }}>{c.quarterStr}</td>
                            <td style={{ padding: '4px 6px', color: '#ffffff', fontWeight: 500 }}>{c.subjectRaw}</td>
                            <td style={{ padding: '4px 6px' }}>{c.credits}</td>
                            <td style={{ padding: '4px 6px', color: '#a7f3d0' }}>{c.category}</td>
                            <td style={{ padding: '4px 6px', color: '#fcd34d' }}>{c.notes}</td>
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
            padding: '14px 24px',
            background: '#1e293b',
            borderTop: '1px solid #334155',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
            ※ モデル適用後も、タイムライン上で自由に追加・移動・削除・成績管理が可能です。
          </span>
          <button
            onClick={onClose}
            style={{
              background: '#334155',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '6px 16px',
              fontSize: '0.82rem',
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
