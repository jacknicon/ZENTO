const fs = require('fs');

const syllabusData = JSON.parse(fs.readFileSync('./src/data/syllabus_data.json', 'utf8'));
const syllabusMap = new Map();
syllabusData.forEach((c) => syllabusMap.set(c.科目名, c));

const content = fs.readFileSync('./src/data/presetModels.ts', 'utf8');
const match = content.match(/export const PRESET_MODELS: PresetModel\[\] = ([\s\S]+?);$/m);
const presetModels = JSON.parse(match[1]);

console.log('=== Simulating Model Applications ===');

presetModels.forEach((m) => {
  const planItems = [];
  m.courses.forEach((c, idx) => {
    const qList =
      c.quarterStr === '1-2Q'
        ? ['1Q', '2Q']
        : c.quarterStr === '3-4Q'
        ? ['3Q', '4Q']
        : c.quarterStr === '1-4Q' || c.quarterStr === '通年'
        ? ['1Q', '2Q', '3Q', '4Q']
        : [c.quarterStr];

    qList.forEach((q) => {
      planItems.push({
        id: `${c.subjectName}-${c.year}-${q}-${idx}`,
        subjectName: c.subjectName,
        year: c.year,
        quarter: q,
      });
    });
  });

  console.log(`📌 【${m.name}】: Total Courses=${m.totalCoursesCount}, Total Credits=${m.totalCredits}, Generated Slots=${planItems.length}`);
});
console.log('\nSimulation completed cleanly with NO errors!');
