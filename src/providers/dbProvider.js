// src/providers/dbProvider.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB에 성공적으로 연결되었습니다.");
  } catch (error) {
    console.error("MongoDB 연결 오류:", error);
    process.exit(1); // 연결 실패 시 서버 종료
  }
};

export default connectDB;
