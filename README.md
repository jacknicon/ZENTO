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
  - 科目同士の前提条件・推奨前提関係をインタラクティブなノードグラフで視覚化
  - 特定科目をクリックして前後のつながりをハイライト確認
- **🤖 AI履修相談 連携機能**
  - 現在の履修計画状況をワンクリックでコピー（ChatGPTやClaudeに最適化されたプロンプト生成）
  - AIからのアドバイステキストをワンクリックでZENTOに一括インポート
- **💾 データ保存 & バックアップ**
  - 入力データはすべてブラウザ（LocalStorage）に自動保存
  - JSON/CSVファイルでのエクスポート/インポートに対応

---

## 🛠️ 使用技術 (Tech Stack)

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: Modern Glassmorphism CSS / Responsive Layout
- **Icon Set**: Lucide React
- **Deployment**: Vercel
- **AI Code Assistance**: Google Antigravity (Gemini)

---

## 🚀 ローカルでの開発・起動手順

```bash
# リポジトリのクローン
git clone https://github.com/jacknicon/ZENTO.git
cd ZENTO

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

本アプリケーションの開発にあたり、AIコードアシスタントおよび先行して公開されているオープンソースプロジェクトを参考に活用させていただきました。心より感謝申し上げます。

- **AI Pair Programming**: [Google Antigravity](https://deepmind.google/) (Gemini Powered)
- **先駆的プロジェクト**: [ZEN大学 履修計画プランナー by sifue](https://github.com/sifue/zen-course-planner) (MIT License)

---

## 📄 ライセンス

本サービスのソースコードは [MIT License](https://github.com/jacknicon/ZENTO/blob/main/LICENSE) のもとで公開されています。

---

## 📜 利用規約

**最終更新日: 2026年9月6日**

### 第1条（本サービスについて）
ZENTO（以下「本サービス」）は、ZEN大学の学生が4年間の履修計画を立てるための非公式の個人制作ツールです。本サービスはZEN大学および関連機関とは一切関係なく、公式の情報提供ではありません。

### 第2条（免責事項）
1. 本サービスが提供する情報（科目情報・卒業要件・進級要件等）は、公開されているシラバス情報をもとに作成されていますが、正確性・完全性・最新性を保証するものではありません。
2. 履修計画の最終的な確認・判断・責任はすべて利用者ご本人にあります。必ずZEN大学の[公式シラバスサイト](https://syllabus.zen.ac.jp/)や学生便覧、ZENPortal等にご確認ください。
3. 本サービスの利用によって生じた単位不足・卒業要件未達・進級要件未達 その他いかなる不利益についても、作者は一切の責任を負いません。
4. 本サービスは予告なく変更・中断・終了される場合があります。
5. 本サービスが提供する「AI相談機能」（プロンプト生成およびアドバイス結果のインポート）で生成・表示される回答内容は、外部生成AIによる参考意見であり、大学公式の履修指導や単位修得を保証するものではありません。

### 第3条（データの保存・共有）
本サービスで作成した履修計画データは、お使いのブラウザのローカルストレージにのみ保存されます。外部サーバーへのデータ送信は一切行いません。ブラウザのデータ消去やプライベートブラウジング終了時にデータが失われる可能性があります。重要なデータは定期的にJSON/CSVファイルとしてエクスポートしてください。なお、本サービスの計画共有機能（画像保存およびテキストコピー）ではプライバシー配慮のため成績評価情報は自動的にマスク非表示化されますが、第三者への共有は利用者ご自身の責任において行ってください。

### 第4条（知的財産権）
本サービスのソースコードは[MITライセンス](https://github.com/jacknicon/ZENTO/blob/main/LICENSE)で公開されています。科目情報・シラバスデータに関する権利はZEN大学に帰属します。

### 第5条（禁止事項）
- 本サービスを商業目的で無断利用すること
- 本サービスに対して過度な負荷をかける行為
- その他、法令または公序良俗に反する行為

### 第6条（規約の変更）
本規約は予告なく変更される場合があります。変更後も本サービスを利用した場合、変更後の規約に同意したものとみなします。

### 第7条（お問い合わせ）
本サービスに関するご意見・ご不満・不具合報告は以下からお願いします。
- [🐛 不具合報告 (Slack)](https://zen-student.slack.com/team/U08KGNB35L2)
- [GitHub Issues](https://github.com/jacknicon/ZENTO/issues)
