const fs = require('fs');

let code = fs.readFileSync('./build_perfect_presets.js', 'utf8');

// Check if project jissen already added
if (!code.includes("buildEntry('プロジェクト実践'")) {
  // Insert buildEntry('プロジェクト実践', 4, '1-2Q', '卒業プロジェクト(4単位)') before each model's ending '  ],'
  code = code.replace(
    /(\n\s*buildEntry\('導入科目選択B'[^]*?\n)(\s*\])/g,
    "$1    buildEntry('プロジェクト実践', 4, '1-2Q', '卒業プロジェクト(4単位)'),\n$2"
  );
  fs.writeFileSync('./build_perfect_presets.js', code);
  console.log('Added プロジェクト実践 to build_perfect_presets.js!');
} else {
  console.log('プロジェクト実践 already present in build_perfect_presets.js');
}
