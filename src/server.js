// src/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/index.js';
import connectDB from './providers/dbProvider.js';
import setupSwagger from './config/swagger.js';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

// 라우트
app.use('/api', routes);

// Swagger 설정
setupSwagger(app);

// 루트 경로
app.get('/', (req, res) => {
  res.send('account-planner');
});

// 데이터베이스 연결 및 서버 시작
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
    console.log(`Swagger 문서는 http://localhost:${PORT}/api-docs 에서 확인할 수 있습니다.`);
  });
});
