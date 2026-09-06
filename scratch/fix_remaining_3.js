const fs = require('fs');

let code = fs.readFileSync('./build_perfect_presets.js', 'utf8');

// DS-AI: insert 数学史 in 1年 3Q
code = code.replace(
  "buildEntry('マンガ産業史', 1, '3Q', 'デジタル産業指定要件'),",
  "buildEntry('マンガ産業史', 1, '3Q', 'デジタル産業指定要件'),\n    buildEntry('基礎科目（数理：数学史）', 1, '3Q', '基礎科目要件'),"
);

// Info-Sec: insert 数学史 in 1年 3Q
code = code.replace(
  "buildEntry('IT産業史', 1, '3Q', 'デジタル産業指定要件'),",
  "buildEntry('IT産業史', 1, '3Q', 'デジタル産業指定要件'),\n    buildEntry('基礎科目（数理：数学史）', 1, '3Q', '基礎科目要件'),"
);

// Social Design: insert 企業経営 in 1年 4Q
code = code.replace(
  "buildEntry('マルクス経済学', 1, '4Q', '世界理解科目'),",
  "buildEntry('マルクス経済学', 1, '4Q', '世界理解科目'),\n    buildEntry('基礎科目（経済：企業経営）', 1, '4Q', '基礎科目要件'),"
);

fs.writeFileSync('./build_perfect_presets.js', code);
console.log('Successfully updated build_perfect_presets.js!');
