export type Year = 1 | 2 | 3 | 4;
export type Quarter = '1Q' | '2Q' | '3Q' | '4Q';

export interface Course {
  科目名: string;
  科目ナンバー?: string;
  単位数: number;
  科目分類?: string; // 例: 世界理解科目, 社会接続科目, 基盤科目, 導入科目
  科目区分?: string; // 例: 展開科目, 基礎科目, 導入科目, 卒業プロジェクト
  科目区分名?: string; // 例: 選択(主要), 必修
  科目属性?: string; // 例: 選択, 必修
  前提必須科目?: string[];
  前提推奨科目?: string[];
  後継推奨科目?: string[];
  開講Q?: string; // 例: "1Q、3Q", "1-2Q", "通年", "2Q連続"
  履修想定年次?: string; // 例: "1年次", "2年次"
  学問分野コード?: string;
  学問分野名?: string; // 例: 文化・思想, 経済・マーケット, デジタル産業
  レベル?: number; // 1, 2, 3, 4
  授業の方法?: string;
  評価方法?: string;
  到達目標?: string;
  担当教員?: string[];
  備考?: string;
  シラバスURL?: string;
  科目の概要?: string;
}

export interface ManualEdge {
  source: string;
  target: string;
  meta?: {
    note?: string;
    created?: string;
  };
  directed?: boolean;
}

export type Grade = '-' | 'A' | 'B' | 'C' | 'D' | 'F' | 'G' | 'P' | 'Fd' | '認定' | 'W';

export interface PlanSlot {
  year: Year;
  quarter: Quarter;
}

export interface PlanItem {
  subjectName: string;
  year: Year;
  quarter: Quarter;
  id: string; // unique ID for drag/drop state
  grade?: Grade; // 成績評価 ('-' | 'A' | 'B' | 'C' | 'D' | 'F' | 'G' | 'P' | 'Fd' | '認定' | 'W')
}

export interface GpaResult {
  gpa: number; // 四捨五入後のGPA (例: 3.45)
  totalGp: number; // グレードポイントの合計
  evaluatedCredits: number; // GPA算入単位数の合計
  hasGrades: boolean; // GPA評価対象科目が1つ以上存在するか
}

export interface GpaSummary {
  cumulative: GpaResult;
  annual: Record<Year, GpaResult>;
  quarterly: Record<string, GpaResult>; // key: "1-1Q", "1-2Q", etc.
  passedCredits: number; // 修得確定単位数 (A, B, C, D, P, 認定)
  failedCredits: number; // 不修得単位数 (F, G, Fd, W)
  plannedCredits: number; // 履修予定単位数 (-)
}

export interface CategoryProgress {
  name: string;
  current: number;
  required: number;
  isSatisfied: boolean;
  subCategories?: CategoryProgress[];
  missingNotes?: string[];
}

export interface GraduationSummary {
  totalCredits: number;
  year1To3Credits: number; // 1~3年次累積単位数 (進級要件判定用)
  requiredTotal: number;
  isTotalSatisfied: boolean;
  advancementSatisfied: boolean; // 3->4年次進級要件(3年次修了時に90単位)
  unsatisfiedCount: number;
  unsatisfiedItems: string[];
  categories: CategoryProgress[];
}

export interface PrerequisiteStatus {
  subjectName: string;
  missingPrereqs: string[]; // 未配置の前提科目
  prereqsPlacedLater: string[]; // 配置場所が不正（同Qまたは後Qに配置されている）
  isOk: boolean;
  placedSlot?: PlanSlot;
}

export type EnrollmentTerm = 'spring' | 'fall'; // 春入学(1Q~) / 秋入学(3Q~)
