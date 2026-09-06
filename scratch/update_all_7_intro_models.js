const fs = require('fs');

let code = fs.readFileSync('./build_perfect_presets.js', 'utf8');

// The 7 standard intro courses entries
const intro7Defs = {
  'アカデミックリテラシー': "buildEntry('アカデミックリテラシー', 1, '1Q', '必修')",
  'ITリテラシー': "buildEntry('ITリテラシー', 1, '1Q', '必修')",
  '人文社会入門': "buildEntry('人文社会入門', 1, '1Q', '導入要件')",
  '人工知能活用実践': "buildEntry('人工知能活用実践', 1, '1-2Q', '導入要件(多言語前提)')",
  'デジタルツールの使い方': "buildEntry('デジタルツールの使い方', 1, '2Q', '必修')",
  '経済入門': "buildEntry('経済入門', 1, '2Q', '導入要件')",
  '現代社会と数学': "buildEntry('現代社会と数学', 1, '3Q', '導入要件')",
};

// Remove any existing 現代社会と数学 or 人工知能活用実践 in year 2
code = code.replace(/,\s*buildEntry\('現代社会と数学', 2, '[^']+', '[^']+'\)/g, '');
code = code.replace(/,\s*buildEntry\('人工知能活用実践', 2, '[^']+', '[^']+'\)/g, '');

// Process each model array in rawModelsData
const modelRegex = /'([^']+)':\s*\[([\s\S]*?)\]/g;
let match;
let newCode = code;

// For each model, ensure all 7 intro subjects are present in the list
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
  const m = trimmed.match(/基礎科目（[^：:]+[：:](.+)）/);
  if (m && syllabusMap.has(m[1])) return m[1];
  return trimmed;
}

// Let's rewrite each model's list of courses in rawModelsData
const modelsObjMatches = [...code.matchAll(/'([^']+)':\s*\[([\s\S]*?)\]/g)];

modelsObjMatches.forEach(([fullStr, modelName, body]) => {
  if (!modelName || modelName.includes('export')) return;

  // Extract entries
  const entryLines = body.split('\n').map(l => l.trim()).filter(l => l.startsWith('buildEntry('));
  const existingNames = new Set();
  
  entryLines.forEach(line => {
    const rawMatch = line.match(/buildEntry\('([^']+)'/);
    if (rawMatch) {
      const clean = getCleanSubjectName(rawMatch[1]);
      existingNames.add(clean);
    }
  });

  const missingIntro = Object.keys(intro7Defs).filter(name => !existingNames.has(name));

  if (missingIntro.length > 0) {
    console.log(`Adding to [${modelName}]:`, missingIntro.join(', '));
    // Build new entry lines for missing intro courses
    const newEntries = missingIntro.map(name => '    ' + intro7Defs[name] + ',');
    // Insert after 人文社会入門 or at the start of array
    const targetPattern = "buildEntry('人文社会入門', 1, '1Q', '導入要件'),";
    if (body.includes(targetPattern)) {
      const updatedBody = body.replace(
        targetPattern,
        targetPattern + '\n' + newEntries.join('\n')
      );
      code = code.replace(body, updatedBody);
    } else {
      // Insert at beginning of array body
      code = code.replace(body, '\n' + newEntries.join('\n') + body);
    }
  }
});

fs.writeFileSync('./build_perfect_presets.js', code);
console.log('Successfully updated build_perfect_presets.js with ALL 7 intro courses across all models!');
