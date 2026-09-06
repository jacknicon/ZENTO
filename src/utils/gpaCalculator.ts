import type { Course, Grade, GpaResult, GpaSummary, PlanItem, Quarter, Year } from '../types/syllabus';
import { normalizeName } from './prerequisiteChecker';

export const PIXIV_SUBJECTS = new Set([
  'デジタル画像技法論Ⅰ - デジタルイラストツール基礎',
  'デジタル画像技法論Ⅱ - クロッキーとスケッチ',
  'デジタル画像技法論Ⅲ - マンガ概論',
  'デジタル画像創作論Ⅰ - メディアデザイン概論',
  'デジタル画像創作論Ⅱ - キャラクターデザイン',
  'デジタル画像創作論Ⅲ - イラスト制作基礎 人物画',
  'デジタル画像活用Ⅰ - イラスト制作基礎 写真模写',
  'デジタル画像活用Ⅱ - イラストディレクション講座',
  'イラストとエンタテインメントA - イラスト制作基礎 模写制作',
  'イラストとエンタテインメントB - イラスト制作基礎 構図/構成',
  'イラストとエンタテインメントC - 色彩表現概論',
  'イラストとエンタテインメントD - キービジュアル',
  'イラストとデザインA - イラスト解剖学',
  'イラストとデザインB - 陰影から学ぶライティング講座',
  'イラストとデザインC - 業界別ポートフォリオ基礎',
  'イラストとデザインD - デッサン',
  'イラストとその活用A - イラストコンセプト特論',
  'イラストとその活用B - 業界研究',
  'イラストとその活用C - 背景イラスト概論',
  'イラストとその活用D - アニメーション概論',
]);

/**
 * Check if a course is evaluated by Pass/Fail (P/Fd) by default
 */
export function isPassFailSubject(subjectName: string): boolean {
  const norm = normalizeName(subjectName);
  if (norm.includes('アカデミックリテラシー')) return true;
  if (norm.includes('プロジェクト実践')) return true;
  return PIXIV_SUBJECTS.has(subjectName);
}

/**
 * Return Grade Point (GP) for a given grade
 * Returns null if grade is excluded from GPA calculation (-, P, Fd, 認定, W)
 */
export function getGradePoint(grade?: Grade): number | null {
  if (!grade || grade === '-') return null;
  if (grade === 'A') return 4;
  if (grade === 'B') return 3;
  if (grade === 'C') return 2;
  if (grade === 'D') return 1;
  if (grade === 'F') return 0;
  if (grade === 'G') return 0;
  return null; // 'P', 'Fd', '認定', 'W' -> GPA除外
}

/**
 * Check if a grade is considered a passed (credit earned) grade
 */
export function isPassedGrade(grade?: Grade): boolean {
  if (!grade || grade === '-') return false;
  return ['A', 'B', 'C', 'D', 'P', '認定'].includes(grade);
}

/**
 * Check if a grade is considered a failed grade
 */
export function isFailedGrade(grade?: Grade): boolean {
  if (!grade || grade === '-') return false;
  return ['F', 'G', 'Fd', 'W'].includes(grade);
}

/**
 * Filter out superseded failed/D attempts for re-taken courses according to ZEN University rules
 */
export function filterGpaItemsForRetakes(
  plan: PlanItem[]
): PlanItem[] {
  // Group by normalized subject name
  const grouped = new Map<string, PlanItem[]>();
  plan.forEach((item) => {
    const norm = normalizeName(item.subjectName);
    if (!grouped.has(norm)) grouped.set(norm, []);
    grouped.get(norm)!.push(item);
  });

  const validItems: PlanItem[] = [];

  grouped.forEach((items) => {
    if (items.length <= 1) {
      validItems.push(...items);
      return;
    }

    // Sort attempts by Year (1..4) and Quarter (1Q..4Q)
    const quarterOrder: Record<Quarter, number> = { '1Q': 1, '2Q': 2, '3Q': 3, '4Q': 4 };
    items.sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return quarterOrder[a.quarter] - quarterOrder[b.quarter];
    });

    // Check if there is a later successful attempt (A, B, C, D, P, 認定)
    const hasLaterPass = items.some((item, idx) => {
      if (idx === 0) return false;
      return isPassedGrade(item.grade);
    });

    if (hasLaterPass) {
      // Exclude earlier attempts that were failed (F, G, Fd) or D
      items.forEach((item, idx) => {
        const isEarlyFailedOrD = idx < items.length - 1 && (item.grade === 'D' || isFailedGrade(item.grade));
        if (!isEarlyFailedOrD) {
          validItems.push(item);
        }
      });
    } else {
      validItems.push(...items);
    }
  });

  return validItems;
}

