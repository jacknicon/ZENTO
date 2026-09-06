const fs = require('fs');

let code = fs.readFileSync('./build_perfect_presets.js', 'utf8');

// Replace the last entry of each model array
code = code.replace(
  /buildEntry\('現代社会と数学', 2, '3Q', '[^']+'\),/g,
  "buildEntry('現代社会と数学', 2, '3Q', '【置換】導入選択(社会と数学)'),\n    buildEntry('プロジェクト実践', 4, '1-2Q', '卒業プロジェクト(4単位)'),"
);

fs.writeFileSync('./build_perfect_presets.js', code);
console.log('Successfully added プロジェクト実践 to all 11 models in build_perfect_presets.js!');
