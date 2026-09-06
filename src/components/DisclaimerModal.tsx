import React from 'react';
import { AlertTriangle, Download, ShieldCheck, BookOpen, CheckCircle } from 'lucide-react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onAccept: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ isOpen, onAccept }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(6px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '16px',
          maxWidth: '580px',
          width: '100%',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          border: '1px solid #cbd5e1',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
          animation: 'fadeIn 0.2s ease-out',
        }}
      >
        {/* Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            color: '#ffffff',
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            borderBottom: '2px solid #3b82f6',
          }}
        >
          <div
            style={{
              background: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(248, 113, 113, 0.4)',
              borderRadius: '10px',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AlertTriangle size={24} color="#f87171" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
              ⚠️ ご利用前の重要注意事項 (免責・利用案内)
            </h2>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: '2px 0 0 0' }}>
              本アプリをご利用いただく前に、以下の注意事項をご確認ください。
            </p>
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            padding: '20px 24px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            fontSize: '0.84rem',
            lineHeight: 1.6,
            color: '#334155',
          }}
        >
          {/* Notice 1 */}
          <div
            style={{
              background: '#fff1f2',
              border: '1px solid #fecdd3',
              borderRadius: '10px',
              padding: '12px 14px',
              display: 'flex',
              gap: '12px',
            }}
          >
            <AlertTriangle size={20} color="#e11d48" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontWeight: 800, color: '#9f1239', marginBottom: '3px' }}>
                1. 免責事項・卒業要件等の最終自己確認
              </div>
              <div>
                本アプリは、開発者個人の履修計画用に作成したツールを改変・公開したものです。開発者個人の運用内で挙動の確認は行っておりますが、卒業要件の達成度や修得単位数、科目区分、GPAなど重要な判断は、最終的に必ずご自身で大学公式のシラバス（syllabus.zen.ac.jp）および、学生便覧、ZEN Portalにて確認してください。
              </div>
            </div>
          </div>

          {/* Notice 2 */}
          <div
            style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '10px',
              padding: '12px 14px',
              display: 'flex',
              gap: '12px',
            }}
          >
            <Download size={20} color="#15803d" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontWeight: 800, color: '#14532d', marginBottom: '3px' }}>
                2. 履修計画の保存と復元（CSV利用）
              </div>
              <div>
                履修計画の保存は、ヘッダー右上の 「CSV」 ボタンからファイルをダウンロードして保存してください。作成した計画を再度読み込む際は、ヘッダーの 「読込」 ボタンから保存したCSVファイル（またはJSON）を選択すること復元できます。
              </div>
            </div>
          </div>

          {/* Notice 3 */}
          <div
            style={{
              background: '#f0f9ff',
              border: '1px solid #bae6fd',
              borderRadius: '10px',
              padding: '12px 14px',
              display: 'flex',
              gap: '12px',
            }}
          >
            <ShieldCheck size={20} color="#0369a1" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontWeight: 800, color: '#0c4a6e', marginBottom: '3px' }}>
                3. プライバシーとデータの保護
              </div>
              <div>
                入力された履修データや成績情報は、すべてお使いのブラウザ内（ローカルストレージ）でのみ保存・処理されます。
              </div>
            </div>
          </div>

          {/* Notice 4 */}
          <div
            style={{
              background: '#faf5ff',
              border: '1px solid #e9d5ff',
              borderRadius: '10px',
              padding: '12px 14px',
              display: 'flex',
              gap: '12px',
            }}
          >
            <BookOpen size={20} color="#6b21a8" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontWeight: 800, color: '#581c87', marginBottom: '3px' }}>
                4. 学則・最新ルールの確認
              </div>
              <div>
                学則・科目開講状況・履修ルールの最新変更があった場合は、大学公式のシラバス（syllabus.zen.ac.jp）および、学生便覧、ZEN Portalにて確認してください。
              </div>
            </div>
          </div>
        </div>

        {/* Footer / Confirm Button */}
        <div
          style={{
            padding: '16px 24px 20px 24px',
            background: '#f8fafc',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <button
            onClick={onAccept}
            style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '14px',
              fontSize: '0.95rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
              transition: 'all 0.15s ease',
            }}
          >
            <CheckCircle size={18} />
            <span>上記注意事項を確認し、理解しました</span>
          </button>
        </div>
      </div>
    </div>
  );
};
