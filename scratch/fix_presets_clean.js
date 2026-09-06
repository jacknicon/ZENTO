const fs = require('fs');

let code = fs.readFileSync('./build_perfect_presets.js', 'utf8');

// 1. Ensure buildEntry returns subjectRaw as cleanName
code = code.replace(
  'subjectRaw: rawName,',
  'subjectRaw: cleanName,'
);

// 2. Replace 現代社会と数学 in 3-4Q with 3Q (official Q is 1Q, 3Q)
code = code.replace(
  /buildEntry\('現代社会と数学', 2, '3-4Q', '[^']+'\)/g,
  "buildEntry('現代社会と数学', 2, '3Q', '【置換】導入選択(社会と数学)')"
);

fs.writeFileSync('./build_perfect_presets.js', code);
console.log('Fixed 現代社会と数学 to 3Q!');
