// src/services/IncomeService.js
import Income from '../models/Income.js';
import { CreateIncomeDTO, UpdateIncomeDTO } from '../dtos/IncomeDTO.js';
import getNextSequence from '../utils/getNextSequence.js';

class IncomeService {
  /**
   * 새로운 수입을 생성합니다.
   * @param {Object} data - 수입 데이터
   * @returns {Promise<Income>} - 생성된 수입 문서
   */
  async createIncome(data) {
    const incomeDTO = new CreateIncomeDTO(data);
    const nextId = await getNextSequence('incomes'); // 'incomes' 카운터에서 다음 시퀀스 값 가져오기
    const income = new Income({ ...incomeDTO, id: nextId });
    return await income.save();
  }

  /**
   * 모든 수입을 조회합니다.
   * @returns {Promise<Array<Income>>} - 수입 목록
   */
  async getIncomes() {
    return await Income.find().sort({ date: -1 });
  }

  /**
   * 특정 수입을 ID로 조회합니다.
   * @param {number} id - 수입 ID
   * @returns {Promise<Income|null>} - 수입 문서 또는 null
   */
  async getIncomeById(id) {
    return await Income.findOne({ id });
  }

  /**
   * 특정 수입을 수정합니다.
   * @param {number} id - 수입 ID
   * @param {Object} data - 수정할 데이터
   * @returns {Promise<Income|null>} - 수정된 수입 문서 또는 null
   */
  async updateIncome(id, data) {
    const incomeDTO = new UpdateIncomeDTO(data);
    return await Income.findOneAndUpdate({ id }, incomeDTO, { new: true, runValidators: true });
  }

  /**
   * 특정 수입을 삭제합니다.
   * @param {number} id - 수입 ID
   * @returns {Promise<Income|null>} - 삭제된 수입 문서 또는 null
   */
  async deleteIncome(id) {
    return await Income.findOneAndDelete({ id });
  }

  /**
   * 총 수입을 조회합니다.
   * @returns {Promise<number>} - 총 수입
   */
  async getTotalIncome() {
    const result = await Income.aggregate([
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

export default new IncomeService();
