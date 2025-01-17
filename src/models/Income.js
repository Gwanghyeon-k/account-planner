import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    amount: { type: Number, required: true },
    source: { type: String, required: false, default: null},
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

const Income = mongoose.model('Income', incomeSchema);
export default Income;
