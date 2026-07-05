require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

// JSON リクエストボディを解析
app.use(express.json());

// 静的ファイルを serve
app.use(express.static(path.join(__dirname, 'public')));

// API エンドポイント
app.post('/api/chat', require('./api/chat'));
app.get('/api/health', require('./api/health'));

// ホームページ
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ポート設定
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
