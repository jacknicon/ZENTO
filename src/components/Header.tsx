import React from 'react';
import {
  Camera,
  Download,
  Upload,
  Network,
  Sparkles,
  ExternalLink,
  BookOpen,
  Share2,
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
  onOpenGraphModal: () => void;
  onOpenPresetModal: () => void;
  onOpenAiModal: () => void;
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
  onOpenGraphModal,
  onOpenPresetModal,
  onOpenAiModal,
}) => {
  const handleExportImage = () => {
    // Force grade masking by default (hideGrades = true)
    exportScheduleAsImage('zento-timeline-board', planTitle, true);
  };

  const handleSlackShareText = () => {
    // Force grade masking by default (hideGrades = true)
    const text = generateSlackShareText(plan, summary, planTitle, true);
    navigator.clipboard.writeText(text);
    alert('履修状況の共有テキストをクリップボードにコピーしました！\n（※成績評価は非表示マスクされています）');
  };

  const handleExportCSV = () => {
    exportPlanToCSV(plan, coursesMap, planTitle);
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

            if (subjectIdx !== -1) {
              const newPlan: any[] = [];
              for (let i = 1; i < lines.length; i++) {
                const cols = lines[i].split(',').map((c) => c.replace(/^"|"$/g, '').trim());
                const sName = cols[subjectIdx];
                if (!sName) continue;

                let yearVal: 1 | 2 | 3 | 4 = 1;
                if (yearIdx !== -1 && cols[yearIdx]) {
                  const yNum = parseInt(cols[yearIdx].replace(/[^0-9]/g, ''), 10);
                  if (yNum >= 1 && yNum <= 4) yearVal = yNum as 1 | 2 | 3 | 4;
                }

                let qVal: '1Q' | '2Q' | '3Q' | '4Q' = '1Q';
                if (qIdx !== -1 && cols[qIdx]) {
                  const rawQ = cols[qIdx];
                  if (['1Q', '2Q', '3Q', '4Q'].includes(rawQ)) {
                    qVal = rawQ as any;
                  }
                }

                let gradeVal = '-';
                if (gradeIdx !== -1 && cols[gradeIdx]) {
                  gradeVal = cols[gradeIdx];
                }

                newPlan.push({
                  id: `${sName}-${yearVal}-${qVal}-${i}`,
                  subjectName: sName,
                  year: yearVal,
                  quarter: qVal,
                  grade: gradeVal,
                });
              }

              if (newPlan.length > 0) {
                setPlan(newPlan);
                alert(`CSV計画ファイルから ${newPlan.length} 件の科目を正常に読み込みました。`);
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
    };
    reader.readAsText(file);
  };

  return (
    <header className="zento-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div className="zento-logo">
          <span>ZENTO</span>
          <span className="zento-logo-tag">ZEN大学 履修計画</span>
        </div>

        <input
          type="text"
          value={planTitle}
          onChange={(e) => setPlanTitle(e.target.value)}
          placeholder="プラン名を入力..."
          style={{
            border: '1px solid #334155',
            background: '#1e293b',
            color: '#ffffff',
            borderRadius: '6px',
            padding: '4px 10px',
            fontSize: '0.82rem',
            fontWeight: 600,
            width: '150px',
          }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <button
          onClick={handleExportImage}
          className="btn-zento btn-accent"
          title="履修計画を高画質PNG画像としてダウンロード (成績情報はマスクして保存されます)"
        >
          <Camera size={16} />
          <span>📷 履修登録を画像で保存</span>
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
          title="大学公式推奨履修モデルを選択・一括反映"
        >
          <Sparkles size={16} color="#10b981" />
          <span>推奨モデル</span>
        </button>

        <button onClick={handleExportCSV} className="btn-zento btn-secondary" title="CSVダウンロード (成績情報含む)">
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
          <span>公式シラバス</span>
          <ExternalLink size={12} color="#94a3b8" />
        </a>
      </div>
    </header>
  );
};


