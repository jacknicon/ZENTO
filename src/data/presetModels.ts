// Auto-generated PERFECT preset models data for ZEN University
export interface PresetCourseEntry {
  subjectRaw: string;
  subjectName: string;
  year: 1 | 2 | 3 | 4;
  quarterStr: string;
  credits: number;
  category: string;
  domain: string;
  notes: string;
}

export interface PresetModel {
  id: string;
  name: string;
  tagline: string;
  iconName: string;
  gradient: string;
  totalCoursesCount: number;
  totalCredits: number;
  courses: PresetCourseEntry[];
}

export const PRESET_MODELS: PresetModel[] = [
  {
    "id": "ds-ai",
    "name": "データサイエンス・AI",
    "tagline": "データ分析・機械学習・ディープラーニングを修得する先端ITコース",
    "iconName": "Brain",
    "gradient": "linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)",
    "totalCoursesCount": 39,
    "totalCredits": 80,
    "courses": [
      {
        "subjectRaw": "アカデミックリテラシー",
        "subjectName": "アカデミックリテラシー",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "必修"
      },
      {
        "subjectRaw": "ITリテラシー",
        "subjectName": "ITリテラシー",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "必修"
      },
      {
        "subjectRaw": "人文社会入門",
        "subjectName": "人文社会入門",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "導入要件"
      },
      {
        "subjectRaw": "人工知能活用実践",
        "subjectName": "人工知能活用実践",
        "year": 1,
        "quarterStr": "1-2Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "導入要件(多言語前提)"
      },
      {
        "subjectRaw": "経済入門",
        "subjectName": "経済入門",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "導入要件"
      },
      {
        "subjectRaw": "データサイエンス概論",
        "subjectName": "データサイエンス概論",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "情報",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "デジタルツールの使い方",
        "subjectName": "デジタルツールの使い方",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "必修"
      },
      {
        "subjectRaw": "多言語ITコミュニケーション",
        "subjectName": "多言語ITコミュニケーション",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "多言語情報理解",
        "notes": "必修(ツール修得後)"
      },
      {
        "subjectRaw": "数学の方法",
        "subjectName": "数学の方法",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "数理",
        "notes": "数理基礎"
      },
      {
        "subjectRaw": "心理学",
        "subjectName": "心理学",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "文化・思想",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "企業経営",
        "subjectName": "企業経営",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "経済・マーケット",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "現代社会と数学",
        "subjectName": "現代社会と数学",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "【置換】導入選択(社会と数学)"
      },
      {
        "subjectRaw": "線形代数1",
        "subjectName": "線形代数1",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "数理",
        "notes": "基盤数理"
      },
      {
        "subjectRaw": "初等代数概論",
        "subjectName": "初等代数概論",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "数理",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "社会学Ⅰ",
        "subjectName": "社会学Ⅰ",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "社会・ネットワーク",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "マンガ産業史",
        "subjectName": "マンガ産業史",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "デジタル産業",
        "notes": "デジタル産業指定要件"
      },
      {
        "subjectRaw": "数学史",
        "subjectName": "数学史",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "数理",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "Pythonプログラミング",
        "subjectName": "Pythonプログラミング",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "情報",
        "notes": "プログラミング基礎"
      },
      {
        "subjectRaw": "解析学1",
        "subjectName": "解析学1",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "数理",
        "notes": "基盤数理"
      },
      {
        "subjectRaw": "統計学入門",
        "subjectName": "統計学入門",
        "year": 2,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "情報",
        "notes": "【追加】データ分析前提(DS概論・解析1修得後)"
      },
      {
        "subjectRaw": "機械学習概論",
        "subjectName": "機械学習概論",
        "year": 2,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "情報",
        "notes": "AI専門"
      },
      {
        "subjectRaw": "線形代数2",
        "subjectName": "線形代数2",
        "year": 2,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "数理",
        "notes": "基盤数理"
      },
      {
        "subjectRaw": "コンピューターサイエンス概論",
        "subjectName": "コンピューターサイエンス概論",
        "year": 2,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "情報",
        "notes": "CS基礎"
      },
      {
        "subjectRaw": "ビッグデータ分析概論",
        "subjectName": "ビッグデータ分析概論",
        "year": 2,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "情報",
        "notes": "データ分析専門"
      },
      {
        "subjectRaw": "解析学2",
        "subjectName": "解析学2",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "数理",
        "notes": "基盤数理"
      },
      {
        "subjectRaw": "ミクロ経済学",
        "subjectName": "ミクロ経済学",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "経済・マーケット",
        "notes": "世界理解"
      },
      {
        "subjectRaw": "意思決定の能力開発",
        "subjectName": "意思決定の能力開発",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "社会・ネットワーク",
        "notes": "世界理解"
      },
      {
        "subjectRaw": "計算機実験で学ぶ確率とモンテカルロ法",
        "subjectName": "計算機実験で学ぶ確率とモンテカルロ法",
        "year": 2,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "情報",
        "notes": "情報演習"
      },
      {
        "subjectRaw": "機械翻訳実践（情報）",
        "subjectName": "機械翻訳実践（情報）",
        "year": 2,
        "quarterStr": "1-2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "多言語情報理解",
        "notes": "多言語要件"
      },
      {
        "subjectRaw": "Inter-universal Teichmüller Theory 2（宇宙際タイヒミューラー理論 2）",
        "subjectName": "Inter-universal Teichmüller Theory 2（宇宙際タイヒミューラー理論 2）",
        "year": 2,
        "quarterStr": "1-2Q",
        "credits": 2,
        "category": "展開科目（考究）",
        "domain": "数理",
        "notes": "先端数理(IUT1修得後)"
      },
      {
        "subjectRaw": "ディープラーニング1",
        "subjectName": "ディープラーニング1",
        "year": 2,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "情報",
        "notes": "AI専門"
      },
      {
        "subjectRaw": "科学哲学",
        "subjectName": "科学哲学",
        "year": 2,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "文化・思想",
        "notes": "世界理解"
      },
      {
        "subjectRaw": "データベース運用実践",
        "subjectName": "データベース運用実践",
        "year": 2,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "情報",
        "notes": "DB専門"
      },
      {
        "subjectRaw": "AIアルゴリズム実践",
        "subjectName": "AIアルゴリズム実践",
        "year": 2,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目（考究）",
        "domain": "情報",
        "notes": "考究科目"
      },
      {
        "subjectRaw": "マーケティング × データサイエンス",
        "subjectName": "マーケティング × データサイエンス",
        "year": 2,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目（考究）",
        "domain": "情報",
        "notes": "考究科目(統計学前提達成)"
      },
      {
        "subjectRaw": "数理科学発展演習Ⅰ",
        "subjectName": "数理科学発展演習Ⅰ",
        "year": 2,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目（考究）",
        "domain": "数理",
        "notes": "考究科目(基礎数理完結後)"
      },
      {
        "subjectRaw": "Inter-universal Teichmüller Theory 3（宇宙際タイヒミューラー理論 3）",
        "subjectName": "Inter-universal Teichmüller Theory 3（宇宙際タイヒミューラー理論 3）",
        "year": 2,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目（考究）",
        "domain": "数理",
        "notes": "先端数理(IUT1,2修得後)"
      },
      {
        "subjectRaw": "機械翻訳実践（自然科学）",
        "subjectName": "機械翻訳実践（自然科学）",
        "year": 2,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "多言語情報理解",
        "notes": "多言語要件"
      },
      {
        "subjectRaw": "プロジェクト実践",
        "subjectName": "プロジェクト実践",
        "year": 4,
        "quarterStr": "1-4Q",
        "credits": 4,
        "category": "展開科目（考究）",
        "domain": "卒業プロジェクト",
        "notes": "卒業プロジェクト(1~4Q通年・4単位)"
      }
    ]
  },
  {
    "id": "web-app",
    "name": "Web・アプリ開発プログラミング",
    "tagline": "フロントエンド・バックエンド・セキュリティまで網羅する実践型エンジニアコース",
    "iconName": "Code",
    "gradient": "linear-gradient(135deg, #10b981 0%, #0d9488 100%)",
    "totalCoursesCount": 40,
    "totalCredits": 82,
    "courses": [
      {
        "subjectRaw": "アカデミックリテラシー",
        "subjectName": "アカデミックリテラシー",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "必修"
      },
      {
        "subjectRaw": "ITリテラシー",
        "subjectName": "ITリテラシー",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "必修"
      },
      {
        "subjectRaw": "Webアプリケーション開発1",
        "subjectName": "Webアプリケーション開発1",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "情報",
        "notes": "Web開発基礎"
      },
      {
        "subjectRaw": "人文社会入門",
        "subjectName": "人文社会入門",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "導入要件"
      },
      {
        "subjectRaw": "人工知能活用実践",
        "subjectName": "人工知能活用実践",
        "year": 1,
        "quarterStr": "1-2Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "導入要件(多言語前提)"
      },
      {
        "subjectRaw": "経済入門",
        "subjectName": "経済入門",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "導入要件"
      },
      {
        "subjectRaw": "デジタルツールの使い方",
        "subjectName": "デジタルツールの使い方",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "必修"
      },
      {
        "subjectRaw": "多言語ITコミュニケーション",
        "subjectName": "多言語ITコミュニケーション",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "多言語情報理解",
        "notes": "必修(ツール修得後)"
      },
      {
        "subjectRaw": "数学の方法",
        "subjectName": "数学の方法",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "数理",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "Webアプリケーション開発2",
        "subjectName": "Webアプリケーション開発2",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "情報",
        "notes": "【追加】フロントエンド実践"
      },
      {
        "subjectRaw": "現代社会と数学",
        "subjectName": "現代社会と数学",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "【置換】導入選択(社会と数学)"
      },
      {
        "subjectRaw": "情報セキュリティ概論",
        "subjectName": "情報セキュリティ概論",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "情報",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "初等代数概論",
        "subjectName": "初等代数概論",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "数理",
        "notes": "暗号数理の準備"
      },
      {
        "subjectRaw": "数学史",
        "subjectName": "数学史",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "数理",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "社会学Ⅰ",
        "subjectName": "社会学Ⅰ",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "社会・ネットワーク",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "IT産業史",
        "subjectName": "IT産業史",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "デジタル産業",
        "notes": "デジタル産業指定要件"
      },
      {
        "subjectRaw": "数学史",
        "subjectName": "数学史",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "数理",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "Webアプリケーション開発3",
        "subjectName": "Webアプリケーション開発3",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "情報",
        "notes": "【追加】バックエンド・API開発"
      },
      {
        "subjectRaw": "数学史",
        "subjectName": "数学史",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "数理",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "Pythonプログラミング",
        "subjectName": "Pythonプログラミング",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "情報",
        "notes": "展開科目"
      },
      {
        "subjectRaw": "哲学概論",
        "subjectName": "哲学概論",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "文化・思想",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "心理学",
        "subjectName": "心理学",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "文化・思想",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "企業経営",
        "subjectName": "企業経営",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "経済・マーケット",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "企業経営",
        "subjectName": "企業経営",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "経済・マーケット",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "二次創作の歴史から見るネット文化",
        "subjectName": "二次創作の歴史から見るネット文化",
        "year": 1,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "デジタル産業",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "インターネット概論",
        "subjectName": "インターネット概論",
        "year": 2,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "情報",
        "notes": "ネットワーク基礎"
      },
      {
        "subjectRaw": "コンピューターサイエンス概論",
        "subjectName": "コンピューターサイエンス概論",
        "year": 2,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "情報",
        "notes": "CS基礎"
      },
      {
        "subjectRaw": "Webアプリケーション開発4",
        "subjectName": "Webアプリケーション開発4",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "情報",
        "notes": "フルスタックWeb構築(Web1~3履修後)"
      },
      {
        "subjectRaw": "Linux概論",
        "subjectName": "Linux概論",
        "year": 2,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "情報",
        "notes": "インフラ基礎(Web4完結後)"
      },
      {
        "subjectRaw": "オブジェクト指向プログラミング",
        "subjectName": "オブジェクト指向プログラミング",
        "year": 2,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "情報",
        "notes": "設計思想(Web4完結後)"
      },
      {
        "subjectRaw": "コンピュータ概論",
        "subjectName": "コンピュータ概論",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "情報",
        "notes": "ハードウェア基礎"
      },
      {
        "subjectRaw": "情報処理概論",
        "subjectName": "情報処理概論",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "情報",
        "notes": "情報理論"
      },
      {
        "subjectRaw": "JavaScriptによる自動化、効率化",
        "subjectName": "JavaScriptによる自動化、効率化",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "情報",
        "notes": "スクリプト実務"
      },
      {
        "subjectRaw": "機械翻訳実践（法学）",
        "subjectName": "機械翻訳実践（法学）",
        "year": 2,
        "quarterStr": "1-2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "多言語情報理解",
        "notes": "多言語要件"
      },
      {
        "subjectRaw": "戦後日本史1",
        "subjectName": "戦後日本史1",
        "year": 2,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "社会・ネットワーク",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "データベース運用実践",
        "subjectName": "データベース運用実践",
        "year": 2,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "情報",
        "notes": "DB実践"
      },
      {
        "subjectRaw": "Javaプログラミング演習",
        "subjectName": "Javaプログラミング演習",
        "year": 2,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目（考究）",
        "domain": "情報",
        "notes": "考究科目"
      },
      {
        "subjectRaw": "Webセキュリティ演習",
        "subjectName": "Webセキュリティ演習",
        "year": 2,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目（考究）",
        "domain": "情報",
        "notes": "考究科目(Web1~4完結後)"
      },
      {
        "subjectRaw": "機械翻訳実践（情報）",
        "subjectName": "機械翻訳実践（情報）",
        "year": 2,
        "quarterStr": "1-2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "多言語情報理解",
        "notes": "多言語要件"
      },
      {
        "subjectRaw": "プロジェクト実践",
        "subjectName": "プロジェクト実践",
        "year": 4,
        "quarterStr": "1-4Q",
        "credits": 4,
        "category": "展開科目（考究）",
        "domain": "卒業プロジェクト",
        "notes": "卒業プロジェクト(1~4Q通年・4単位)"
      }
    ]
  },
  {
    "id": "digital-content",
    "name": "デジタルコンテンツ・デザイン表現",
    "tagline": "画像・3D・アニメ・WEBコミックの表現技法とクリエイティブを学ぶコース",
    "iconName": "Palette",
    "gradient": "linear-gradient(135deg, #d946ef 0%, #ec4899 100%)",
    "totalCoursesCount": 38,
    "totalCredits": 72,
    "courses": [
      {
        "subjectRaw": "アカデミックリテラシー",
        "subjectName": "アカデミックリテラシー",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "必修"
      },
      {
        "subjectRaw": "ITリテラシー",
        "subjectName": "ITリテラシー",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "必修"
      },
      {
        "subjectRaw": "人文社会入門",
        "subjectName": "人文社会入門",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "導入要件"
      },
      {
        "subjectRaw": "人工知能活用実践",
        "subjectName": "人工知能活用実践",
        "year": 1,
        "quarterStr": "1-2Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "導入要件(多言語前提)"
      },
      {
        "subjectRaw": "経済入門",
        "subjectName": "経済入門",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "導入要件"
      },
      {
        "subjectRaw": "デジタル画像技法論Ⅰ",
        "subjectName": "デジタル画像技法論Ⅰ",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 1,
        "category": "展開科目",
        "domain": "社会接続",
        "notes": "pixiv科目"
      },
      {
        "subjectRaw": "デジタルツールの使い方",
        "subjectName": "デジタルツールの使い方",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "必修"
      },
      {
        "subjectRaw": "多言語ITコミュニケーション",
        "subjectName": "多言語ITコミュニケーション",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "多言語情報理解",
        "notes": "必修(ツール修得後)"
      },
      {
        "subjectRaw": "マンガ絵コンテから学ぶ視覚表現",
        "subjectName": "マンガ絵コンテから学ぶ視覚表現",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "文化・思想",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "デジタル画像技法論Ⅲ",
        "subjectName": "デジタル画像技法論Ⅲ",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 1,
        "category": "展開科目",
        "domain": "社会接続",
        "notes": "pixiv科目"
      },
      {
        "subjectRaw": "現代社会と数学",
        "subjectName": "現代社会と数学",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "【置換】導入選択(社会と数学)"
      },
      {
        "subjectRaw": "デジタル画像技法論Ⅱ",
        "subjectName": "デジタル画像技法論Ⅱ",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 1,
        "category": "展開科目",
        "domain": "社会接続",
        "notes": "pixiv科目"
      },
      {
        "subjectRaw": "マンガ産業史",
        "subjectName": "マンガ産業史",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "デジタル産業",
        "notes": "デジタル産業指定要件"
      },
      {
        "subjectRaw": "世界が変わる編集力",
        "subjectName": "世界が変わる編集力",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "文化・思想",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "数学史",
        "subjectName": "数学史",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "数理",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "情報セキュリティ概論",
        "subjectName": "情報セキュリティ概論",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "情報",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "ビジュアルプログラミング",
        "subjectName": "ビジュアルプログラミング",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "情報",
        "notes": "【追加】ジェネラティブアート前提"
      },
      {
        "subjectRaw": "アニメ産業史",
        "subjectName": "アニメ産業史",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "デジタル産業",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "近・現代アート概論",
        "subjectName": "近・現代アート概論",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "文化・思想",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "心理学",
        "subjectName": "心理学",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "文化・思想",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "企業経営",
        "subjectName": "企業経営",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "経済・マーケット",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "二次創作の歴史から見るネット文化",
        "subjectName": "二次創作の歴史から見るネット文化",
        "year": 1,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "デジタル産業",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "コンテンツ産業論",
        "subjectName": "コンテンツ産業論",
        "year": 2,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "デジタル産業",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "デジタル画像創作論Ⅰ",
        "subjectName": "デジタル画像創作論Ⅰ",
        "year": 2,
        "quarterStr": "1Q",
        "credits": 1,
        "category": "展開科目",
        "domain": "社会接続",
        "notes": "pixiv科目"
      },
      {
        "subjectRaw": "社会学Ⅰ",
        "subjectName": "社会学Ⅰ",
        "year": 2,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "社会・ネットワーク",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "デジタル画像創作論Ⅱ",
        "subjectName": "デジタル画像創作論Ⅱ",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 1,
        "category": "展開科目",
        "domain": "社会接続",
        "notes": "pixiv科目"
      },
      {
        "subjectRaw": "デジタル画像創作論Ⅲ",
        "subjectName": "デジタル画像創作論Ⅲ",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 1,
        "category": "展開科目",
        "domain": "社会接続",
        "notes": "pixiv科目"
      },
      {
        "subjectRaw": "ジェネラティブアート演習",
        "subjectName": "ジェネラティブアート演習",
        "year": 2,
        "quarterStr": "1-2Q",
        "credits": 2,
        "category": "展開科目（考究）",
        "domain": "情報",
        "notes": "考究科目(プログラミング前提達成)"
      },
      {
        "subjectRaw": "3Dモデリング技術演習",
        "subjectName": "3Dモデリング技術演習",
        "year": 2,
        "quarterStr": "1-2Q",
        "credits": 2,
        "category": "展開科目（考究）",
        "domain": "情報",
        "notes": "考究科目"
      },
      {
        "subjectRaw": "アニメのクオリティー管理と商品性",
        "subjectName": "アニメのクオリティー管理と商品性",
        "year": 2,
        "quarterStr": "1-2Q",
        "credits": 2,
        "category": "展開科目（考究）",
        "domain": "デジタル産業",
        "notes": "考究科目"
      },
      {
        "subjectRaw": "ネット情報発信概論",
        "subjectName": "ネット情報発信概論",
        "year": 2,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "社会接続",
        "notes": "社会接続科目"
      },
      {
        "subjectRaw": "文化人類学Ⅱ",
        "subjectName": "文化人類学Ⅱ",
        "year": 2,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "文化・思想",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "WEBコミック演習",
        "subjectName": "WEBコミック演習",
        "year": 2,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目（考究）",
        "domain": "文化・思想",
        "notes": "世界理解"
      },
      {
        "subjectRaw": "マンガの企画立案とプロデュース論",
        "subjectName": "マンガの企画立案とプロデュース論",
        "year": 2,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目（考究）",
        "domain": "デジタル産業",
        "notes": "考究科目"
      },
      {
        "subjectRaw": "文化資源のデジタルアーカイブ",
        "subjectName": "文化資源のデジタルアーカイブ",
        "year": 2,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目（考究）",
        "domain": "デジタル産業",
        "notes": "考究科目"
      },
      {
        "subjectRaw": "機械翻訳実践（日本研究）",
        "subjectName": "機械翻訳実践（日本研究）",
        "year": 2,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "多言語情報理解",
        "notes": "多言語要件"
      },
      {
        "subjectRaw": "機械翻訳実践（異文化理解）",
        "subjectName": "機械翻訳実践（異文化理解）",
        "year": 2,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "多言語情報理解",
        "notes": "多言語要件"
      },
      {
        "subjectRaw": "プロジェクト実践",
        "subjectName": "プロジェクト実践",
        "year": 4,
        "quarterStr": "1-4Q",
        "credits": 4,
        "category": "展開科目（考究）",
        "domain": "卒業プロジェクト",
        "notes": "卒業プロジェクト(1~4Q通年・4単位)"
      }
    ]
  },
  {
    "id": "business-marketing",
    "name": "ビジネス・マーケティング・イノベーション",
    "tagline": "経済学・マーケティング・スタートアップ経営を統合したイノベーターコース",
    "iconName": "TrendingUp",
    "gradient": "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)",
    "totalCoursesCount": 36,
    "totalCredits": 74,
    "courses": [
      {
        "subjectRaw": "アカデミックリテラシー",
        "subjectName": "アカデミックリテラシー",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "必修"
      },
      {
        "subjectRaw": "ITリテラシー",
        "subjectName": "ITリテラシー",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "必修"
      },
      {
        "subjectRaw": "人文社会入門",
        "subjectName": "人文社会入門",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "導入要件"
      },
      {
        "subjectRaw": "人工知能活用実践",
        "subjectName": "人工知能活用実践",
        "year": 1,
        "quarterStr": "1-2Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "導入要件(多言語前提)"
      },
      {
        "subjectRaw": "経済入門",
        "subjectName": "経済入門",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "【追加】経済学・経営学前提(2Q開講)"
      },
      {
        "subjectRaw": "デジタルツールの使い方",
        "subjectName": "デジタルツールの使い方",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "必修"
      },
      {
        "subjectRaw": "数学の方法",
        "subjectName": "数学の方法",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "数理",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "キャリアデザインⅠ（自己理解）",
        "subjectName": "キャリアデザインⅠ（自己理解）",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "社会接続",
        "notes": "社会接続科目"
      },
      {
        "subjectRaw": "データサイエンス概論",
        "subjectName": "データサイエンス概論",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "情報",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "現代社会と数学",
        "subjectName": "現代社会と数学",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "【置換】導入選択(社会と数学)"
      },
      {
        "subjectRaw": "多言語ITコミュニケーション",
        "subjectName": "多言語ITコミュニケーション",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "多言語情報理解",
        "notes": "必修(ツール修得後)"
      },
      {
        "subjectRaw": "伝わる論理とコミュニケーション",
        "subjectName": "伝わる論理とコミュニケーション",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "社会・ネットワーク",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "経済言説史",
        "subjectName": "経済言説史",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "経済・マーケット",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "数学史",
        "subjectName": "数学史",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "数理",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "IT産業史",
        "subjectName": "IT産業史",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "デジタル産業",
        "notes": "デジタル産業指定要件"
      },
      {
        "subjectRaw": "統計学入門",
        "subjectName": "統計学入門",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "情報",
        "notes": "【追加】マーケティング分析前提(DS概論修得後)"
      },
      {
        "subjectRaw": "企業経営",
        "subjectName": "企業経営",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "経済・マーケット",
        "notes": "基礎科目要件(経済入門修得後/4Q履修)"
      },
      {
        "subjectRaw": "心理学",
        "subjectName": "心理学",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "文化・思想",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "マルクス経済学",
        "subjectName": "マルクス経済学",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "経済・マーケット",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "企業経営",
        "subjectName": "企業経営",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "経済・マーケット",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "企業経営と会計",
        "subjectName": "企業経営と会計",
        "year": 2,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "経済・マーケット",
        "notes": "世界理解科目(企業経営修得後/1Q履修)"
      },
      {
        "subjectRaw": "ミクロ経済学",
        "subjectName": "ミクロ経済学",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "経済・マーケット",
        "notes": "世界理解"
      },
      {
        "subjectRaw": "マクロ経済学",
        "subjectName": "マクロ経済学",
        "year": 2,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "経済・マーケット",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "コンテンツ産業論",
        "subjectName": "コンテンツ産業論",
        "year": 2,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "デジタル産業",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "キャリアデザインⅡ（仕事理解）",
        "subjectName": "キャリアデザインⅡ（仕事理解）",
        "year": 2,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "社会接続",
        "notes": "社会接続科目"
      },
      {
        "subjectRaw": "デジタル・マーケティング",
        "subjectName": "デジタル・マーケティング",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "経済・マーケット",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "スタートアップ",
        "subjectName": "スタートアップ",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "経済・マーケット",
        "notes": "世界理解科目(企業経営修得後)"
      },
      {
        "subjectRaw": "意思決定の能力開発",
        "subjectName": "意思決定の能力開発",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "社会・ネットワーク",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "交渉・合意形成概論",
        "subjectName": "交渉・合意形成概論",
        "year": 2,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "経済・マーケット",
        "notes": "世界理解科目(意思決定修得後)"
      },
      {
        "subjectRaw": "ネットワーク産業論",
        "subjectName": "ネットワーク産業論",
        "year": 2,
        "quarterStr": "1-2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "社会接続",
        "notes": "社会接続科目"
      },
      {
        "subjectRaw": "機械翻訳実践（法学）",
        "subjectName": "機械翻訳実践（法学）",
        "year": 2,
        "quarterStr": "1-2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "多言語情報理解",
        "notes": "多言語要件"
      },
      {
        "subjectRaw": "戦後日本史1",
        "subjectName": "戦後日本史1",
        "year": 2,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "社会・ネットワーク",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "農業とデジタルテクノロジー",
        "subjectName": "農業とデジタルテクノロジー",
        "year": 2,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "経済・マーケット",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "マーケティング × データサイエンス",
        "subjectName": "マーケティング × データサイエンス",
        "year": 2,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目（考究）",
        "domain": "情報",
        "notes": "考究科目(統計学前提達成)"
      },
      {
        "subjectRaw": "機械翻訳実践（異文化理解）",
        "subjectName": "機械翻訳実践（異文化理解）",
        "year": 2,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "多言語情報理解",
        "notes": "多言語要件"
      },
      {
        "subjectRaw": "プロジェクト実践",
        "subjectName": "プロジェクト実践",
        "year": 4,
        "quarterStr": "1-4Q",
        "credits": 4,
        "category": "展開科目（考究）",
        "domain": "卒業プロジェクト",
        "notes": "卒業プロジェクト(1~4Q通年・4単位)"
      }
    ]
  },
  {
    "id": "humanities-social",
    "name": "人文・社会・現代教養",
    "tagline": "哲学・社会学・人類学を通じ、複雑な現代社会を俯瞰する教養コース",
    "iconName": "BookOpen",
    "gradient": "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
    "totalCoursesCount": 35,
    "totalCredits": 72,
    "courses": [
      {
        "subjectRaw": "アカデミックリテラシー",
        "subjectName": "アカデミックリテラシー",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "必修"
      },
      {
        "subjectRaw": "ITリテラシー",
        "subjectName": "ITリテラシー",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "必修"
      },
      {
        "subjectRaw": "人文社会入門",
        "subjectName": "人文社会入門",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "導入要件"
      },
      {
        "subjectRaw": "人工知能活用実践",
        "subjectName": "人工知能活用実践",
        "year": 1,
        "quarterStr": "1-2Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "導入要件(多言語前提)"
      },
      {
        "subjectRaw": "経済入門",
        "subjectName": "経済入門",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "導入要件"
      },
      {
        "subjectRaw": "文化人類学Ⅰ",
        "subjectName": "文化人類学Ⅰ",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "文化・思想",
        "notes": "【追加】文化人類学Ⅱ前提"
      },
      {
        "subjectRaw": "デジタルツールの使い方",
        "subjectName": "デジタルツールの使い方",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "必修"
      },
      {
        "subjectRaw": "多言語ITコミュニケーション",
        "subjectName": "多言語ITコミュニケーション",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "多言語情報理解",
        "notes": "必修(ツール修得後)"
      },
      {
        "subjectRaw": "哲学概論",
        "subjectName": "哲学概論",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "文化・思想",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "現代社会と数学",
        "subjectName": "現代社会と数学",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "【置換】導入選択(社会と数学)"
      },
      {
        "subjectRaw": "日本文学Ⅰ",
        "subjectName": "日本文学Ⅰ",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "文化・思想",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "社会学Ⅰ",
        "subjectName": "社会学Ⅰ",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "社会・ネットワーク",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "数学史",
        "subjectName": "数学史",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "数理",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "世界が変わる編集力",
        "subjectName": "世界が変わる編集力",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "文化・思想",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "マンガ産業史",
        "subjectName": "マンガ産業史",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "デジタル産業",
        "notes": "デジタル産業指定要件"
      },
      {
        "subjectRaw": "情報セキュリティ概論",
        "subjectName": "情報セキュリティ概論",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "情報",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "公共哲学",
        "subjectName": "公共哲学",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "文化・思想",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "マルクス経済学",
        "subjectName": "マルクス経済学",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "経済・マーケット",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "企業経営",
        "subjectName": "企業経営",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "経済・マーケット",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "政治を超える哲学Ⅰ",
        "subjectName": "政治を超える哲学Ⅰ",
        "year": 1,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目（考究）",
        "domain": "文化・思想",
        "notes": "考究科目"
      },
      {
        "subjectRaw": "生きてゆくための禅",
        "subjectName": "生きてゆくための禅",
        "year": 1,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目（考究）",
        "domain": "文化・思想",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "大学とメディアの人類史",
        "subjectName": "大学とメディアの人類史",
        "year": 2,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "社会・ネットワーク",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "情報社会論",
        "subjectName": "情報社会論",
        "year": 2,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "社会・ネットワーク",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "科学哲学",
        "subjectName": "科学哲学",
        "year": 2,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "文化・思想",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "社会学Ⅱ",
        "subjectName": "社会学Ⅱ",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "社会・ネットワーク",
        "notes": "世界理解"
      },
      {
        "subjectRaw": "日本文学Ⅱ",
        "subjectName": "日本文学Ⅱ",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "文化・思想",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "文化人類学Ⅱ",
        "subjectName": "文化人類学Ⅱ",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "文化・思想",
        "notes": "世界理解(Ⅰ修得後)"
      },
      {
        "subjectRaw": "意思決定の能力開発",
        "subjectName": "意思決定の能力開発",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "社会・ネットワーク",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "政治を超える哲学Ⅱ",
        "subjectName": "政治を超える哲学Ⅱ",
        "year": 2,
        "quarterStr": "1-2Q",
        "credits": 2,
        "category": "展開科目（考究）",
        "domain": "文化・思想",
        "notes": "考究科目"
      },
      {
        "subjectRaw": "ジェンダー論",
        "subjectName": "ジェンダー論",
        "year": 2,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "社会・ネットワーク",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "戦後日本史1",
        "subjectName": "戦後日本史1",
        "year": 2,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "社会・ネットワーク",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "現代資本主義論",
        "subjectName": "現代資本主義論",
        "year": 2,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目（考究）",
        "domain": "経済・マーケット",
        "notes": "考究科目(マルクス経済学修得後/3-4Q演習)"
      },
      {
        "subjectRaw": "機械翻訳実践（日本研究）",
        "subjectName": "機械翻訳実践（日本研究）",
        "year": 2,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "多言語情報理解",
        "notes": "多言語要件"
      },
      {
        "subjectRaw": "機械翻訳実践（異文化理解）",
        "subjectName": "機械翻訳実践（異文化理解）",
        "year": 2,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "多言語情報理解",
        "notes": "多言語要件"
      },
      {
        "subjectRaw": "プロジェクト実践",
        "subjectName": "プロジェクト実践",
        "year": 4,
        "quarterStr": "1-4Q",
        "credits": 4,
        "category": "展開科目（考究）",
        "domain": "卒業プロジェクト",
        "notes": "卒業プロジェクト(1~4Q通年・4単位)"
      }
    ]
  },
  {
    "id": "math-science",
    "name": "現代数理科学・理論探究",
    "tagline": "線形代数・解析学・抽象代数・記号論理の数理的思考を深化させるコース",
    "iconName": "Binary",
    "gradient": "linear-gradient(135deg, #6366f1 0%, #1d4ed8 100%)",
    "totalCoursesCount": 32,
    "totalCredits": 66,
    "courses": [
      {
        "subjectRaw": "アカデミックリテラシー",
        "subjectName": "アカデミックリテラシー",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "必修"
      },
      {
        "subjectRaw": "ITリテラシー",
        "subjectName": "ITリテラシー",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "必修"
      },
      {
        "subjectRaw": "人文社会入門",
        "subjectName": "人文社会入門",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "導入要件"
      },
      {
        "subjectRaw": "人工知能活用実践",
        "subjectName": "人工知能活用実践",
        "year": 1,
        "quarterStr": "1-2Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "導入要件(多言語前提)"
      },
      {
        "subjectRaw": "経済入門",
        "subjectName": "経済入門",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "導入要件"
      },
      {
        "subjectRaw": "デジタルツールの使い方",
        "subjectName": "デジタルツールの使い方",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "必修"
      },
      {
        "subjectRaw": "多言語ITコミュニケーション",
        "subjectName": "多言語ITコミュニケーション",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "多言語情報理解",
        "notes": "必修(ツール修得後)"
      },
      {
        "subjectRaw": "数学の方法",
        "subjectName": "数学の方法",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "数理",
        "notes": "展開科目"
      },
      {
        "subjectRaw": "現代社会と数学",
        "subjectName": "現代社会と数学",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "【置換】導入選択(社会と数学)"
      },
      {
        "subjectRaw": "線形代数1",
        "subjectName": "線形代数1",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "数理",
        "notes": "基盤数理"
      },
      {
        "subjectRaw": "初等代数概論",
        "subjectName": "初等代数概論",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "数理",
        "notes": "展開科目"
      },
      {
        "subjectRaw": "情報セキュリティ概論",
        "subjectName": "情報セキュリティ概論",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "情報",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "マンガ産業史",
        "subjectName": "マンガ産業史",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "デジタル産業",
        "notes": "デジタル産業指定要件"
      },
      {
        "subjectRaw": "解析学1",
        "subjectName": "解析学1",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "数理",
        "notes": "基盤数理"
      },
      {
        "subjectRaw": "数学的思考とは何か",
        "subjectName": "数学的思考とは何か",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "数理",
        "notes": "【追加】数理構造発展前提"
      },
      {
        "subjectRaw": "Inter-universal Teichmüller Theory 1（宇宙際タイヒミューラー理論 1）",
        "subjectName": "Inter-universal Teichmüller Theory 1（宇宙際タイヒミューラー理論 1）",
        "year": 1,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目（考究）",
        "domain": "数理",
        "notes": "先端数理(IUT1)"
      },
      {
        "subjectRaw": "企業経営",
        "subjectName": "企業経営",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "経済・マーケット",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "線形代数2",
        "subjectName": "線形代数2",
        "year": 2,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "数理",
        "notes": "基盤数理"
      },
      {
        "subjectRaw": "日本文学Ⅰ",
        "subjectName": "日本文学Ⅰ",
        "year": 2,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "文化・思想",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "機械翻訳実践（情報）",
        "subjectName": "機械翻訳実践（情報）",
        "year": 2,
        "quarterStr": "1-2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "多言語情報理解",
        "notes": "多言語要件"
      },
      {
        "subjectRaw": "解析学2",
        "subjectName": "解析学2",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "数理",
        "notes": "基盤数理"
      },
      {
        "subjectRaw": "日常に現れる物理学",
        "subjectName": "日常に現れる物理学",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "数理",
        "notes": "展開科目(力学前提)"
      },
      {
        "subjectRaw": "集合と論理",
        "subjectName": "集合と論理",
        "year": 2,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "数理",
        "notes": "【追加】論理・構造前提(1Q/3Q開講)"
      },
      {
        "subjectRaw": "解析学3",
        "subjectName": "解析学3",
        "year": 2,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "数理",
        "notes": "基盤数理(1Q/3Q開講)"
      },
      {
        "subjectRaw": "力学",
        "subjectName": "力学",
        "year": 2,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "数理",
        "notes": "物理数理(日常物理・解析1修得後/3Q開講)"
      },
      {
        "subjectRaw": "科学哲学",
        "subjectName": "科学哲学",
        "year": 2,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "文化・思想",
        "notes": "世界理解"
      },
      {
        "subjectRaw": "社会学Ⅰ",
        "subjectName": "社会学Ⅰ",
        "year": 2,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "社会・ネットワーク",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "記号論理",
        "subjectName": "記号論理",
        "year": 2,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "数理",
        "notes": "数理論理(集合と論理修得後/4Q履修)"
      },
      {
        "subjectRaw": "数理構造の発見と活用",
        "subjectName": "数理構造の発見と活用",
        "year": 2,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "数理",
        "notes": "展開科目(集合と論理・思考修得後/4Q履修)"
      },
      {
        "subjectRaw": "数理科学発展演習Ⅰ",
        "subjectName": "数理科学発展演習Ⅰ",
        "year": 2,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目（考究）",
        "domain": "数理",
        "notes": "考究科目(基礎数理完結後)"
      },
      {
        "subjectRaw": "機械翻訳実践（自然科学）",
        "subjectName": "機械翻訳実践（自然科学）",
        "year": 2,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "多言語情報理解",
        "notes": "多言語要件"
      },
      {
        "subjectRaw": "プロジェクト実践",
        "subjectName": "プロジェクト実践",
        "year": 4,
        "quarterStr": "1-4Q",
        "credits": 4,
        "category": "展開科目（考究）",
        "domain": "卒業プロジェクト",
        "notes": "卒業プロジェクト(1~4Q通年・4単位)"
      }
    ]
  },
  {
    "id": "regional-creation",
    "name": "地域創生・アグリ＆スマートローカル",
    "tagline": "アグリテック・地域イノベーション・ローカル活性化を目指す地域創生コース",
    "iconName": "Leaf",
    "gradient": "linear-gradient(135deg, #22c55e 0%, #047857 100%)",
    "totalCoursesCount": 31,
    "totalCredits": 64,
    "courses": [
      {
        "subjectRaw": "アカデミックリテラシー",
        "subjectName": "アカデミックリテラシー",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "必修"
      },
      {
        "subjectRaw": "ITリテラシー",
        "subjectName": "ITリテラシー",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "必修"
      },
      {
        "subjectRaw": "人文社会入門",
        "subjectName": "人文社会入門",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "導入要件"
      },
      {
        "subjectRaw": "人工知能活用実践",
        "subjectName": "人工知能活用実践",
        "year": 1,
        "quarterStr": "1-2Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "導入要件(多言語前提)"
      },
      {
        "subjectRaw": "デジタルツールの使い方",
        "subjectName": "デジタルツールの使い方",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "必修"
      },
      {
        "subjectRaw": "多言語ITコミュニケーション",
        "subjectName": "多言語ITコミュニケーション",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "多言語情報理解",
        "notes": "必修(ツール修得後)"
      },
      {
        "subjectRaw": "経済入門",
        "subjectName": "経済入門",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "【追加】地域イノベーション・経済前提"
      },
      {
        "subjectRaw": "データサイエンス概論",
        "subjectName": "データサイエンス概論",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "情報",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "現代社会と数学",
        "subjectName": "現代社会と数学",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "【置換】導入選択(社会と数学)"
      },
      {
        "subjectRaw": "伝わる論理とコミュニケーション",
        "subjectName": "伝わる論理とコミュニケーション",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "社会・ネットワーク",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "数学史",
        "subjectName": "数学史",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "数理",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "経済言説史",
        "subjectName": "経済言説史",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "経済・マーケット",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "心理学",
        "subjectName": "心理学",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "文化・思想",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "アニメ産業史",
        "subjectName": "アニメ産業史",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "デジタル産業",
        "notes": "デジタル産業指定要件"
      },
      {
        "subjectRaw": "地域課題の解決とイノベーション",
        "subjectName": "地域課題の解決とイノベーション",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "経済・マーケット",
        "notes": "基礎科目(経済入門修得後)"
      },
      {
        "subjectRaw": "生きてゆくための禅",
        "subjectName": "生きてゆくための禅",
        "year": 1,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目（考究）",
        "domain": "文化・思想",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "大学とメディアの人類史",
        "subjectName": "大学とメディアの人類史",
        "year": 2,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "社会・ネットワーク",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "コンテンツ産業論",
        "subjectName": "コンテンツ産業論",
        "year": 2,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "デジタル産業",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "社会学Ⅰ",
        "subjectName": "社会学Ⅰ",
        "year": 2,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "社会・ネットワーク",
        "notes": "【追加】社会学Ⅱ前提"
      },
      {
        "subjectRaw": "社会学Ⅱ",
        "subjectName": "社会学Ⅱ",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "社会・ネットワーク",
        "notes": "世界理解"
      },
      {
        "subjectRaw": "ミクロ経済学",
        "subjectName": "ミクロ経済学",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "経済・マーケット",
        "notes": "世界理解科目(経済入門修得後)"
      },
      {
        "subjectRaw": "農業とデジタルテクノロジー",
        "subjectName": "農業とデジタルテクノロジー",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "経済・マーケット",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "スタートアップ",
        "subjectName": "スタートアップ",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "経済・マーケット",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "公共哲学",
        "subjectName": "公共哲学",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "文化・思想",
        "notes": "世界理解"
      },
      {
        "subjectRaw": "ネットワーク産業論",
        "subjectName": "ネットワーク産業論",
        "year": 2,
        "quarterStr": "1-2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "社会接続",
        "notes": "社会接続科目"
      },
      {
        "subjectRaw": "戦後日本史1",
        "subjectName": "戦後日本史1",
        "year": 2,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "社会・ネットワーク",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "意思決定の能力開発",
        "subjectName": "意思決定の能力開発",
        "year": 2,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "社会・ネットワーク",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "文化人類学Ⅱ",
        "subjectName": "文化人類学Ⅱ",
        "year": 2,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "文化・思想",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "子どもと地域づくり",
        "subjectName": "子どもと地域づくり",
        "year": 2,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目（考究）",
        "domain": "社会・ネットワーク",
        "notes": "考究科目"
      },
      {
        "subjectRaw": "機械翻訳実践（異文化理解）",
        "subjectName": "機械翻訳実践（異文化理解）",
        "year": 2,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "多言語情報理解",
        "notes": "多言語要件"
      },
      {
        "subjectRaw": "プロジェクト実践",
        "subjectName": "プロジェクト実践",
        "year": 4,
        "quarterStr": "1-4Q",
        "credits": 4,
        "category": "展開科目（考究）",
        "domain": "卒業プロジェクト",
        "notes": "卒業プロジェクト(1~4Q通年・4単位)"
      }
    ]
  },
  {
    "id": "info-security",
    "name": "情報セキュリティ・サイバー社会安全保障",
    "tagline": "ネットワーク・Linux・Webセキュリティと安全保障を修得するセキュリティコース",
    "iconName": "ShieldCheck",
    "gradient": "linear-gradient(135deg, #ef4444 0%, #be123c 100%)",
    "totalCoursesCount": 34,
    "totalCredits": 70,
    "courses": [
      {
        "subjectRaw": "アカデミックリテラシー",
        "subjectName": "アカデミックリテラシー",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "必修"
      },
      {
        "subjectRaw": "ITリテラシー",
        "subjectName": "ITリテラシー",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "必修"
      },
      {
        "subjectRaw": "人文社会入門",
        "subjectName": "人文社会入門",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "導入要件"
      },
      {
        "subjectRaw": "人工知能活用実践",
        "subjectName": "人工知能活用実践",
        "year": 1,
        "quarterStr": "1-2Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "導入要件(多言語前提)"
      },
      {
        "subjectRaw": "経済入門",
        "subjectName": "経済入門",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "導入要件"
      },
      {
        "subjectRaw": "Webアプリケーション開発1",
        "subjectName": "Webアプリケーション開発1",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "情報",
        "notes": "展開科目"
      },
      {
        "subjectRaw": "デジタルツールの使い方",
        "subjectName": "デジタルツールの使い方",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "必修"
      },
      {
        "subjectRaw": "多言語ITコミュニケーション",
        "subjectName": "多言語ITコミュニケーション",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "多言語情報理解",
        "notes": "必修(ツール修得後)"
      },
      {
        "subjectRaw": "Webアプリケーション開発2",
        "subjectName": "Webアプリケーション開発2",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "情報",
        "notes": "【追加】Web開発応用"
      },
      {
        "subjectRaw": "AI社会の歩き方",
        "subjectName": "AI社会の歩き方",
        "year": 1,
        "quarterStr": "1-2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "社会・ネットワーク",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "情報セキュリティ概論",
        "subjectName": "情報セキュリティ概論",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "情報",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "初等代数概論",
        "subjectName": "初等代数概論",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "数理",
        "notes": "暗号数理の準備"
      },
      {
        "subjectRaw": "社会学Ⅰ",
        "subjectName": "社会学Ⅰ",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "社会・ネットワーク",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "IT産業史",
        "subjectName": "IT産業史",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "デジタル産業",
        "notes": "デジタル産業指定要件"
      },
      {
        "subjectRaw": "数学史",
        "subjectName": "数学史",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "数理",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "Webアプリケーション開発3",
        "subjectName": "Webアプリケーション開発3",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "情報",
        "notes": "【追加】Webセキュリティ前提"
      },
      {
        "subjectRaw": "企業経営",
        "subjectName": "企業経営",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "経済・マーケット",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "心理学",
        "subjectName": "心理学",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "文化・思想",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "情報社会の総合安全保障",
        "subjectName": "情報社会の総合安全保障",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "社会・ネットワーク",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "現代社会と数学",
        "subjectName": "現代社会と数学",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "【置換】導入選択(社会と数学)"
      },
      {
        "subjectRaw": "インターネット概論",
        "subjectName": "インターネット概論",
        "year": 2,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "情報",
        "notes": "展開科目"
      },
      {
        "subjectRaw": "コンピューターサイエンス概論",
        "subjectName": "コンピューターサイエンス概論",
        "year": 2,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "情報",
        "notes": "展開科目"
      },
      {
        "subjectRaw": "情報社会論",
        "subjectName": "情報社会論",
        "year": 2,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "社会・ネットワーク",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "機械翻訳実践（情報）",
        "subjectName": "機械翻訳実践（情報）",
        "year": 2,
        "quarterStr": "1-2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "多言語情報理解",
        "notes": "多言語要件"
      },
      {
        "subjectRaw": "コンピュータ概論",
        "subjectName": "コンピュータ概論",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "情報",
        "notes": "展開科目"
      },
      {
        "subjectRaw": "情報処理概論",
        "subjectName": "情報処理概論",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "情報",
        "notes": "展開科目"
      },
      {
        "subjectRaw": "哲学概論",
        "subjectName": "哲学概論",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "文化・思想",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "機械翻訳実践（法学）",
        "subjectName": "機械翻訳実践（法学）",
        "year": 2,
        "quarterStr": "1-2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "多言語情報理解",
        "notes": "多言語要件"
      },
      {
        "subjectRaw": "Linux概論",
        "subjectName": "Linux概論",
        "year": 2,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "情報",
        "notes": "展開科目"
      },
      {
        "subjectRaw": "戦後日本史1",
        "subjectName": "戦後日本史1",
        "year": 2,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "社会・ネットワーク",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "意思決定の能力開発",
        "subjectName": "意思決定の能力開発",
        "year": 2,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "社会・ネットワーク",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "インターネットのしくみ",
        "subjectName": "インターネットのしくみ",
        "year": 2,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目（考究）",
        "domain": "情報",
        "notes": "考究科目"
      },
      {
        "subjectRaw": "Webセキュリティ演習",
        "subjectName": "Webセキュリティ演習",
        "year": 2,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目（考究）",
        "domain": "情報",
        "notes": "考究科目(Web1~3完結後)"
      },
      {
        "subjectRaw": "プロジェクト実践",
        "subjectName": "プロジェクト実践",
        "year": 4,
        "quarterStr": "1-4Q",
        "credits": 4,
        "category": "展開科目（考究）",
        "domain": "卒業プロジェクト",
        "notes": "卒業プロジェクト(1~4Q通年・4単位)"
      }
    ]
  },
  {
    "id": "content-produce",
    "name": "コンテンツ・プロデュース＆知財メディアビジネス",
    "tagline": "マンガ・アニメ・ネット文化の企画立案・プロデュース・知財流通を学ぶコース",
    "iconName": "Film",
    "gradient": "linear-gradient(135deg, #a855f7 0%, #db2777 100%)",
    "totalCoursesCount": 31,
    "totalCredits": 64,
    "courses": [
      {
        "subjectRaw": "アカデミックリテラシー",
        "subjectName": "アカデミックリテラシー",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "必修"
      },
      {
        "subjectRaw": "ITリテラシー",
        "subjectName": "ITリテラシー",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "必修"
      },
      {
        "subjectRaw": "人文社会入門",
        "subjectName": "人文社会入門",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "導入要件"
      },
      {
        "subjectRaw": "人工知能活用実践",
        "subjectName": "人工知能活用実践",
        "year": 1,
        "quarterStr": "1-2Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "導入要件(多言語前提)"
      },
      {
        "subjectRaw": "経済入門",
        "subjectName": "経済入門",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "導入要件"
      },
      {
        "subjectRaw": "デジタルツールの使い方",
        "subjectName": "デジタルツールの使い方",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "必修"
      },
      {
        "subjectRaw": "多言語ITコミュニケーション",
        "subjectName": "多言語ITコミュニケーション",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "多言語情報理解",
        "notes": "必修(ツール修得後)"
      },
      {
        "subjectRaw": "マンガ絵コンテから学ぶ視覚表現",
        "subjectName": "マンガ絵コンテから学ぶ視覚表現",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "文化・思想",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "現代社会と数学",
        "subjectName": "現代社会と数学",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "【置換】導入選択(社会と数学)"
      },
      {
        "subjectRaw": "マンガ産業史",
        "subjectName": "マンガ産業史",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "デジタル産業",
        "notes": "デジタル産業指定要件"
      },
      {
        "subjectRaw": "世界が変わる編集力",
        "subjectName": "世界が変わる編集力",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "文化・思想",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "数学史",
        "subjectName": "数学史",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "数理",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "アニメ産業史",
        "subjectName": "アニメ産業史",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "デジタル産業",
        "notes": "デジタル産業"
      },
      {
        "subjectRaw": "心理学",
        "subjectName": "心理学",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "文化・思想",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "企業経営",
        "subjectName": "企業経営",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "経済・マーケット",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "二次創作の歴史から見るネット文化",
        "subjectName": "二次創作の歴史から見るネット文化",
        "year": 1,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "デジタル産業",
        "notes": "デジタル産業"
      },
      {
        "subjectRaw": "コンテンツ産業論",
        "subjectName": "コンテンツ産業論",
        "year": 2,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "デジタル産業",
        "notes": "デジタル産業"
      },
      {
        "subjectRaw": "企業経営と会計",
        "subjectName": "企業経営と会計",
        "year": 2,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "経済・マーケット",
        "notes": "経済・マーケット"
      },
      {
        "subjectRaw": "社会学Ⅰ",
        "subjectName": "社会学Ⅰ",
        "year": 2,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "社会・ネットワーク",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "デジタル・マーケティング",
        "subjectName": "デジタル・マーケティング",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "経済・マーケット",
        "notes": "経済・マーケット"
      },
      {
        "subjectRaw": "データサイエンス概論",
        "subjectName": "データサイエンス概論",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "情報",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "近・現代アート概論",
        "subjectName": "近・現代アート概論",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "文化・思想",
        "notes": "文化・思想"
      },
      {
        "subjectRaw": "意思決定の能力開発",
        "subjectName": "意思決定の能力開発",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "社会・ネットワーク",
        "notes": "【追加】交渉・合意形成前提"
      },
      {
        "subjectRaw": "アニメのクオリティー管理と商品性",
        "subjectName": "アニメのクオリティー管理と商品性",
        "year": 2,
        "quarterStr": "1-2Q",
        "credits": 2,
        "category": "展開科目（考究）",
        "domain": "デジタル産業",
        "notes": "考究科目"
      },
      {
        "subjectRaw": "ネットワーク産業論",
        "subjectName": "ネットワーク産業論",
        "year": 2,
        "quarterStr": "1-2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "社会接続",
        "notes": "社会接続科目"
      },
      {
        "subjectRaw": "対人コミュニケーション論",
        "subjectName": "対人コミュニケーション論",
        "year": 2,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "社会接続",
        "notes": "社会接続科目"
      },
      {
        "subjectRaw": "交渉・合意形成概論",
        "subjectName": "交渉・合意形成概論",
        "year": 2,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "経済・マーケット",
        "notes": "世界理解(意思決定修得後)"
      },
      {
        "subjectRaw": "マンガの企画立案とプロデュース論",
        "subjectName": "マンガの企画立案とプロデュース論",
        "year": 2,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目（考究）",
        "domain": "デジタル産業",
        "notes": "考究科目"
      },
      {
        "subjectRaw": "文化資源のデジタルアーカイブ",
        "subjectName": "文化資源のデジタルアーカイブ",
        "year": 2,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目（考究）",
        "domain": "デジタル産業",
        "notes": "考究科目"
      },
      {
        "subjectRaw": "機械翻訳実践（日本研究）",
        "subjectName": "機械翻訳実践（日本研究）",
        "year": 2,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "多言語情報理解",
        "notes": "多言語要件"
      },
      {
        "subjectRaw": "プロジェクト実践",
        "subjectName": "プロジェクト実践",
        "year": 4,
        "quarterStr": "1-4Q",
        "credits": 4,
        "category": "展開科目（考究）",
        "domain": "卒業プロジェクト",
        "notes": "卒業プロジェクト(1~4Q通年・4単位)"
      }
    ]
  },
  {
    "id": "cognitive-science",
    "name": "認知科学・ヒューマンインターフェース",
    "tagline": "認知神経科学・心理学・AIと人間中心設計（UI/UX）を結ぶ学術コース",
    "iconName": "Cpu",
    "gradient": "linear-gradient(135deg, #0284c7 0%, #4338ca 100%)",
    "totalCoursesCount": 32,
    "totalCredits": 66,
    "courses": [
      {
        "subjectRaw": "アカデミックリテラシー",
        "subjectName": "アカデミックリテラシー",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "必修"
      },
      {
        "subjectRaw": "ITリテラシー",
        "subjectName": "ITリテラシー",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "必修"
      },
      {
        "subjectRaw": "人文社会入門",
        "subjectName": "人文社会入門",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "導入要件"
      },
      {
        "subjectRaw": "人工知能活用実践",
        "subjectName": "人工知能活用実践",
        "year": 1,
        "quarterStr": "1-2Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "導入要件(多言語前提)"
      },
      {
        "subjectRaw": "経済入門",
        "subjectName": "経済入門",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "導入要件"
      },
      {
        "subjectRaw": "デジタルツールの使い方",
        "subjectName": "デジタルツールの使い方",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "必修"
      },
      {
        "subjectRaw": "多言語ITコミュニケーション",
        "subjectName": "多言語ITコミュニケーション",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "多言語情報理解",
        "notes": "必修(ツール修得後)"
      },
      {
        "subjectRaw": "心理学",
        "subjectName": "心理学",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "文化・思想",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "データサイエンス概論",
        "subjectName": "データサイエンス概論",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "情報",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "数学の方法",
        "subjectName": "数学の方法",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "数理",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "現代社会と数学",
        "subjectName": "現代社会と数学",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "【置換】導入選択(社会と数学)"
      },
      {
        "subjectRaw": "伝わる論理とコミュニケーション",
        "subjectName": "伝わる論理とコミュニケーション",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "社会・ネットワーク",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "IT産業史",
        "subjectName": "IT産業史",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "デジタル産業",
        "notes": "デジタル産業指定要件"
      },
      {
        "subjectRaw": "線形代数1",
        "subjectName": "線形代数1",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "数理",
        "notes": "【追加】機械学習・DL前提数学"
      },
      {
        "subjectRaw": "数学史",
        "subjectName": "数学史",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "数理",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "Pythonプログラミング",
        "subjectName": "Pythonプログラミング",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "情報",
        "notes": "プログラミング基礎"
      },
      {
        "subjectRaw": "解析学1",
        "subjectName": "解析学1",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "数理",
        "notes": "【追加】機械学習・DL前提数学"
      },
      {
        "subjectRaw": "企業経営",
        "subjectName": "企業経営",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "経済・マーケット",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "政治を超える哲学Ⅰ",
        "subjectName": "政治を超える哲学Ⅰ",
        "year": 1,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目（考究）",
        "domain": "文化・思想",
        "notes": "考究科目"
      },
      {
        "subjectRaw": "認知神経科学",
        "subjectName": "認知神経科学",
        "year": 2,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "文化・思想",
        "notes": "脳科学・認知基礎"
      },
      {
        "subjectRaw": "機械学習概論",
        "subjectName": "機械学習概論",
        "year": 2,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "情報",
        "notes": "AI基礎(Python・数学修得後)"
      },
      {
        "subjectRaw": "コンピューターサイエンス概論",
        "subjectName": "コンピューターサイエンス概論",
        "year": 2,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "情報",
        "notes": "CS基礎"
      },
      {
        "subjectRaw": "文化人類学Ⅰ",
        "subjectName": "文化人類学Ⅰ",
        "year": 2,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "文化・思想",
        "notes": "【追加】文化人類学Ⅱ前提"
      },
      {
        "subjectRaw": "意思決定の能力開発",
        "subjectName": "意思決定の能力開発",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "社会・ネットワーク",
        "notes": "社会・ネットワーク"
      },
      {
        "subjectRaw": "哲学概論",
        "subjectName": "哲学概論",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "文化・思想",
        "notes": "文化・思想"
      },
      {
        "subjectRaw": "文化人類学Ⅱ",
        "subjectName": "文化人類学Ⅱ",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "文化・思想",
        "notes": "文化・思想(Ⅰ修得後)"
      },
      {
        "subjectRaw": "心理学実験・調査演習",
        "subjectName": "心理学実験・調査演習",
        "year": 2,
        "quarterStr": "1-2Q",
        "credits": 2,
        "category": "展開科目（考究）",
        "domain": "文化・思想",
        "notes": "考究科目"
      },
      {
        "subjectRaw": "ディープラーニング1",
        "subjectName": "ディープラーニング1",
        "year": 2,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "情報",
        "notes": "AI専門(線形・解析・ML完結後)"
      },
      {
        "subjectRaw": "科学哲学",
        "subjectName": "科学哲学",
        "year": 2,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "文化・思想",
        "notes": "文化・思想"
      },
      {
        "subjectRaw": "ウェルビーイングをデザインする",
        "subjectName": "ウェルビーイングをデザインする",
        "year": 2,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目（考究）",
        "domain": "文化・思想",
        "notes": "考究科目"
      },
      {
        "subjectRaw": "機械翻訳実践（異文化理解）",
        "subjectName": "機械翻訳実践（異文化理解）",
        "year": 2,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "多言語情報理解",
        "notes": "多言語要件"
      },
      {
        "subjectRaw": "プロジェクト実践",
        "subjectName": "プロジェクト実践",
        "year": 4,
        "quarterStr": "1-4Q",
        "credits": 4,
        "category": "展開科目（考究）",
        "domain": "卒業プロジェクト",
        "notes": "卒業プロジェクト(1~4Q通年・4単位)"
      }
    ]
  },
  {
    "id": "social-design",
    "name": "ソーシャルデザイン・未来社会構想",
    "tagline": "SF思考・未来社会デザイン・現代社会理論で理想の社会を設計するコース",
    "iconName": "Compass",
    "gradient": "linear-gradient(135deg, #14b8a6 0%, #0369a1 100%)",
    "totalCoursesCount": 33,
    "totalCredits": 68,
    "courses": [
      {
        "subjectRaw": "アカデミックリテラシー",
        "subjectName": "アカデミックリテラシー",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "必修"
      },
      {
        "subjectRaw": "ITリテラシー",
        "subjectName": "ITリテラシー",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "必修"
      },
      {
        "subjectRaw": "人文社会入門",
        "subjectName": "人文社会入門",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "導入要件"
      },
      {
        "subjectRaw": "人工知能活用実践",
        "subjectName": "人工知能活用実践",
        "year": 1,
        "quarterStr": "1-2Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "導入要件(多言語前提)"
      },
      {
        "subjectRaw": "経済入門",
        "subjectName": "経済入門",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "導入要件"
      },
      {
        "subjectRaw": "デジタルツールの使い方",
        "subjectName": "デジタルツールの使い方",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "必修"
      },
      {
        "subjectRaw": "多言語ITコミュニケーション",
        "subjectName": "多言語ITコミュニケーション",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "多言語情報理解",
        "notes": "必修(ツール修得後)"
      },
      {
        "subjectRaw": "社会学Ⅰ",
        "subjectName": "社会学Ⅰ",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "社会・ネットワーク",
        "notes": "基礎科目要件(人文社会修得後)"
      },
      {
        "subjectRaw": "哲学概論",
        "subjectName": "哲学概論",
        "year": 1,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "文化・思想",
        "notes": "【追加】科学哲学前提"
      },
      {
        "subjectRaw": "AI社会の歩き方",
        "subjectName": "AI社会の歩き方",
        "year": 1,
        "quarterStr": "1-2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "社会・ネットワーク",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "世界が変わる編集力",
        "subjectName": "世界が変わる編集力",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "文化・思想",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "数学史",
        "subjectName": "数学史",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "数理",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "情報セキュリティ概論",
        "subjectName": "情報セキュリティ概論",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "情報",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "マンガ産業史",
        "subjectName": "マンガ産業史",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "デジタル産業",
        "notes": "デジタル産業指定要件"
      },
      {
        "subjectRaw": "文化人類学Ⅰ",
        "subjectName": "文化人類学Ⅰ",
        "year": 1,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "文化・思想",
        "notes": "【追加】文化人類学Ⅱ前提"
      },
      {
        "subjectRaw": "マルクス経済学",
        "subjectName": "マルクス経済学",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "経済・マーケット",
        "notes": "世界理解科目"
      },
      {
        "subjectRaw": "企業経営",
        "subjectName": "企業経営",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "経済・マーケット",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "心理学",
        "subjectName": "心理学",
        "year": 1,
        "quarterStr": "4Q",
        "credits": 2,
        "category": "基礎科目",
        "domain": "文化・思想",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "現代社会と数学",
        "subjectName": "現代社会と数学",
        "year": 1,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "導入科目",
        "domain": "導入",
        "notes": "【置換】導入選択(社会と数学)"
      },
      {
        "subjectRaw": "大学とメディアの人類史",
        "subjectName": "大学とメディアの人類史",
        "year": 2,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "社会・ネットワーク",
        "notes": "社会・ネットワーク"
      },
      {
        "subjectRaw": "経済言説史",
        "subjectName": "経済言説史",
        "year": 2,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "経済・マーケット",
        "notes": "基礎科目要件"
      },
      {
        "subjectRaw": "科学哲学",
        "subjectName": "科学哲学",
        "year": 2,
        "quarterStr": "1Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "文化・思想",
        "notes": "文化・思想(哲学概論修得後)"
      },
      {
        "subjectRaw": "社会学Ⅱ",
        "subjectName": "社会学Ⅱ",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "社会・ネットワーク",
        "notes": "社会・NW(社会学Ⅰ修得後)"
      },
      {
        "subjectRaw": "公共哲学",
        "subjectName": "公共哲学",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "文化・思想",
        "notes": "文化・思想"
      },
      {
        "subjectRaw": "意思決定の能力開発",
        "subjectName": "意思決定の能力開発",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "社会・ネットワーク",
        "notes": "社会・ネットワーク"
      },
      {
        "subjectRaw": "文化人類学Ⅱ",
        "subjectName": "文化人類学Ⅱ",
        "year": 2,
        "quarterStr": "2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "文化・思想",
        "notes": "文化・思想(Ⅰ修得後)"
      },
      {
        "subjectRaw": "SFから考える未来ビジョン",
        "subjectName": "SFから考える未来ビジョン",
        "year": 2,
        "quarterStr": "1-2Q",
        "credits": 2,
        "category": "展開科目（考究）",
        "domain": "社会・ネットワーク",
        "notes": "考究科目"
      },
      {
        "subjectRaw": "機械翻訳実践（法学）",
        "subjectName": "機械翻訳実践（法学）",
        "year": 2,
        "quarterStr": "1-2Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "多言語情報理解",
        "notes": "多言語要件"
      },
      {
        "subjectRaw": "ジェンダー論",
        "subjectName": "ジェンダー論",
        "year": 2,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "社会・ネットワーク",
        "notes": "社会・ネットワーク"
      },
      {
        "subjectRaw": "情報社会論",
        "subjectName": "情報社会論",
        "year": 2,
        "quarterStr": "3Q",
        "credits": 2,
        "category": "展開科目",
        "domain": "社会・ネットワーク",
        "notes": "社会・ネットワーク"
      },
      {
        "subjectRaw": "未来社会デザイン論",
        "subjectName": "未来社会デザイン論",
        "year": 2,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目（考究）",
        "domain": "社会・ネットワーク",
        "notes": "考究科目"
      },
      {
        "subjectRaw": "現代社会理論",
        "subjectName": "現代社会理論",
        "year": 2,
        "quarterStr": "3-4Q",
        "credits": 2,
        "category": "展開科目（考究）",
        "domain": "社会・ネットワーク",
        "notes": "考究科目"
      },
      {
        "subjectRaw": "プロジェクト実践",
        "subjectName": "プロジェクト実践",
        "year": 4,
        "quarterStr": "1-4Q",
        "credits": 4,
        "category": "展開科目（考究）",
        "domain": "卒業プロジェクト",
        "notes": "卒業プロジェクト(1~4Q通年・4単位)"
      }
    ]
  }
];
