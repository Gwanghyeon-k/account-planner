// controllers/ReportController.js
import incomeService from '../services/IncomeService.js';
import expenseService from '../services/ExpenseService.js';
import reportService from '../services/ReportService.js';
import { response } from '../config/response.js';
import { status } from '../config/status.js';

class ReportController {
  async getCombinedRecords(req, res) {
    try {
      const incomes = await incomeService.getIncomes();
      const expenses = await expenseService.getExpenses();
      res.json({ incomes, expenses });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getTotalSummary(req, res) {
    try {
      const totalIncome = await incomeService.getTotalIncome();
      const totalExpense = await expenseService.getTotalExpense();
      res.json({ totalIncome, totalExpense });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getBalance(req, res) {
    try {
      const balance = await reportService.getBalance();
      return res.status(status.SUCCESS.status).json(response(status.SUCCESS, balance));
    } catch (error) {
      console.error("getBalance Error:", error);
      return res.status(status.INTERNAL_SERVER_ERROR.status).json(response(status.INTERNAL_SERVER_ERROR, null));
    }
  }
}

export default new ReportController();
