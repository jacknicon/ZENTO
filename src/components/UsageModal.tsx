import React, { useState } from 'react';
import {
  HelpCircle,
  X,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Network,
  Star,
  Camera,
  Share2,
  ShieldCheck,
  Plus,
  SlidersHorizontal,
} from 'lucide-react';

interface UsageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UsageModal: React.FC<UsageModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'requirements' | 'tools' | 'privacy'>('basic');

  if (!isOpen) return null;

  return (
    <div className="zento-modal-overlay" onClick={onClose}>
      <div
        className="zento-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '680px',
          width: '94%',
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '16px 20px',
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #334155',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(56, 189, 248, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#38bdf8',
              }}
            >
              <HelpCircle size={22} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc' }}>
                ZENTO の使い方・ヘルプ
              </h2>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8' }}>
                ZEN大学の履修計画を快適に立てるためのガイド
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              border: 'none',
              background: 'rgba(255,255,255,0.1)',
              color: '#94a3b8',
              borderRadius: '8px',
              padding: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            background: '#f8fafc',
            borderBottom: '1px solid #e2e8f0',
            padding: '4px 12px',
            gap: '4px',
            overflowX: 'auto',
          }}
        >
          <button
            onClick={() => setActiveTab('basic')}
            style={{
              padding: '8px 14px',
              fontSize: '0.8rem',
              fontWeight: 700,
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              background: activeTab === 'basic' ? '#ffffff' : 'transparent',
              color: activeTab === 'basic' ? '#4f46e5' : '#64748b',
              boxShadow: activeTab === 'basic' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
            }}
          >
            <BookOpen size={15} />
            <span>基本操作</span>
          </button>

          <button
            onClick={() => setActiveTab('requirements')}
            style={{
              padding: '8px 14px',
              fontSize: '0.8rem',
              fontWeight: 700,
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              background: activeTab === 'requirements' ? '#ffffff' : 'transparent',
              color: activeTab === 'requirements' ? '#4f46e5' : '#64748b',
              boxShadow: activeTab === 'requirements' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
            }}
          >
            <CheckCircle2 size={15} />
            <span>要件チェック</span>
          </button>

          <button
            onClick={() => setActiveTab('tools')}
            style={{
              padding: '8px 14px',
              fontSize: '0.8rem',
              fontWeight: 700,
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              background: activeTab === 'tools' ? '#ffffff' : 'transparent',
              color: activeTab === 'tools' ? '#4f46e5' : '#64748b',
              boxShadow: activeTab === 'tools' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
            }}
          >
            <Sparkles size={15} />
            <span>便利ツール</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            style={{
              padding: '8px 14px',
              fontSize: '0.8rem',
              fontWeight: 700,
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              background: activeTab === 'privacy' ? '#ffffff' : 'transparent',
              color: activeTab === 'privacy' ? '#4f46e5' : '#64748b',
              boxShadow: activeTab === 'privacy' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
            }}
          >
            <ShieldCheck size={15} />
            <span>保存＆プライバシー</span>
          </button>
        </div>

        {/* Modal Body Scroll Area */}
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1, fontSize: '0.86rem', lineHeight: '1.6' }}>
          {activeTab === 'basic' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: '#eef2ff', border: '1px solid #c7d2fe', padding: '12px 14px', borderRadius: '10px' }}>
                <h4 style={{ margin: '0 0 6px 0', color: '#3730a3', fontSize: '0.92rem', fontWeight: 700 }}>
                  1. 科目をタイムラインに追加する
                </h4>
                <p style={{ margin: 0, color: '#4338ca' }}>
                  左側の<b>科目カタログ</b>から目的の科目を探し、科目カードの「<Plus size={12} style={{ display: 'inline' }} />」ボタンをタップするか、タイムラインの各クォーター枠へドラッグ＆ドロップします。
                </p>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px 14px', borderRadius: '10px' }}>
                <h4 style={{ margin: '0 0 6px 0', color: '#1e293b', fontSize: '0.92rem', fontWeight: 700 }}>
                  2. 成績評価の入力とGPA計算
                </h4>
                <p style={{ margin: 0, color: '#475569' }}>
                  タイムライン上の科目にある成績プルダウンから<b>「S / A / B / C / D」</b>を選択すると、単位が確定し、自動的にGPAおよび進級要件単位数がアップデートされます。
                </p>
              </div>

              <div style={{ background: '#fffbeb', border: '1px solid #fde68a', padding: '12px 14px', borderRadius: '10px' }}>
                <h4 style={{ margin: '0 0 6px 0', color: '#92400e', fontSize: '0.92rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Star size={16} fill="#f59e0b" color="#d97706" />
                  3. 気になる科目を「★ キープ」
                </h4>
                <p style={{ margin: 0, color: '#b45309' }}>
                  科目カードの「★」アイコンを押すと検討リストに保存されます。検索バー横の「<SlidersHorizontal size={12} style={{ display: 'inline' }} /> 絞り込み」から「★ キープ」フィルタを選ぶと、迷っている科目だけをサッと確認できます。
                </p>
              </div>
            </div>
          )}

          {activeTab === 'requirements' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '12px 14px', borderRadius: '10px' }}>
                <h4 style={{ margin: '0 0 6px 0', color: '#166534', fontSize: '0.92rem', fontWeight: 700 }}>
                  🎓 卒業判定ダッシュボード
                </h4>
                <p style={{ margin: '0 0 8px 0', color: '#15803d' }}>
                  画面上部のメーターで、卒業要件（全124単位）および科目区分ごとの最低必要単位のクリア状況をリアルタイム監視します。
                </p>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#166534' }}>
                  <li><b>基礎科目</b>: 必要単位数（各コース指定）の自動チェック</li>
                  <li><b>専門科目</b>: 必要な専門単位数の進捗可視化</li>
                  <li><b>不足項目表示</b>: あと何の単位が足りないか具体的に提示</li>
                </ul>
              </div>

              <div style={{ background: '#fff7ed', border: '1px solid #ffedd5', padding: '12px 14px', borderRadius: '10px' }}>
                <h4 style={{ margin: '0 0 6px 0', color: '#9a3412', fontSize: '0.92rem', fontWeight: 700 }}>
                  📈 進級要件判定 (1〜3年次合計)
                </h4>
                <p style={{ margin: 0, color: '#c2410c' }}>
                  1年次〜3年次修了時点で<b>90単位以上</b>を取得できているかを判定し、4年次の卒業プロジェクト着手資格を満たしているか確認できます。
                </p>
              </div>

              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '12px 14px', borderRadius: '10px' }}>
                <h4 style={{ margin: '0 0 6px 0', color: '#991b1b', fontSize: '0.92rem', fontWeight: 700 }}>
                  ⚠️ 前提科目の未履修アラート
                </h4>
                <p style={{ margin: 0, color: '#b91c1c' }}>
                  「データサイエンス概論」を未履修のまま「機械学習概論」を配置するなど、履修順序が逆転している場合は赤い警告アイコンが表示されます。
                </p>
              </div>
            </div>
          )}

          {activeTab === 'tools' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '12px 14px', borderRadius: '10px' }}>
                <h4 style={{ margin: '0 0 6px 0', color: '#065f46', fontSize: '0.92rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={16} color="#10b981" /> 履修モデルコース (全11コース)
                </h4>
                <p style={{ margin: 0, color: '#047857' }}>
                  「データサイエンス」「Webエンジニア」「AI研究」などの目指す方向性に合わせて、4年間の推奨科目セットを1クリックで一括反映できます。
                </p>
              </div>

              <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', padding: '12px 14px', borderRadius: '10px' }}>
                <h4 style={{ margin: '0 0 6px 0', color: '#5b21b6', fontSize: '0.92rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Network size={16} color="#818cf8" /> 履修系統図 (前提関係マップ)
                </h4>
                <p style={{ margin: 0, color: '#6d28d9' }}>
                  全279科目の依存関係をビジュアルなネットワークグラフで表示。どの科目がどの科目の前提条件になっているのか直感的に把握できます。
                </p>
              </div>

              <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', padding: '12px 14px', borderRadius: '10px' }}>
                <h4 style={{ margin: '0 0 6px 0', color: '#075985', fontSize: '0.92rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={16} color="#38bdf8" /> AI履修相談
                </h4>
                <p style={{ margin: 0, color: '#0369a1' }}>
                  あなたの現在の履修状況と不足単位数を反映した相談プロンプトを自動生成。ChatGPTやClaudeに貼り付けて提案された科目表をワンクリックでZENTOに取り込めます。
                </p>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px 14px', borderRadius: '10px' }}>
                <h4 style={{ margin: '0 0 6px 0', color: '#0f172a', fontSize: '0.92rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={16} color="#10b981" /> 完全ローカル保存
                </h4>
                <p style={{ margin: 0, color: '#475569' }}>
                  ZENTOで作成した履修計画データは、お使いのブラウザ内（ローカルストレージ）にのみ保存されます。<b>外部サーバーへの個人データ送信は一切行われません。</b>
                </p>
              </div>

              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '12px 14px', borderRadius: '10px' }}>
                <h4 style={{ margin: '0 0 6px 0', color: '#166534', fontSize: '0.92rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Camera size={16} /> <Share2 size={16} /> プライバシー保護共有（画像＆テキスト）
                </h4>
                <p style={{ margin: 0, color: '#15803d' }}>
                  「📷 画像で保存」や「📋 テキスト出力」機能を利用する際、<b>成績（S/A/B/C/D）は自動的に「-」へマスク非表示化</b>されます。成績のバレを心配することなく、安心してSlackやSNSに共有できます。
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '12px 20px',
            background: '#f8fafc',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <button onClick={onClose} className="btn-zento btn-primary" style={{ padding: '6px 20px' }}>
            理解しました
          </button>
        </div>
      </div>
    </div>
  );
};
