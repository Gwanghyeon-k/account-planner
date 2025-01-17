// src/models/Expense.js
import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true }, // 순차적인 숫자 ID
    amount: { type: Number, required: true },
    category: { type: String, required: false, default: null }, // 'source' 대신 'category' 사용
    date: { type: Date, default: Date.now },
  },
  { 
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;
