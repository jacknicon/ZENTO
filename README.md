# ZENTO - ZEN大学 履修計画＆単位進捗管理ツール

![ZENTO Logo / Cover](https://img.shields.io/badge/ZEN%20University-Course%20Management-indigo?style=for-the-badge&logo=react)
![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite)
![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)

**ZENTO**（ゼントー）は、ZEN大学の学生のために開発された**オールインワン履修計画＆単位管理Webアプリケーション**です。  
全279科目のシラバスデータ・前提科目ルール・卒業要件ロジックを搭載し、快適なシミュレーションと卒業計画をサポートします。

---

## 🌟 主な機能

- **🎓 卒業要件・修得単位のリアルタイム自動判定**
  - 必修・選択必修・各分野の単位数を自動集計
  - 卒業に必要な124単位までの進捗バー・可視化ダッシュボード
- **🗓️ セメスター別 履修計画シミュレーター**
  - 1年次〜4年次（春・秋・集中）ごとの履修計画をグラフィカルに編成
  - 各セメスターの履修上限単位数オーバーや、未履修の前提科目エラーを自動検出
- **🕸️ 全279科目 履修系統図（ネットワークグラフ）**
  - 科目同士の前提条件・推奨前提関係をインタラクティブなノードグラフで視視化
  - 特定科目をクリックして前後のつながりをハイライト確認
- **🤖 AI履修相談 連携機能**
  - 現在の履修計画状況をワンクリックでコピー（ChatGPTやClaudeに最適化されたプロンプト生成）
  - AIからのアドバイステキストをワンクリックでZENTOに一括インポート
- **💾 データ保存 & バックアップ**
  - 入力データはすべてブラウザ（LocalStorage）に自動保存
  - JSONファイルでのエクスポート/インポートに対応

---

## 🛠️ 使用技術 (Tech Stack)

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS / Modern Glassmorphism CSS
- **Icon Set**: Lucide React
- **Deployment**: Vercel

---

## 🚀 ローカルでの開発・起動手順

```bash
# リポジトリのクローン
git clone https://github.com/jacknicon/zento.git
cd zento

# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで `http://localhost:5173` にアクセスします。

### ビルド
```bash
npm run build
```

---

## 🙏 謝意 / 参考 (Credits)

本アプリケーションの開発にあたり、先行して公開されている以下の素晴らしいオープンソースプロジェクトおよびデータを参考にさせていただきました。開発者様に心より感謝申し上げます。

- [ZEN大学 履修計画プランナー by sifue](https://github.com/sifue/zen-course-planner) (MIT License)

---

## 📄 ライセンス

[MIT License](./LICENSE) のもとで公開されています。商用利用・改変・再配布が可能です。

---

## ⚠️ 免責事項

本ツールはZEN大学の有志学生によって開発された非公式ツールです。  
履修登録や単位修得に関する最終的な確認は、必ずZEN大学の公式ポータルサイトおよびシラバス・学修要覧をご確認ください。
