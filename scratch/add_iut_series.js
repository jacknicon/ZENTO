const fs = require('fs');

let code = fs.readFileSync('./build_perfect_presets.js', 'utf8');

// Insert IUT 1 in Year 1 (3-4Q), IUT 2 in Year 2 (1-2Q), IUT 3 in Year 2 (3-4Q) in 現代数理科学・理論探究
const targetMathModel = "'現代数理科学・理論探究': [";
if (!code.includes("宇宙際タイヒミューラー理論 1")) {
  code = code.replace(
    "buildEntry('数学的思考とは何か', 1, '4Q', '【追加】数理構造発展前提'),",
    "buildEntry('数学的思考とは何か', 1, '4Q', '【追加】数理構造発展前提'),\n    buildEntry('Inter-universal Teichmüller Theory 1（宇宙際タイヒミューラー理論 1）', 1, '3-4Q', '先端数理(IUT1)'),"
  );
  code = code.replace(
    "buildEntry('機械翻訳実践（情報）', 2, '1-2Q', '多言語要件'),",
    "buildEntry('機械翻訳実践（情報）', 2, '1-2Q', '多言語要件'),\n    buildEntry('Inter-universal Teichmüller Theory 2（宇宙際タイヒミューラー理論 2）', 2, '1-2Q', '先端数理(IUT1修得後)'),"
  );
  code = code.replace(
    "buildEntry('数理科学発展演習Ⅰ', 2, '3-4Q', '考究科目(基礎数理完結後)'),",
    "buildEntry('数理科学発展演習Ⅰ', 2, '3-4Q', '考究科目(基礎数理完結後)'),\n    buildEntry('Inter-universal Teichmüller Theory 3（宇宙際タイヒミューラー理論 3）', 2, '3-4Q', '先端数理(IUT1,2修得後)'),"
  );
  fs.writeFileSync('./build_perfect_presets.js', code);
  console.log('Successfully added IUT series to Math model in build_perfect_presets.js!');
} else {
  console.log('IUT series already present');
}
