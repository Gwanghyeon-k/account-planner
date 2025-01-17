// src/services/ReportService.js
import incomeService from './IncomeService.js';
import expenseService from './ExpenseService.js';

class ReportService {
  /**
   * 총 잔액을 계산합니다.
   * @returns {Promise<Object>} - { totalIncome, totalExpense, balance }
   */
  async getBalance() {
    const totalIncome = await incomeService.getTotalIncome();
    const totalExpense = await expenseService.getTotalExpense();
    const balance = totalIncome - totalExpense;

    return { totalIncome, totalExpense, balance };
  }
}

export default new ReportService();
