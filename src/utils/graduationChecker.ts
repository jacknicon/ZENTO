import type { Course, PlanItem, GraduationSummary, CategoryProgress } from '../types/syllabus';

export function calculateGraduationRequirements(
  plan: PlanItem[],
  coursesMap: Map<string, Course>
): GraduationSummary {
  const plannedCourses: Course[] = [];
  const plannedNames = new Set<string>();

  const isFailed = (g?: string) => g && ['F', 'G', 'Fd', 'W'].includes(g);

  for (const item of plan) {
    if (isFailed(item.grade)) continue; // Failed courses do not earn credits
    const course = coursesMap.get(item.subjectName);
    if (course && !plannedNames.has(course.科目名)) {
      plannedCourses.push(course);
      plannedNames.add(course.科目名);
    }
  }

  // 社会接続科目 (上限: 10単位。10単位超過分は卒業単位・総取得単位数として認められません)
  const socialConnCreditsRaw = plannedCourses
    .filter((c) => c.科目分類 === '社会接続科目' || c.学問分野名?.includes('社会接続'))
    .reduce((sum, c) => sum + c.単位数, 0);
  const socialConnCredits = Math.min(10, socialConnCreditsRaw);
  const socialConnExcess = Math.max(0, socialConnCreditsRaw - 10);

  // 1. Total credits (社会接続科目の10単位超過分は卒業単位に反映不可)
  const totalCreditsRaw = plannedCourses.reduce((sum, c) => sum + (c.単位数 || 0), 0);
  const totalCredits = totalCreditsRaw - socialConnExcess;
  const requiredTotal = 124;

  // 2. 導入科目 (必要: 14単位)
  const introCourses = plannedCourses.filter(
    (c) => c.科目分類 === '導入科目' || c.科目区分 === '導入科目' || (c.学問分野名 && c.学問分野名.includes('導入'))
  );
  const introCredits = introCourses.reduce((sum, c) => sum + c.単位数, 0);

  // 3. 基礎科目 (必要: 12単位)
  const baseCourses = plannedCourses.filter(
    (c) => c.科目区分 === '基礎科目' || c.科目分類 === '基盤科目'
  );
  const baseTotalCredits = baseCourses.reduce((sum, c) => sum + c.単位数, 0);

  const getFieldCredits = (fields: string[]) =>
    plannedCourses
      .filter((c) => fields.some((f) => c.学問分野名?.includes(f) || c.科目分類?.includes(f)))
      .reduce((sum, c) => sum + c.単位数, 0);

  const mathBaseCredits = getFieldCredits(['数理']);
  const infoBaseCredits = getFieldCredits(['情報']);
  const cultureBaseCredits = getFieldCredits(['文化', '思想']);
  const socialBaseCredits = getFieldCredits(['社会', 'ネットワーク', 'NW']);
  const ecoBaseCredits = getFieldCredits(['経済', 'マーケット']);
  const langCommPlaced = plannedNames.has('多言語ITコミュニケーション');

  // 4. 展開科目 (必要: 74単位、社会接続科目の上限10単位超過分を除外)
  const expandCourses = plannedCourses.filter(
    (c) => c.科目区分?.includes('展開') || c.科目区分?.includes('考究') || c.科目分類 === '社会接続科目' || c.学問分野名?.includes('社会接続')
  );
  const expandTotalCreditsRaw = expandCourses.reduce((sum, c) => sum + c.単位数, 0);
  const expandTotalCredits = expandTotalCreditsRaw - socialConnExcess;

  const baseLiteracyCredits = plannedCourses
    .filter((c) => ['情報', '数理'].some((f) => c.学問分野名?.includes(f) || c.科目分類?.includes(f)))
    .reduce((sum, c) => sum + c.単位数, 0);

  const langCredits = plannedCourses
    .filter((c) => c.学問分野名?.includes('言語') || c.科目分類?.includes('多言語') || c.科目名.includes('多言語'))
    .reduce((sum, c) => sum + c.単位数, 0);

  const globalCredits = plannedCourses
    .filter((c) =>
      ['文化', '思想', '社会', 'ネットワーク', '経済', 'マーケット', 'デジタル産業'].some(
        (f) => c.学問分野名?.includes(f) || c.科目分類?.includes(f)
      )
    )
    .reduce((sum, c) => sum + c.単位数, 0);

  const digiReqNames = ['IT産業史', 'マンガ産業史', 'アニメ産業史', '日本のゲーム産業史'];
  const digiReqCredits = plannedCourses
    .filter((c) => digiReqNames.includes(c.科目名))
    .reduce((sum, c) => sum + c.単位数, 0);

  // 5. 卒業プロジェクト科目 (必要: 4単位)
  const projectPlaced = plannedNames.has('プロジェクト実践');
  const projectCredits = plannedCourses
    .filter((c) => c.科目分類 === '卒業プロジェクト' || c.科目名 === 'プロジェクト実践')
    .reduce((sum, c) => sum + c.単位数, 0);

  const getItemPerQuarterCredits = (item: PlanItem): number => {
    const course = coursesMap.get(item.subjectName);
    const total = course?.単位数 ?? 2;
    const numSlots = plan.filter((p) => p.subjectName === item.subjectName).length || 1;
    return total / numSlots;
  };

  const year1To3Credits = plan
    .filter((item) => item.year <= 3 && !isFailed(item.grade))
    .reduce((sum, item) => sum + getItemPerQuarterCredits(item), 0);

  const advancementSatisfied = year1To3Credits >= 90;

  const unsatisfiedItems: string[] = [];

  if (totalCredits < 124) {
    unsatisfiedItems.push(`総単位数が不足しています (${totalCredits}/124単位)`);
  }
  if (!advancementSatisfied) {
    unsatisfiedItems.push(`進級要件(3年次修了時90単位)が不足しています (${year1To3Credits}/90単位)`);
  }
  if (introCredits < 14) {
    unsatisfiedItems.push(`導入科目が不足しています (${introCredits}/14単位)`);
  }
  if (baseTotalCredits < 12) {
    unsatisfiedItems.push(`基礎科目が不足しています (${baseTotalCredits}/12単位)`);
  }
  if (mathBaseCredits < 2) unsatisfiedItems.push('基礎科目「演習・数理」分野が不足しています (0/2単位)');
  if (infoBaseCredits < 2) unsatisfiedItems.push('基礎科目「情報リテラシー」分野が不足しています (0/2単位)');
  if (cultureBaseCredits < 2) unsatisfiedItems.push('基礎科目「思考・判断(文化・思想)」分野が不足しています (0/2単位)');
  if (socialBaseCredits < 2) unsatisfiedItems.push('基礎科目「社会・NW」分野が不足しています (0/2単位)');
  if (ecoBaseCredits < 2) unsatisfiedItems.push('基礎科目「経済・マーケット」分野が不足しています (0/2単位)');
  if (!langCommPlaced) unsatisfiedItems.push('基礎必修「多言語ITコミュニケーション」が未配置です');

  if (expandTotalCredits < 74) {
    unsatisfiedItems.push(`展開科目が不足しています (${expandTotalCredits}/74単位)`);
  }
  if (baseLiteracyCredits < 8) {
    unsatisfiedItems.push(`基盤リテラシー(情報/数理)が不足しています (${baseLiteracyCredits}/8単位)`);
  }
  if (langCredits < 8) {
    unsatisfiedItems.push(`多言語情報理解(言語)が不足しています (${langCredits}/8単位)`);
  }
  if (globalCredits < 26) {
    unsatisfiedItems.push(`世界理解分野が不足しています (${globalCredits}/26単位)`);
  }
  if (digiReqCredits < 2) {
    unsatisfiedItems.push('デジタル産業指定4科目から最低1科目の配置が必要です');
  }
  if (socialConnExcess > 0) {
    unsatisfiedItems.push(`社会接続科目が上限10単位を超過しています (履修計${socialConnCreditsRaw}単位中、超過${socialConnExcess}単位は卒業単位に反映されません)`);
  }
  if (projectCredits < 4 || !projectPlaced) {
    unsatisfiedItems.push('卒業プロジェクト必修「プロジェクト実践」(4単位)が未配置です');
  }

  const categories: CategoryProgress[] = [
    {
      name: '導入科目',
      current: introCredits,
      required: 14,
      isSatisfied: introCredits >= 14,
    },
    {
      name: '基礎科目',
      current: baseTotalCredits,
      required: 12,
      isSatisfied: baseTotalCredits >= 12 && mathBaseCredits >= 2 && infoBaseCredits >= 2 && cultureBaseCredits >= 2 && socialBaseCredits >= 2 && ecoBaseCredits >= 2 && langCommPlaced,
      subCategories: [
        { name: '演習・数理', current: Math.min(2, mathBaseCredits), required: 2, isSatisfied: mathBaseCredits >= 2 },
        { name: '情報リテラシー', current: Math.min(2, infoBaseCredits), required: 2, isSatisfied: infoBaseCredits >= 2 },
        { name: '思考・判断 (文化・思想)', current: Math.min(2, cultureBaseCredits), required: 2, isSatisfied: cultureBaseCredits >= 2 },
        { name: '社会・ネットワーク', current: Math.min(2, socialBaseCredits), required: 2, isSatisfied: socialBaseCredits >= 2 },
        { name: '経済・マーケット', current: Math.min(2, ecoBaseCredits), required: 2, isSatisfied: ecoBaseCredits >= 2 },
        { name: '多言語ITコミュニケーション', current: langCommPlaced ? 2 : 0, required: 2, isSatisfied: langCommPlaced },
      ],
    },
    {
      name: '展開科目',
      current: expandTotalCredits,
      required: 74,
      isSatisfied: expandTotalCredits >= 74 && baseLiteracyCredits >= 8 && langCredits >= 8 && globalCredits >= 26 && digiReqCredits >= 2,
      subCategories: [
        { name: '基盤リテラシー科目 (基礎合算)', current: Math.min(8, baseLiteracyCredits), required: 8, isSatisfied: baseLiteracyCredits >= 8 },
        { name: '多言語情報理解科目 (基礎合算)', current: Math.min(8, langCredits), required: 8, isSatisfied: langCredits >= 8 },
        { name: '世界理解科目 (基礎合算)', current: Math.min(26, globalCredits), required: 26, isSatisfied: globalCredits >= 26 },
        { name: 'デジタル産業指定4科目', current: Math.min(2, digiReqCredits), required: 2, isSatisfied: digiReqCredits >= 2 },
        { name: '社会接続科目 (上限10単位)', current: socialConnCredits, required: 10, isSatisfied: true },
      ],
    },
    {
      name: '卒業プロジェクト科目',
      current: projectCredits,
      required: 4,
      isSatisfied: projectCredits >= 4 && projectPlaced,
      missingNotes: !projectPlaced ? ['「プロジェクト実践」の履修が必要です'] : [],
    },
  ];

  return {
    totalCredits,
    year1To3Credits,
    requiredTotal,
    isTotalSatisfied: totalCredits >= 124,
    advancementSatisfied,
    unsatisfiedCount: unsatisfiedItems.length,
    unsatisfiedItems,
    categories,
  };
}
