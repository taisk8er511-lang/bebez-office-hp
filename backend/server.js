require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
const PORT = process.env.PORT || 3000;

// ミドルウェア設定
app.use(cors());
app.use(express.json());

// Claude APIクライアント
const client = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY
});

// システムプロンプト
const SYSTEM_PROMPT = `あなたは行政書士宮本べべつ法務事務所のAIアシスタントです。

【事務所について】
- 名称: 行政書士宮本べべつ法務事務所
- 代表: 宮本泰輔（行政書士）
- 所属: 北海道行政書士会 旭川支部（登録番号：第22010505号）
- 所在地: 北海道旭川市西神楽北１条１丁目１３８番地の７７
- 営業時間: 10:00～18:00（定休日：日曜日）
- 電話: 080-3293-8296

【主な業務】
- 相続・遺言手続き
- 終活支援・成年後見制度
- 自動車登録業務
- 企業スタートアップサポート
- 地域振興・地域住民への相談支援

【特徴】
- 20年の介護業務経験を活かした親しみやすいサポート
- 地元太鼓保存会での活動など地域密着型
- AI技術を活用した業務効率化

【対応方針】
相談者の質問に対して、親切かつ専門的にサポートしてください。
以下の点に注意してください：
1. 法律的なアドバイスが必要な場合は、「詳しくはお問い合わせください」と案内
2. 緊急時は電話番号を案内
3. 相談者の問題を理解し、共感的に対応
4. 簡潔でわかりやすい日本語で回答
5. 必要に応じて事務所の強みや特徴をアピール`;

// チャットエンドポイント
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    // バリデーション
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'メッセージが必要です' });
    }

    if (message.trim().length === 0) {
      return res.status(400).json({ error: 'メッセージが空です' });
    }

    // Claude APIへのリクエスト
    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: message
        }
      ]
    });

    // レスポンス抽出
    const assistantMessage = response.content[0].type === 'text'
      ? response.content[0].text
      : 'レスポンスの取得に失敗しました';

    res.json({
      success: true,
      message: assistantMessage,
      tokens: {
        input: response.usage.input_tokens,
        output: response.usage.output_tokens
      }
    });

  } catch (error) {
    console.error('チャット処理エラー:', error);

    // エラーメッセージの設定
    let errorMessage = '申し訳ございません。サーバーエラーが発生しました。';
    let statusCode = 500;

    if (error.status === 401) {
      errorMessage = 'APIキーの認証に失敗しました。';
      statusCode = 401;
    } else if (error.status === 429) {
      errorMessage = 'リクエストが多すぎます。しばらく待ってからお試しください。';
      statusCode = 429;
    } else if (error.status === 500) {
      errorMessage = 'Claude APIでエラーが発生しました。しばらく待ってからお試しください。';
      statusCode = 500;
    }

    res.status(statusCode).json({
      success: false,
      error: errorMessage
    });
  }
});

// ヘルスチェック
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`✅ チャットボットサーバーが起動しました: http://localhost:${PORT}`);
  console.log(`📍 APIエンドポイント: POST ${PORT}/api/chat`);
  console.log(`🔍 ヘルスチェック: GET ${PORT}/api/health`);
});
