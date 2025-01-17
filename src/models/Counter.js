// src/models/Counter.js
import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // 카운터의 이름 (e.g., 'incomes', 'expenses')
  sequence_value: { type: Number, default: 0 }, // 현재 시퀀스 값
});

const Counter = mongoose.model('Counter', counterSchema);
export default Counter;
