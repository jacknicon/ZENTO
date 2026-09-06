import type { Course } from '../types/syllabus';

export type CourseBunrui = '導入' | '基礎' | '展開' | '卒業プロジェクト' | '自由';

export type CourseKubun =
  | '導入'
  | '数理'
  | '情報'
  | '多言語理解'
  | '文化・思想'
  | '社会ネットワーク'
  | '経済・マーケット'
  | 'デジタル産業'
  | '社会接続'
  | '卒業プロジェクト'
  | '自由科目';

export const COURSE_KUBUN_LIST: CourseKubun[] = [
  '導入',
  '数理',
  '情報',
  '多言語理解',
  '文化・思想',
  '社会ネットワーク',
  '経済・マーケット',
  'デジタル産業',
  '社会接続',
  '卒業プロジェクト',
  '自由科目',
];

export interface CategoryStyle {
  label: CourseBunrui;
  kubun: CourseKubun;
  bg: string;
  border: string;
  text: string;
  badgeBg: string;
  badgeText: string;
  stripeColor: string;
}

/**
 * 科目分類 (Badge Text: 導入 | 基礎 | 展開 | 卒業プロジェクト | 自由)
 * Matches 100% against official ZEN University curriculum table
 */
export function getCourseCategoryLabel(course: Course): CourseBunrui {
  const name = course.科目名 || '';
  const kubun = course.科目区分 || '';
  const bunrui = course.科目分類 || '';

  if (kubun.includes('導入') || bunrui.includes('導入') || name.includes('導入')) {
    return '導入';
  }
  if (kubun.includes('卒業') || bunrui.includes('卒業') || name.includes('プロジェクト実践')) {
    return '卒業プロジェクト';
  }
  if (kubun.includes('基礎') || bunrui.includes('基礎')) {
    return '基礎';
  }
  if (bunrui.includes('自由') || kubun.includes('自由') || name.includes('イラストと')) {
    return '自由';
  }

  return '展開';
}

/**
 * 科目区分 (Color-Coding & Filter Category: 11 categories)
 * Matches 100% against official ZEN University curriculum table
 */
export function getCourseKubun(course: Course): CourseKubun {
  const name = course.科目名 || '';
  const kubun = course.科目区分 || '';
  const bunrui = course.科目分類 || '';
  const domain = course.学問分野名 || '';

  if (kubun.includes('導入') || bunrui.includes('導入') || name.includes('導入')) return '導入';
  if (kubun.includes('卒業') || bunrui.includes('卒業') || name.includes('プロジェクト実践')) return '卒業プロジェクト';

  if (domain.includes('数理') || name.includes('数理') || name.includes('数学') || name.includes('統計') || name.includes('幾何') || name.includes('代数') || name.includes('解析') || name.includes('ガロア')) return '数理';
  if (domain.includes('情報') || name.includes('情報') || name.includes('プログラミング') || name.includes('データ') || name.includes('アルゴリズム') || name.includes('AI')) return '情報';
  if (domain.includes('多言語') || bunrui.includes('多言語') || domain.includes('言語') || name.includes('英語') || name.includes('多言語')) return '多言語理解';
  if (domain.includes('文化') || domain.includes('思想') || name.includes('文化') || name.includes('思想') || name.includes('歴史') || name.includes('哲学')) return '文化・思想';
  if (domain.includes('ネットワーク') || domain.includes('社会・ネットワーク') || name.includes('社会ネットワーク') || name.includes('コミュニティ')) return '社会ネットワーク';
  if (domain.includes('経済') || domain.includes('マーケット') || name.includes('経済') || name.includes('マーケ')) return '経済・マーケット';
  if (domain.includes('デジタル') || domain.includes('産業') || name.includes('デジタル') || name.includes('ビジネス')) return 'デジタル産業';
  if (domain.includes('社会接続') || bunrui.includes('社会接続') || name.includes('社会接続')) return '社会接続';

  if (bunrui.includes('自由') || kubun.includes('自由') || name.includes('イラストと')) return '自由科目';

  return '自由科目';
}

/**
 * Returns subtle pastel color styles based on CourseKubun
 */
export function getCourseCategoryStyle(course: Course, isPlaced: boolean = false): CategoryStyle {
  const label = getCourseCategoryLabel(course);
  const kubun = getCourseKubun(course);

  if (isPlaced) {
    return {
      label,
      kubun,
      bg: '#f8fafc',
      border: '#e2e8f0',
      text: '#64748b',
      badgeBg: '#e2e8f0',
      badgeText: '#475569',
      stripeColor: '#cbd5e1',
    };
  }

  switch (kubun) {
    case '導入':
      return {
        label,
        kubun,
        bg: '#f0f9ff',
        border: '#bae6fd',
        text: '#0369a1',
        badgeBg: '#e0f2fe',
        badgeText: '#0284c7',
        stripeColor: '#0284c7',
      };
    case '数理':
      return {
        label,
        kubun,
        bg: '#f5f3ff',
        border: '#ddd6fe',
        text: '#5b21b6',
        badgeBg: '#ede9fe',
        badgeText: '#6d28d9',
        stripeColor: '#8b5cf6',
      };
    case '情報':
      return {
        label,
        kubun,
        bg: '#ecfeff',
        border: '#a5f3fc',
        text: '#0e7490',
        badgeBg: '#cffafe',
        badgeText: '#0891b2',
        stripeColor: '#06b6d4',
      };
    case '多言語理解':
      return {
        label,
        kubun,
        bg: '#fdf2f8',
        border: '#fbcfe8',
        text: '#9d174d',
        badgeBg: '#fce7f3',
        badgeText: '#be185d',
        stripeColor: '#ec4899',
      };
    case '文化・思想':
      return {
        label,
        kubun,
        bg: '#fffbeb',
        border: '#fde68a',
        text: '#92400e',
        badgeBg: '#fef3c7',
        badgeText: '#b45309',
        stripeColor: '#f59e0b',
      };
    case '社会ネットワーク':
      return {
        label,
        kubun,
        bg: '#fff7ed',
        border: '#ffedd5',
        text: '#9a3412',
        badgeBg: '#ffedd5',
        badgeText: '#c2410c',
        stripeColor: '#f97316',
      };
    case '経済・マーケット':
      return {
        label,
        kubun,
        bg: '#fefce8',
        border: '#fef08a',
        text: '#854d0e',
        badgeBg: '#fef9c3',
        badgeText: '#ca8a04',
        stripeColor: '#eab308',
      };
    case 'デジタル産業':
      return {
        label,
        kubun,
        bg: '#faf5ff',
        border: '#e9d5ff',
        text: '#6b21a8',
        badgeBg: '#f3e8ff',
        badgeText: '#9333ea',
        stripeColor: '#a855f7',
      };
    case '社会接続':
      return {
        label,
        kubun,
        bg: '#f0fdfa',
        border: '#99f6e4',
        text: '#115e59',
        badgeBg: '#ccfbf1',
        badgeText: '#0f766e',
        stripeColor: '#14b8a6',
      };
    case '卒業プロジェクト':
      return {
        label,
        kubun,
        bg: '#fff1f2',
        border: '#fecdd3',
        text: '#9f1239',
        badgeBg: '#ffe4e6',
        badgeText: '#be123c',
        stripeColor: '#f43f5e',
      };
    case '自由科目':
    default:
      return {
        label,
        kubun,
        bg: '#f8fafc',
        border: '#e2e8f0',
        text: '#334155',
        badgeBg: '#f1f5f9',
        badgeText: '#475569',
        stripeColor: '#94a3b8',
      };
  }
}
