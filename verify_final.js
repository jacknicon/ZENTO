const fs = require('fs');

const syllabusData = JSON.parse(fs.readFileSync('./src/data/syllabus_data.json', 'utf8'));
const syllabusMap = new Map();
syllabusData.forEach((c) => {
  syllabusMap.set(c['科目名'], c);
  const norm = c['科目名'].replace(/\s+/g, '').replace(/（/g, '(').replace(/）/g, ')');
  syllabusMap.set(norm, c);
});

const tsText = fs.readFileSync('./src/data/presetModels.ts', 'utf8');
const match = tsText.match(/export const PRESET_MODELS: PresetModel\[\] = (\[[\s\S]*\]);/);
const presetModels = JSON.parse(match[1]);

console.log('=== 最終モデルデータの完全性検証 ===\n');

let totalMismatches = 0;
let totalPrereqErrors = 0;

for (const model of presetModels) {
  const placementRank = {};
  const qRank = (y, q) => (y - 1) * 4 + { '1Q': 1, '2Q': 2, '3Q': 3, '4Q': 4 }[q];

  model.courses.forEach((c) => {
    const qList = (c.quarterStr === '1-2Q') ? ['1Q', '2Q'] : (c.quarterStr === '3-4Q') ? ['3Q', '4Q'] : (c.quarterStr === '1-4Q' || c.quarterStr === '通年') ? ['1Q', '2Q', '3Q', '4Q'] : [c.quarterStr];
    const norm = c.subjectName.replace(/\s+/g, '').replace(/（/g, '(').replace(/）/g, ')');
    const minRank = Math.min(...qList.map((q) => qRank(c.year, q)));
    if (!placementRank[norm] || minRank < placementRank[norm]) {
      placementRank[norm] = minRank;
    }
  });

  const qMismatch = [];
  const prereqErrors = [];

  model.courses.forEach((c) => {
    const courseObj = syllabusMap.get(c.subjectName);
    if (!courseObj) return;

    const qStr = courseObj['開講Q'] || '';
    if (qStr && qStr !== '通年' && qStr !== '自由') {
      const q = c.quarterStr;
      let isOk = false;
      if (q === '1Q' && (qStr.includes('1') || qStr.includes('春'))) isOk = true;
      if (q === '2Q' && (qStr.includes('2') || qStr.includes('春'))) isOk = true;
      if (q === '3Q' && (qStr.includes('3') || qStr.includes('秋'))) isOk = true;
      if (q === '4Q' && (qStr.includes('4') || qStr.includes('秋'))) isOk = true;
      if (q === '1-2Q' && (qStr.includes('1-2') || qStr.includes('1Q、2Q') || (qStr.includes('1') && qStr.includes('2')))) isOk = true;
      if (q === '3-4Q' && (qStr.includes('3-4') || qStr.includes('3Q、4Q') || (qStr.includes('3') && qStr.includes('4')))) isOk = true;
      if ((q === '1-4Q' || q === '通年') && (qStr.includes('1-2Q') || qStr.includes('3-4Q') || qStr.includes('通年'))) isOk = true;

      if (!isOk) {
        qMismatch.push(`❌ 開講Q不一致: 「${c.subjectRaw}」 (配置:${c.year}年${q}, 公式:${qStr})`);
      }
    }

    if (courseObj['前提必須科目'] && courseObj['前提必須科目'].length > 0) {
      const targetRank = Math.min(
        ...(c.quarterStr === '1-2Q'
          ? [1, 2]
          : c.quarterStr === '3-4Q'
          ? [3, 4]
          : [{ '1Q': 1, '2Q': 2, '3Q': 3, '4Q': 4 }[c.quarterStr]]
        ).map((q) => qRank(c.year, typeof q === 'number' ? (q === 1 ? '1Q' : q === 2 ? '2Q' : q === 3 ? '3Q' : '4Q') : q))
      );

      courseObj['前提必須科目'].forEach((req) => {
        if (!req || req === 'なし') return;
        const normReq = req.replace(/\s+/g, '').replace(/（/g, '(').replace(/）/g, ')');
        const reqRank = placementRank[normReq];
        if (reqRank && reqRank >= targetRank) {
          prereqErrors.push(`⚠️ 前提順序違反: 「${c.subjectRaw}」の前提科目「${req}」が同Qまたは後Qに配置`);
        }
      });
    }
  });

  totalMismatches += qMismatch.length;
  totalPrereqErrors += prereqErrors.length;

  console.log(`📌 【${model.name}】: 科目数=${model.courses.length}, 単位数=${model.totalCredits}`);
  if (qMismatch.length > 0) console.log('  ' + qMismatch.join('\n  '));
  if (prereqErrors.length > 0) console.log('  ' + prereqErrors.join('\n  '));
  if (qMismatch.length === 0 && prereqErrors.length === 0) {
    console.log('  ✅ 開講Q・前提科目順序ともに100%完全適合！');
  }
}

console.log(`\n総合結果: 開講Qエラー ${totalMismatches}件, 前提順序エラー ${totalPrereqErrors}件`);
