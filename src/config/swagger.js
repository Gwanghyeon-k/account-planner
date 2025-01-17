// src/config/swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';

// 현재 파일의 디렉토리 경로를 가져오기 위한 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '가계부 API',
      version: '1.0.0',
      description: '수입 및 소비 관리를 위한 가계부 API',
    },
    servers: [
      {
        url: 'http://localhost:3000/api', // 실제 서버 URL로 변경하세요
      },
    ],
  },
  // 라우트 파일의 절대 경로를 지정
  apis: [path.join(__dirname, '../routes/*.js')],
};

const specs = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

export default setupSwagger;
