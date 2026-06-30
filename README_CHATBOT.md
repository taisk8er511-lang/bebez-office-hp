# 🤖 行政書士宮本べべつ法務事務所 AIチャットボット

Claude APIを使用したAIチャットボット機能の実装ガイドです。

## 📋 概要

このチャットボットは、company.htmlに統合されたAIアシスタント機能です。

**特徴：**
- ✨ ターコイズブルー + うぐいす色でHP統一デザイン
- 🔒 APIキーはサーバー側で安全に管理
- ⚡ Vercel無料枠でホスト（月額$0）
- 📱 レスポンシブデザイン（スマートフォン対応）
- 🎯 行政書士業務特化のシステムプロンプト

---

## 🚀 セットアップ手順

### ステップ 1: Claude API キーの取得

1. https://console.anthropic.com/ にアクセス
2. 「API Keys」セクションで新しいキーを作成
3. キーをコピー（`sk-ant-...` で始まります）

### ステップ 2: ローカル環境での設定

```bash
# backendディレクトリに移動
cd backend

# .envファイルを作成（.env.exampleを参考）
cp .env.example .env

# .envファイルを編集してCLAUDE_API_KEYを設定
# vim .env
# または任意のテキストエディタで編集
```

**.env ファイルの内容：**
```
CLAUDE_API_KEY=sk-ant-... (ここにあなたのAPIキーを入力)
PORT=3000
```

### ステップ 3: 依存ライブラリのインストール

```bash
# backendディレクトリにいることを確認
cd backend

# npm install を実行
npm install
```

### ステップ 4: ローカルでのテスト

```bash
# サーバーを起動
npm start
# または npm run dev

# 以下のメッセージが表示されれば成功
# ✅ チャットボットサーバーが起動しました: http://localhost:3000
```

### ステップ 5: ブラウザでテスト

1. `company.html` をブラウザで開く
2. 画面右下に「🤖 AIアシスタント」が表示される
3. メッセージを入力して送信
4. チャットボットからのレスポンスが表示されることを確認

---

## 📦 Vercelへのデプロイ

### デプロイ前の準備

1. Vercelアカウントを作成（https://vercel.com/）
2. GitHubにこのリポジトリをpush

### デプロイ手順

```bash
# Vercel CLIをインストール（初回のみ）
npm install -g vercel

# デプロイを実行
vercel

# プロンプトに従って設定
```

### Vercel環境変数の設定

1. Vercelダッシュボードで「Settings」を開く
2. 「Environment Variables」セクションで新規追加
3. キー：`CLAUDE_API_KEY`
4. 値：Claude APIキー（`sk-ant-...`）
5. 保存後、再デプロイを実行

---

## 🔧 トラブルシューティング

### エラー: "Cannot find module 'dotenv'"

**解決策：**
```bash
npm install
```

### エラー: "Invalid API key"

**解決策：**
1. Claude API キーが正しいか確認
2. .env ファイルに正しく設定されているか確認
3. 前後の空白がないか確認

### チャットボットが応答しない

**確認項目：**
1. サーバーが起動しているか確認
2. ブラウザのコンソール（F12）でエラーをチェック
3. ネットワークタブでAPIリクエストが送信されているか確認
4. Claude APIの利用制限に達していないか確認

---

## 💰 コスト

### 月額費用見積もり

| 利用量 | 月額費用 |
|------|--------|
| 来訪者なし | $0 |
| 月間100回チャット | 約$0.50 |
| 月間300回チャット | 約$2～3 |
| 月間1,000回チャット | 約$5～10 |

### 内訳

- **Claude API**: 従量課金（入力$3/100万トークン、出力$15/100万トークン）
- **Vercel**: 無料枠で運用可能

---

## 🔒 セキュリティ

### APIキー保護

✅ **実装済みのセキュリティ対策：**
- APIキーはサーバー側（環境変数）で管理
- .env ファイルは .gitignore に記載（Gitに含まれない）
- フロントエンドから直接APIにアクセスしない

⚠️ **注意点：**
- .env ファイルを GitHub にpushしないこと
- APIキーを他人と共有しないこと
- Vercel環境変数も安全に管理すること

---

## 📝 システムプロンプト のカスタマイズ

server.js の `SYSTEM_PROMPT` 変数を編集することで、チャットボットの動作をカスタマイズできます。

```javascript
const SYSTEM_PROMPT = `あなたは行政書士宮本べべつ法務事務所のAIアシスタントです。

【事務所について】
... (ここでカスタマイズ可能)
```

---

## 🎨 デザインのカスタマイズ

company.html の `<style>` セクション内の以下のクラスでスタイル変更が可能：

- `.chatbot-widget` - 全体のウィジェット
- `.chatbot-header` - ヘッダー部分
- `.chatbot-message` - メッセージ表示

---

## 📞 サポート

問題が発生した場合：

1. コンソール（F12）のエラーメッセージを確認
2. .env ファイルが正しく設定されているか確認
3. Claude API キーの有効性を確認
4. Vercel の Logs セクションでサーバーエラーを確認

---

## 📚 参考リンク

- [Claude API ドキュメント](https://docs.anthropic.com/)
- [Vercel デプロイ ドキュメント](https://vercel.com/docs)
- [Anthropic SDK](https://github.com/anthropics/anthropic-sdk-python)

---

**作成日**: 2026年6月
**バージョン**: 1.0.0
