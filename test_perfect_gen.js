const fs = require('fs');
const path = require('path');

const syllabusData = JSON.parse(fs.readFileSync('./src/data/syllabus_data.json', 'utf8'));
const syllabusMap = new Map();
syllabusData.forEach((c) => {
  syllabusMap.set(c['科目名'], c);
  const norm = c['科目名'].replace(/\s+/g, '').replace(/（/g, '(').replace(/）/g, ')');
  syllabusMap.set(norm, c);
});

function getCleanSubjectName(rawName) {
  const trimmed = rawName.trim();
  if (syllabusMap.has(trimmed)) return trimmed;
  const match = trimmed.match(/基礎科目（[^：:]+[：:](.+)）/);
  if (match && syllabusMap.has(match[1])) return match[1];
  return trimmed;
}

function getCourseInfo(rawName) {
  const cleanName = getCleanSubjectName(rawName);
  const course = syllabusMap.get(cleanName);
  return {
    cleanName,
    credits: course ? course['単位数'] : 2,
    category: course ? course['科目区分'] || course['科目分類'] || '展開科目' : '導入科目',
    domain: course ? course['学問分野名'] || '情報' : '導入',
    offeredQ: course ? course['開講Q'] || '' : '',
  };
}

// Model 1: データサイエンス・AI (Perfected)
const dsAiCourses = [
  // 1年1Q (1Q/3Q courses)
  { subjectRaw: 'アカデミックリテラシー', year: 1, quarterStr: '1Q', notes: '必修' },
  { subjectRaw: 'ITリテラシー', year: 1, quarterStr: '1Q', notes: '必修' },
  { subjectRaw: '人文社会入門', year: 1, quarterStr: '1Q', notes: '導入要件' },
  { subjectRaw: 'デジタルツールの使い方', year: 1, quarterStr: '1Q', notes: '必修' },
  // 1年2Q (2Q/4Q courses)
  { subjectRaw: '多言語ITコミュニケーション', year: 1, quarterStr: '2Q', notes: '必修' },
  { subjectRaw: '基礎科目（数理：数学の方法）', year: 1, quarterStr: '2Q', notes: '数理基礎' },
  { subjectRaw: '基礎科目（文化・思想：心理学）', year: 1, quarterStr: '2Q', notes: '基礎科目要件' },
  { subjectRaw: '基礎科目（経済：企業経営）', year: 1, quarterStr: '2Q', notes: '基礎科目要件' },
  { subjectRaw: '導入科目選択A', year: 1, quarterStr: '1-2Q', notes: '導入要件' },
  // 1年3Q (1Q/3Q courses)
  { subjectRaw: '線形代数1', year: 1, quarterStr: '3Q', notes: '基盤数理' },
  { subjectRaw: '基礎科目（数理：初等代数概論）', year: 1, quarterStr: '3Q', notes: '基礎科目要件' },
  { subjectRaw: '基礎科目（社会・NW：社会学Ⅰ）', year: 1, quarterStr: '3Q', notes: '基礎科目要件' },
  { subjectRaw: 'マンガ産業史', year: 1, quarterStr: '3Q', notes: 'デジタル産業指定要件' },
  // 1年4Q (2Q/4Q courses)
  { subjectRaw: '基礎科目（情報：データサイエンス概論）', year: 1, quarterStr: '4Q', notes: '基礎科目要件' },
  { subjectRaw: 'Pythonプログラミング', year: 1, quarterStr: '4Q', notes: 'プログラミング基礎' },
  { subjectRaw: '解析学1', year: 1, quarterStr: '4Q', notes: '基盤数理' },
  { subjectRaw: '統計学入門', year: 1, quarterStr: '4Q', notes: '【追加】データ分析前提' },
  // 2年1Q (1Q/3Q courses)
  { subjectRaw: '機械学習概論', year: 2, quarterStr: '1Q', notes: 'AI専門' },
  { subjectRaw: '線形代数2', year: 2, quarterStr: '1Q', notes: '基盤数理' },
  { subjectRaw: 'コンピューターサイエンス概論', year: 2, quarterStr: '1Q', notes: 'CS基礎' },
  { subjectRaw: 'ビッグデータ分析概論', year: 2, quarterStr: '1Q', notes: 'データ分析専門' },
  // 2年2Q (2Q/4Q courses)
  { subjectRaw: '解析学2', year: 2, quarterStr: '2Q', notes: '基盤数理' },
  { subjectRaw: 'ミクロ経済学', year: 2, quarterStr: '2Q', notes: '世界理解' },
  { subjectRaw: '意思決定の能力開発', year: 2, quarterStr: '2Q', notes: '世界理解' },
  { subjectRaw: '計算機実験で学ぶ確率とモンテカルロ法', year: 2, quarterStr: '2Q', notes: '情報演習' },
  { subjectRaw: '機械翻訳実践（情報）', year: 2, quarterStr: '1-2Q', notes: '多言語要件' },
  // 2年3Q (1Q/3Q courses)
  { subjectRaw: 'ディープラーニング1', year: 2, quarterStr: '3Q', notes: 'AI専門(1Q,3Q開講に補正)' },
  { subjectRaw: '科学哲学', year: 2, quarterStr: '3Q', notes: '世界理解' },
  // 2年4Q (2Q/4Q courses)
  { subjectRaw: 'ディープラーニング2', year: 2, quarterStr: '4Q', notes: 'DL1履修後発展' },
  { subjectRaw: 'データベース運用実践', year: 2, quarterStr: '4Q', notes: 'DB専門' },
  { subjectRaw: 'AIアルゴリズム実践', year: 2, quarterStr: '3-4Q', notes: '考究科目' },
  { subjectRaw: 'マーケティング × データサイエンス', year: 2, quarterStr: '3-4Q', notes: '考究科目' },
  { subjectRaw: '数理科学発展演習Ⅰ', year: 2, quarterStr: '3-4Q', notes: '【最適化】基礎数理完結後演習' },
  { subjectRaw: '機械翻訳実践（自然科学）', year: 2, quarterStr: '3-4Q', notes: '多言語要件' },
  { subjectRaw: '導入科目選択B', year: 2, quarterStr: '3-4Q', notes: '導入要件完了(計14単位)' },
];

console.log('Processed Model 1 DS/AI count:', dsAiCourses.length);
