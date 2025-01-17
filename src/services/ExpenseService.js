// src/services/ExpenseService.js
import Expense from '../models/Expense.js';
import { CreateExpenseDTO, UpdateExpenseDTO } from '../dtos/ExpenseDTO.js';
import getNextSequence from '../utils/getNextSequence.js';

class ExpenseService {
  /**
   * 새로운 소비를 생성합니다.
   * @param {Object} data - 소비 데이터
   * @returns {Promise<Expense>} - 생성된 소비 문서
   */
  async createExpense(data) {
    const expenseDTO = new CreateExpenseDTO(data);
    const nextId = await getNextSequence('expenses'); // 'expenses' 카운터에서 다음 시퀀스 값 가져오기
    const expense = new Expense({ ...expenseDTO, id: nextId });
    return await expense.save();
  }

  /**
   * 모든 소비를 조회합니다.
   * @returns {Promise<Array<Expense>>} - 소비 목록
   */
  async getExpenses() {
    return await Expense.find().sort({ date: -1 });
  }

  /**
   * 특정 소비를 ID로 조회합니다.
   * @param {number} id - 소비 ID
   * @returns {Promise<Expense|null>} - 소비 문서 또는 null
   */
  async getExpenseById(id) {
    return await Expense.findOne({ id });
  }

  /**
   * 특정 소비를 수정합니다.
   * @param {number} id - 소비 ID
   * @param {Object} data - 수정할 데이터
   * @returns {Promise<Expense|null>} - 수정된 소비 문서 또는 null
   */
  async updateExpense(id, data) {
    const expenseDTO = new UpdateExpenseDTO(data);
    return await Expense.findOneAndUpdate({ id }, expenseDTO, { new: true, runValidators: true });
  }

  /**
   * 특정 소비를 삭제합니다.
   * @param {number} id - 소비 ID
   * @returns {Promise<Expense|null>} - 삭제된 소비 문서 또는 null
   */
  async deleteExpense(id) {
    return await Expense.findOneAndDelete({ id });
  }

  /**
   * 총 소비를 조회합니다.
   * @returns {Promise<number>} - 총 소비
   */
  async getTotalExpense() {
    const result = await Expense.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
        },
      },
    ]);
    return result[0] ? result[0].total : 0;
  }
}

export default new ExpenseService();
