import type { PlanItem, GraduationSummary, Course } from '../types/syllabus';

const STORAGE_KEY = 'zento_saved_plan_v1';
const PLAN_TITLE_KEY = 'zento_plan_title_v1';

export function savePlanToLocalStorage(plan: PlanItem[], title?: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
    if (title !== undefined) {
      localStorage.setItem(PLAN_TITLE_KEY, title);
    }
  } catch (err) {
    console.error('Failed to save plan to localStorage:', err);
  }
}

export function loadPlanFromLocalStorage(): { plan: PlanItem[]; title: string } | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    const title = localStorage.getItem(PLAN_TITLE_KEY) || 'マイ履修計画';
    if (!data) return null;
    const plan = JSON.parse(data) as PlanItem[];
    return { plan, title };
  } catch (err) {
    console.error('Failed to load plan from localStorage:', err);
    return null;
  }
}

export function exportPlanToCSV(
  plan: PlanItem[],
  coursesMap: Map<string, Course>,
  title: string,
  favoriteNames?: Set<string>
): void {
  const header = ['年次', 'クォーター', '科目名', '単位数', '成績評価', '学問分野', '科目区分', 'キープ'];

  const plannedSubjectNames = new Set(plan.map((p) => p.subjectName));
  const rows = plan.map((item) => {
    const course = coursesMap.get(item.subjectName);
    const isFav = favoriteNames?.has(item.subjectName) ? '★' : '-';
    return [
      `${item.year}年次`,
      item.quarter,
      `"${item.subjectName.replace(/"/g, '""')}"`,
      course?.単位数 ?? 2,
      `"${item.grade || '-'}"`,
      `"${(course?.学問分野名 || '').replace(/"/g, '""')}"`,
      `"${(course?.科目区分 || '').replace(/"/g, '""')}"`,
      `"${isFav}"`,
    ];
  });

  // Export unplaced favorited courses as rows with '-' for Year and Quarter
  if (favoriteNames) {
    favoriteNames.forEach((favName) => {
      if (!plannedSubjectNames.has(favName)) {
        const course = coursesMap.get(favName);
        rows.push([
          '-',
          '-',
          `"${favName.replace(/"/g, '""')}"`,
          course?.単位数 ?? 2,
          '"-"',
          `"${(course?.学問分野名 || '').replace(/"/g, '""')}"`,
          `"${(course?.科目区分 || '').replace(/"/g, '""')}"`,
          '"★"',
        ]);
      }
    });
  }

  const csvContent = '\uFEFF' + [header.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title || 'ZENTO_履修計画'}_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function generateAIPrompt(
  plan: PlanItem[],
  summary: GraduationSummary,
  _coursesMap: Map<string, Course>
): string {
  const uniqueSubjectNames = Array.from(new Set(plan.map((item) => item.subjectName)));
  const currentCredits = summary.totalCredits;

  const uniqueSubjectsList = uniqueSubjectNames.length > 0
    ? uniqueSubjectNames.map((name) => `- ${name}`).join('\n')
    : '- (履修計画に科目が選択されていません)';

  const unsatisfiedList = summary.unsatisfiedItems.length > 0
    ? summary.unsatisfiedItems.map((item) => `- ${item}`).join('\n')
    : '- なし (卒業要件達成済)';

  return `ZEN大学の履修計画についてアドバイスをお願いします。

## 現在の履修計画状況
現在、以下の科目を履修計画に入れています（${uniqueSubjectNames.length}科目 / 計${currentCredits}単位）:
${uniqueSubjectsList}

## 卒業要件の不足分
${unsatisfiedList}

## 依頼事項
上記の状況を踏まえて、追加で履修すべき科目をおすすめしてください。
あなたはZEN大学の全科目情報を把握していると思いますので、履修傾向から追加で履修するべき科目を提案してください。

## 回答フォーマット
前後の挨拶や導入文、解説は一切不要です。
以下のMarkdownテーブルおよびタグを、そのままワンクリックでコピーできるように「\`\`\`markdown 〜 \`\`\`」のコードブロック内にのみ出力してください。

\`\`\`markdown
| 年次 | Q | 科目ID | 科目名 | 理由 |
|------|---|--------|--------|------|
| 1 | 1Q | MTH-1-C1-1030-006 | 線形代数2 | AIを勉強するにあたって、・・・ |
\`\`\`

- 年率は半角数字（1〜4）
- QはXQ形式（1Q, 2Q, 3Q, 4Q）
- 科目IDは正確なナンバリングコードを使用
- 理由は簡潔に記載`;
}

export function generateShareText(
  plan: PlanItem[],
  summary: GraduationSummary,
  title: string,
  hideGrades: boolean = true
): string {
  const years = [1, 2, 3, 4] as const;
  const yearSummaries = years
    .map((y) => {
      const items = plan.filter((p) => p.year === y);
      if (items.length === 0) return null;

      const quarters = ['1Q', '2Q', '3Q', '4Q'] as const;
      const qLines = quarters
        .map((q) => {
          const qItems = items.filter((i) => i.quarter === q);
          if (qItems.length === 0) return null;

          const formattedNames = Array.from(
            new Set(
              qItems.map((i) => {
                if (!hideGrades && i.grade && i.grade !== '-') {
                  return `${i.subjectName}[${i.grade}]`;
                }
                return i.subjectName;
              })
            )
          );
          return `    • ${q}: ${formattedNames.join(', ')}`;
        })
        .filter(Boolean)
        .join('\n');

      return `  ■ **${y}年次**:\n${qLines}`;
    })
    .filter(Boolean)
    .join('\n');

  return `📚 **【ZENTO】${title || '私の履修計画'}** ${hideGrades ? '(🔒 成績マスク表示)' : ''}
✨ 取得予定: **${summary.totalCredits} / 124 単位**
📈 進級判定 (1〜3年次): **${summary.year1To3Credits} / 90 単位** (${summary.advancementSatisfied ? '✅ クリア' : '⚠️ 要単位追加'})
🎉 卒業条件: ${summary.unsatisfiedCount === 0 ? '全要件達成！' : `未達成残り ${summary.unsatisfiedCount} 件`}

🗓 **履修科目一覧**:
${yearSummaries || '  • まだ科目が配置されていません'}

💡 *Created with ZENTO*`;
}

export const generateSlackShareText = generateShareText;

export const PRESET_DATA_SCIENCE: Array<{ name: string; year: 1 | 2 | 3 | 4; quarter: '1Q' | '2Q' | '3Q' | '4Q' }> = [
  { name: 'アカデミックリテラシー', year: 1, quarter: '1Q' },
  { name: 'ITリテラシー', year: 1, quarter: '1Q' },
  { name: '多言語ITコミュニケーション', year: 1, quarter: '1Q' },
  { name: 'デジタルツールの使い方', year: 1, quarter: '2Q' },
  { name: 'Pythonプログラミング', year: 1, quarter: '2Q' },
  { name: '情報セキュリティ概論', year: 1, quarter: '3Q' },
  { name: 'Webアプリ開発1', year: 1, quarter: '3Q' },
  { name: 'データサイエンス概論', year: 1, quarter: '4Q' },
  { name: '情報倫理と法', year: 1, quarter: '4Q' },
  { name: 'IT産業史', year: 2, quarter: '1Q' },
  { name: '機械学習概論', year: 2, quarter: '1Q' },
  { name: 'データベース運用実践', year: 2, quarter: '2Q' },
  { name: 'ビッグデータ分析概論', year: 2, quarter: '3Q' },
  { name: 'ディープラーニング1', year: 2, quarter: '3Q' },
  { name: 'ディープラーニング2', year: 2, quarter: '4Q' },
  { name: 'プロジェクト実践', year: 3, quarter: '1Q' },
];
