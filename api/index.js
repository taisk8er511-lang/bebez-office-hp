const express = require('express');
const path = require('path');

const app = express();

// JSON リクエストボディを解析
app.use(express.json());

// 静的ファイルを serve（public ディレクトリ）
app.use(express.static(path.join(__dirname, '..', 'public')));

// API エンドポイント
app.post('/api/chat', require('./chat'));
app.get('/api/health', require('./health'));

// ホームページへのリクエスト
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// ポートをリッスン
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
