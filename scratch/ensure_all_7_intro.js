const fs = require('fs');

let code = fs.readFileSync('./build_perfect_presets.js', 'utf8');

const all7Intro = [
  "buildEntry('アカデミックリテラシー', 1, '1Q', '必修')",
  "buildEntry('ITリテラシー', 1, '1Q', '必修')",
  "buildEntry('人文社会入門', 1, '1Q', '導入科目')",
  "buildEntry('人工知能活用実践', 1, '1-2Q', '導入科目(多言語前提)')",
  "buildEntry('デジタルツールの使い方', 1, '2Q', '必修')",
  "buildEntry('経済入門', 1, '2Q', '導入科目')",
  "buildEntry('現代社会と数学', 1, '3Q', '導入科目')",
];

// Let's write a parser and updater for rawModelsData in build_perfect_presets.js
const syllabusData = JSON.parse(fs.readFileSync('./src/data/syllabus_data.json', 'utf8'));
const syllabusMap = new Map();
syllabusData.forEach((c) => {
  syllabusMap.set(c['科目名'], c);
  const norm = c['科目名'].replace(/\s+/g, '').replace(/（/g, '(').replace(/）/g, ')');
  syllabusMap.set(norm, c);
});

// Let's check build_perfect_presets.js
console.log('Script loaded');
