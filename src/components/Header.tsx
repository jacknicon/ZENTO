import React, { useState } from 'react';
import {
  Camera,
  Download,
  Upload,
  Network,
  Sparkles,
  ExternalLink,
  BookOpen,
  Share2,
  Menu,
  X,
  HelpCircle,
} from 'lucide-react';
import type { GraduationSummary } from '../types/syllabus';
import { exportPlanToCSV, generateSlackShareText } from '../utils/storage';
import { exportScheduleAsImage } from '../utils/imageExporter';

interface HeaderProps {
  planTitle: string;
  setPlanTitle: (title: string) => void;
  summary: GraduationSummary;
  coursesMap: Map<string, any>;
  plan: any[];
  setPlan: (plan: any[]) => void;
  favoriteNames?: Set<string>;
  onImportFavorites?: (names: string[]) => void;
  onOpenGraphModal: () => void;
  onOpenPresetModal: () => void;
  onOpenAiModal: () => void;
  onOpenUsageModal: () => void;
  showArrows: boolean;
  setShowArrows: (show: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  planTitle,
  setPlanTitle,
  summary,
  coursesMap,
  plan,
  setPlan,
  favoriteNames,
  onImportFavorites,
  onOpenGraphModal,
  onOpenPresetModal,
  onOpenAiModal,
  onOpenUsageModal,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleExportImage = () => {
    exportScheduleAsImage('zento-timeline-board', planTitle, true);
    setIsMobileMenuOpen(false);
  };

  const handleSlackShareText = () => {
    const text = generateSlackShareText(plan, summary, planTitle, true);
    navigator.clipboard.writeText(text);
    alert('履修状況の共有テキストをクリップボードにコピーしました！\n（※成績評価は非表示マスクされています）');
    setIsMobileMenuOpen(false);
  };

  const handleExportCSV = () => {
    exportPlanToCSV(plan, coursesMap, planTitle, favoriteNames);
    setIsMobileMenuOpen(false);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        if (file.name.endsWith('.json')) {
          const json = JSON.parse(text);
          if (Array.isArray(json.plan)) {
            setPlan(json.plan);
            if (json.title) setPlanTitle(json.title);
            if (Array.isArray(json.favorites) && onImportFavorites) {
              onImportFavorites(json.favorites);
            }
            alert('JSON計画ファイルを正常に読み込みました。');
          } else {
            alert('有効なZENTO計画JSONファイルではありません。');
          }
        } else if (file.name.endsWith('.csv')) {
          const lines = text.split(/\r?\n/).filter((l) => l.trim() !== '');
          if (lines.length > 1) {
            const header = lines[0].split(',').map((h) => h.replace(/^"|"$/g, '').trim());
            const subjectIdx = header.findIndex((h) => h.includes('科目名') || h.includes('subjectName'));
            const yearIdx = header.findIndex((h) => h.includes('年次') || h.includes('year'));
            const qIdx = header.findIndex((h) => h.includes('クォーター') || h.includes('quarter') || h.includes('Q'));
            const gradeIdx = header.findIndex((h) => h.includes('成績') || h.includes('評価') || h.includes('grade'));
            const keepIdx = header.findIndex((h) => h.includes('キープ') || h.includes('favorite') || h.includes('keep'));

            if (subjectIdx !== -1) {
              const newPlan: any[] = [];
              const importedFavs: string[] = [];

              for (let i = 1; i < lines.length; i++) {
                const cols = lines[i].split(',').map((c) => c.replace(/^"|"$/g, '').trim());
                const sName = cols[subjectIdx];
                if (!sName) continue;

                if (keepIdx !== -1 && cols[keepIdx]) {
                  const keepVal = cols[keepIdx];
                  if (keepVal.includes('★') || keepVal === '1' || keepVal.toLowerCase() === 'true' || keepVal.includes('キープ')) {
                    importedFavs.push(sName);
                  }
                }

                let isPlaced = true;
                let yearVal: 1 | 2 | 3 | 4 = 1;
                if (yearIdx !== -1 && cols[yearIdx] && cols[yearIdx] !== '-') {
                  const yNum = parseInt(cols[yearIdx].replace(/[^0-9]/g, ''), 10);
                  if (yNum >= 1 && yNum <= 4) {
                    yearVal = yNum as 1 | 2 | 3 | 4;
                  } else {
                    isPlaced = false;
                  }
                } else if (yearIdx !== -1 && cols[yearIdx] === '-') {
                  isPlaced = false;
                }

                let qVal: '1Q' | '2Q' | '3Q' | '4Q' = '1Q';
                if (qIdx !== -1 && cols[qIdx] && cols[qIdx] !== '-') {
                  const rawQ = cols[qIdx];
                  if (['1Q', '2Q', '3Q', '4Q'].includes(rawQ)) {
                    qVal = rawQ as any;
                  } else {
                    isPlaced = false;
                  }
                } else if (qIdx !== -1 && cols[qIdx] === '-') {
                  isPlaced = false;
                }

                let gradeVal = '-';
                if (gradeIdx !== -1 && cols[gradeIdx]) {
                  gradeVal = cols[gradeIdx];
                }

                if (isPlaced) {
                  newPlan.push({
                    id: `${sName}-${yearVal}-${qVal}-${i}`,
                    subjectName: sName,
                    year: yearVal,
                    quarter: qVal,
                    grade: gradeVal,
                  });
                }
              }

              if (importedFavs.length > 0 && onImportFavorites) {
                onImportFavorites(importedFavs);
              }

              if (newPlan.length > 0 || importedFavs.length > 0) {
                setPlan(newPlan);
                alert(`CSVファイルから 計画:${newPlan.length}件、キープ:${importedFavs.length}件 を読み込みました。`);
              } else {
                alert('CSVファイル内に有効な科目データが見つかりませんでした。');
              }
            } else {
              alert('CSVヘッダーに「科目名」列が見つかりません。');
            }
          }
        }
      } catch (err) {
        alert('ファイルの読み込み中にエラーが発生しました。');
      }
      setIsMobileMenuOpen(false);
    };
    reader.readAsText(file);
  };

  return (
    <header className="zento-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div className="zento-logo">
          <span>ZENTO</span>
          <span className="zento-logo-tag">ZEN大学</span>
        </div>

        <input
          type="text"
          value={planTitle}
          onChange={(e) => setPlanTitle(e.target.value)}
          placeholder="プラン名..."
          className="zento-header-input"
        />
      </div>

      {/* Desktop Header Action Buttons */}
      <div className="zento-header-actions-desktop">
        <button
          onClick={onOpenUsageModal}
          className="btn-zento btn-secondary"
          title="ZENTOの使い方・ヘルプガイドを表示"
        >
          <HelpCircle size={16} color="#38bdf8" />
          <span>使い方</span>
        </button>

        <button
          onClick={handleExportImage}
          className="btn-zento btn-accent"
          title="履修計画を高画質PNG画像としてダウンロード (成績情報はマスクして保存されます)"
        >
          <Camera size={16} />
          <span>📷 画像で保存</span>
        </button>

        <button
          onClick={handleSlackShareText}
          className="btn-zento btn-secondary"
          title="履修状況共有用のテキストをクリップボードにコピー (成績情報はマスクされます)"
        >
          <Share2 size={15} color="#38bdf8" />
          <span>📋 テキスト出力</span>
        </button>

        <button
          onClick={onOpenAiModal}
          className="btn-zento btn-primary"
          title="AI相談プロンプトのコピー＆AI回答のインポート"
        >
          <Sparkles size={16} />
          <span>AIに相談</span>
        </button>

        <button
          onClick={onOpenGraphModal}
          className="btn-zento btn-secondary"
          title="前提科目の全体ネットワーク関係図を表示"
        >
          <Network size={16} color="#818cf8" />
          <span>ネットワーク図</span>
        </button>

        <button
          onClick={onOpenPresetModal}
          className="btn-zento btn-secondary"
          title="履修モデルコースを選択・一括反映"
        >
          <Sparkles size={16} color="#10b981" />
          <span>履修モデル</span>
        </button>

        <button onClick={handleExportCSV} className="btn-zento btn-secondary" title="CSVダウンロード">
          <Download size={15} />
          <span>CSV</span>
        </button>

        <label className="btn-zento btn-secondary" style={{ cursor: 'pointer' }} title="JSON/CSV読込">
          <Upload size={15} />
          <span>読込</span>
          <input type="file" accept=".json,.csv" onChange={handleImportFile} style={{ display: 'none' }} />
        </label>

        <a
          href="https://syllabus.zen.ac.jp/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-zento btn-secondary"
          style={{ textDecoration: 'none' }}
          title="ZEN大学公式シラバスサイトを開く"
        >
          <BookOpen size={15} color="#38bdf8" />
          <span>シラバス</span>
          <ExternalLink size={12} color="#94a3b8" />
        </a>
      </div>

      {/* Mobile Header Bar Trigger Buttons */}
      <div className="zento-header-actions-mobile">
        <button
          onClick={onOpenUsageModal}
          className="btn-zento btn-secondary btn-icon-only"
          title="使い方ガイド"
        >
          <HelpCircle size={18} color="#38bdf8" />
        </button>

        <button onClick={onOpenAiModal} className="btn-zento btn-primary btn-sm">
          <Sparkles size={15} />
          <span>AI相談</span>
        </button>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="btn-zento btn-secondary btn-icon-only"
          aria-label="メニューを開く"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Actions Drawer / Overlay Menu */}
      {isMobileMenuOpen && (
        <div className="zento-mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="zento-mobile-menu-modal" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <h3>メニュー・ツール</h3>
              <button onClick={() => setIsMobileMenuOpen(false)} className="btn-close">
                <X size={18} />
              </button>
            </div>

            <div className="mobile-menu-list">
              <button
                onClick={() => {
                  onOpenUsageModal();
                  setIsMobileMenuOpen(false);
                }}
                className="mobile-menu-item"
              >
                <HelpCircle size={18} color="#38bdf8" />
                <div className="menu-text">
                  <span className="title">ZENTO の使い方・ヘルプ</span>
                  <span className="desc">計画の立て方や各種機能の解説</span>
                </div>
              </button>
              <button onClick={handleExportImage} className="mobile-menu-item accent">
                <Camera size={18} />
                <div className="menu-text">
                  <span className="title">履修計画を画像で保存</span>
                  <span className="desc">成績情報を非表示にして高画質PNG保存</span>
                </div>
              </button>

              <button onClick={handleSlackShareText} className="mobile-menu-item">
                <Share2 size={18} color="#38bdf8" />
                <div className="menu-text">
                  <span className="title">Slack共有用テキストコピー</span>
                  <span className="desc">成績を含まない計画一覧をコピー</span>
                </div>
              </button>

              <button
                onClick={() => {
                  onOpenGraphModal();
                  setIsMobileMenuOpen(false);
                }}
                className="mobile-menu-item"
              >
                <Network size={18} color="#818cf8" />
                <div className="menu-text">
                  <span className="title">履修系統図 (ネットワーク)</span>
                  <span className="desc">全279科目の前提関係ノードを表示</span>
                </div>
              </button>

              <button
                onClick={() => {
                  onOpenPresetModal();
                  setIsMobileMenuOpen(false);
                }}
                className="mobile-menu-item"
              >
                <Sparkles size={18} color="#10b981" />
                <div className="menu-text">
                  <span className="title">履修モデルコース</span>
                  <span className="desc">分野別モデル計画を1クリック反映</span>
                </div>
              </button>

              <div className="mobile-menu-row">
                <button onClick={handleExportCSV} className="mobile-menu-subitem">
                  <Download size={16} />
                  <span>CSV保存</span>
                </button>

                <label className="mobile-menu-subitem" style={{ cursor: 'pointer' }}>
                  <Upload size={16} />
                  <span>JSON/CSV読込</span>
                  <input type="file" accept=".json,.csv" onChange={handleImportFile} style={{ display: 'none' }} />
                </label>
              </div>

              <a
                href="https://syllabus.zen.ac.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-menu-item"
                style={{ textDecoration: 'none' }}
              >
                <BookOpen size={18} color="#38bdf8" />
                <div className="menu-text">
                  <span className="title">ZEN大学 公式シラバス</span>
                  <span className="desc">外部シラバス検索サイトを開く</span>
                </div>
                <ExternalLink size={14} color="#94a3b8" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
