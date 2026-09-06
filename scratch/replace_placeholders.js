const fs = require('fs');

let code = fs.readFileSync('./build_perfect_presets.js', 'utf8');

// Update buildEntry function so subjectRaw is cleanName
code = code.replace(
  `  return {\n    subjectRaw: rawName,`,
  `  return {\n    subjectRaw: cleanName,`
);

// Replace 導入科目選択A with 人工知能活用実践 in Year 1, 1-2Q (satisfies prerequisite for 多言語ITコミュニケーション in 3Q)
code = code.replace(/buildEntry\('導入科目選択A', 1, '[^']+', '[^']+'\)/g, "buildEntry('人工知能活用実践', 1, '1-2Q', '【置換】導入選択(AI活用実践)')");

// Replace 導入科目選択B with 現代社会と数学 in Year 2, 3-4Q
code = code.replace(/buildEntry\('導入科目選択B', 2, '[^']+', '[^']+'\)/g, "buildEntry('現代社会と数学', 2, '3-4Q', '【置換】導入選択(社会と数学)')");

fs.writeFileSync('./build_perfect_presets.js', code);
console.log('Successfully updated replace_placeholders.js!');
