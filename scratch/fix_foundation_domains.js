const fs = require('fs');

let code = fs.readFileSync('./build_perfect_presets.js', 'utf8');

// 1. DS-AI: Add 数学史 (1年 3Q, 数理ドメイン)
if (!code.includes("buildEntry('基礎科目（数理：数学史）', 1, '3Q', '基礎科目要件')")) {
  code = code.replace(
    "buildEntry('線形代数1', 1, '3Q', '基盤数理'),",
    "buildEntry('線形代数1', 1, '3Q', '基盤数理'),\n    buildEntry('基礎科目（数理：数学史）', 1, '3Q', '基礎科目要件'),"
  );
}

// 2. Web-App: Add 数学史 (1年 3Q, 数理ドメイン) & 心理学 (1年 4Q, 文化・思想ドメイン)
if (!code.includes("buildEntry('基礎科目（数理：数学史）', 1, '3Q', '基礎科目要件(Web)'")) {
  code = code.replace(
    "buildEntry('Webアプリケーション開発3', 1, '3Q', '【追加】バックエンド・API開発'),",
    "buildEntry('Webアプリケーション開発3', 1, '3Q', '【追加】バックエンド・API開発'),\n    buildEntry('基礎科目（数理：数学史）', 1, '3Q', '基礎科目要件'),"
  );
  code = code.replace(
    "buildEntry('基礎科目（文化・思想：哲学概論）', 1, '4Q', '基礎科目要件'),",
    "buildEntry('基礎科目（文化・思想：哲学概論）', 1, '4Q', '基礎科目要件'),\n    buildEntry('基礎科目（文化・思想：心理学）', 1, '4Q', '基礎科目要件'),"
  );
}

// 3. Business-Marketing: Add 数学史 (1年 3Q, 数理ドメイン)
if (!code.includes("buildEntry('基礎科目（数理：数学史）', 1, '3Q', '基礎科目要件(Business)'")) {
  code = code.replace(
    "buildEntry('経済言説史', 1, '3Q', '世界理解科目'),",
    "buildEntry('経済言説史', 1, '3Q', '世界理解科目'),\n    buildEntry('基礎科目（数理：数学史）', 1, '3Q', '基礎科目要件'),"
  );
}

// 4. Info-Security: Add 数学史 (1年 3Q, 数理ドメイン) & 心理学 (1年 4Q, 文化・思想ドメイン)
if (!code.includes("buildEntry('基礎科目（数理：数学史）', 1, '3Q', '基礎科目要件(Sec)'")) {
  code = code.replace(
    "buildEntry('基礎科目（数理：初等代数概論）', 1, '3Q', '暗号数理の準備'),",
    "buildEntry('基礎科目（数理：初等代数概論）', 1, '3Q', '暗号数理の準備'),\n    buildEntry('基礎科目（数理：数学史）', 1, '3Q', '基礎科目要件'),"
  );
  code = code.replace(
    "buildEntry('基礎科目（経済：企業経営）', 1, '4Q', '基礎科目要件'),\n    buildEntry('情報社会の総合安全保障', 1, '4Q', '世界理解科目'),",
    "buildEntry('基礎科目（経済：企業経営）', 1, '4Q', '基礎科目要件'),\n    buildEntry('基礎科目（文化・思想：心理学）', 1, '4Q', '基礎科目要件'),\n    buildEntry('情報社会の総合安全保障', 1, '4Q', '世界理解科目'),"
  );
}

// 5. Cognitive Science: Add 数学史 (1年 3Q, 数理ドメイン)
if (!code.includes("buildEntry('基礎科目（数理：数学史）', 1, '3Q', '基礎科目要件(Cog)'")) {
  code = code.replace(
    "buildEntry('線形代数1', 1, '3Q', '【追加】機械学習・DL前提数学'),",
    "buildEntry('線形代数1', 1, '3Q', '【追加】機械学習・DL前提数学'),\n    buildEntry('基礎科目（数理：数学史）', 1, '3Q', '基礎科目要件'),"
  );
}

// 6. Social Design: Add 企業経営 (1年 4Q, 経済・マーケットドメイン)
if (!code.includes("buildEntry('基礎科目（経済：企業経営）', 1, '4Q', '基礎科目要件(Social)'")) {
  code = code.replace(
    "buildEntry('基礎科目（文化・思想：心理学）', 1, '4Q', '基礎科目要件'),",
    "buildEntry('基礎科目（文化・思想：心理学）', 1, '4Q', '基礎科目要件'),\n    buildEntry('基礎科目（経済：企業経営）', 1, '4Q', '基礎科目要件'),"
  );
}

fs.writeFileSync('./build_perfect_presets.js', code);
console.log('Successfully updated build_perfect_presets.js to satisfy 100% foundation domain requirements!');