/**
 * Calculate GPA for a given array of plan items
 */
export function calculateGpaForItems(
  items: PlanItem[],
  coursesMap: Map<string, Course>
): GpaResult {
  let totalGp = 0;
  let evaluatedCredits = 0;

  // Filter out re-taken superseded attempts
  const activeItems = filterGpaItemsForRetakes(items);

  activeItems.forEach((item) => {
    const course = coursesMap.get(item.subjectName);
    const category = course?.科目分類 || course?.科目区分 || '';

    // Exclude Free Electives (自由科目)
    if (category.includes('自由')) return;

    const gp = getGradePoint(item.grade);
    if (gp !== null) {
      // Determine credit weight for multi-quarter linked subjects
      const slotsCount = items.filter(
        (i) => normalizeName(i.subjectName) === normalizeName(item.subjectName)
      ).length;
      const credits = (course?.単位数 ?? 2) / (slotsCount || 1);

      totalGp += gp * credits;
      evaluatedCredits += credits;
    }
  });

  if (evaluatedCredits === 0) {
    return { gpa: 0, totalGp: 0, evaluatedCredits: 0, hasGrades: false };
  }

  const rawGpa = totalGp / evaluatedCredits;
  // Round to 2 decimal places (四捨五入)
  const roundedGpa = Math.round(rawGpa * 100) / 100;

  return {
    gpa: roundedGpa,
    totalGp: Math.round(totalGp * 100) / 100,
    evaluatedCredits: Math.round(evaluatedCredits * 10) / 10,
    hasGrades: true,
  };
}

/**
 * Calculate complete GPA summary (Cumulative, Annual, Quarterly)
 */
export function calculateGpaSummary(
  plan: PlanItem[],
  coursesMap: Map<string, Course>
): GpaSummary {
  const cumulative = calculateGpaForItems(plan, coursesMap);

  const years: Year[] = [1, 2, 3, 4];
  const annual: Record<Year, GpaResult> = {
    1: calculateGpaForItems(plan.filter((p) => p.year === 1), coursesMap),
    2: calculateGpaForItems(plan.filter((p) => p.year === 2), coursesMap),
    3: calculateGpaForItems(plan.filter((p) => p.year === 3), coursesMap),
    4: calculateGpaForItems(plan.filter((p) => p.year === 4), coursesMap),
  };

  const quarters: Quarter[] = ['1Q', '2Q', '3Q', '4Q'];
  const quarterly: Record<string, GpaResult> = {};

  years.forEach((y) => {
    quarters.forEach((q) => {
      const key = `${y}-${q}`;
      quarterly[key] = calculateGpaForItems(
        plan.filter((p) => p.year === y && p.quarter === q),
        coursesMap
      );
    });
  });

  // Calculate credit breakdowns: Passed, Failed, Planned
  let passedCredits = 0;
  let failedCredits = 0;
  let plannedCredits = 0;

  // Process unique subjects to prevent double counting 2-Q linked subjects
  const subjectGroup = new Map<string, { course: Course | undefined; grade?: Grade }>();
  plan.forEach((item) => {
    const norm = normalizeName(item.subjectName);
    if (!subjectGroup.has(norm)) {
      subjectGroup.set(norm, {
        course: coursesMap.get(item.subjectName),
        grade: item.grade,
      });
    }
  });

  subjectGroup.forEach(({ course, grade }) => {
    const credits = course?.単位数 ?? 2;
    if (isPassedGrade(grade)) {
      passedCredits += credits;
    } else if (isFailedGrade(grade)) {
      failedCredits += credits;
    } else {
      plannedCredits += credits;
    }
  });

  return {
    cumulative,
    annual,
    quarterly,
    passedCredits,
    failedCredits,
    plannedCredits,
  };
}
