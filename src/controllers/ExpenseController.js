// src/controllers/ExpenseController.js
import expenseService from '../services/ExpenseService.js';
import { response } from '../config/response.js';
import { status } from '../config/status.js';

class ExpenseController {
  /**
   * 새로운 소비를 생성합니다.
   * @param {Object} req - Express 요청 객체
   * @param {Object} res - Express 응답 객체
   */
  async createExpense(req, res) {
    try {
      const { amount, category, date } = req.body;

      // 필수 필드 검증 (amount와 date는 필수)
      if (amount == null || date == null) {
        return res.status(status.BAD_REQUEST.status).json(response(status.BAD_REQUEST, null));
      }

      const newExpense = await expenseService.createExpense({ amount, category, date });
      return res.status(status.CREATED.status).json(response(status.CREATED, newExpense));
    } catch (error) {
      console.error("createExpense Error:", error);
      return res.status(status.INTERNAL_SERVER_ERROR.status).json(response(status.INTERNAL_SERVER_ERROR, null));
    }
  }

  /**
   * 모든 소비를 조회합니다.
   * @param {Object} req - Express 요청 객체
   * @param {Object} res - Express 응답 객체
   */
  async getExpenses(req, res) {
    try {
      const expenses = await expenseService.getExpenses();
      return res.status(status.SUCCESS.status).json(response(status.SUCCESS, expenses));
    } catch (error) {
      console.error("getExpenses Error:", error);
      return res.status(status.INTERNAL_SERVER_ERROR.status).json(response(status.INTERNAL_SERVER_ERROR, null));
    }
  }

  /**
   * 특정 소비를 ID로 조회합니다.
   * @param {Object} req - Express 요청 객체
   * @param {Object} res - Express 응답 객체
   */
  async getExpenseById(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const expense = await expenseService.getExpenseById(id);
      if (!expense) {
        return res.status(status.NOT_FOUND.status).json(response(status.NOT_FOUND, null));
      }
      return res.status(status.SUCCESS.status).json(response(status.SUCCESS, expense));
    } catch (error) {
      console.error("getExpenseById Error:", error);
      return res.status(status.INTERNAL_SERVER_ERROR.status).json(response(status.INTERNAL_SERVER_ERROR, null));
    }
  }

  /**
   * 특정 소비를 수정합니다.
   * @param {Object} req - Express 요청 객체
   * @param {Object} res - Express 응답 객체
   */
  async updateExpense(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const updatedExpense = await expenseService.updateExpense(id, req.body);
      if (!updatedExpense) {
        return res.status(status.NOT_FOUND.status).json(response(status.NOT_FOUND, null));
      }
      return res.status(status.SUCCESS.status).json(response(status.SUCCESS, updatedExpense));
    } catch (error) {
      console.error("updateExpense Error:", error);
      if (error.name === 'ValidationError') {
        return res.status(status.VALIDATION_ERROR.status).json(response(status.VALIDATION_ERROR, null));
      }
      return res.status(status.INTERNAL_SERVER_ERROR.status).json(response(status.INTERNAL_SERVER_ERROR, null));
    }
  }

  /**
   * 특정 소비를 삭제합니다.
   * @param {Object} req - Express 요청 객체
   * @param {Object} res - Express 응답 객체
   */
  async deleteExpense(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const deletedExpense = await expenseService.deleteExpense(id);
      if (!deletedExpense) {
        return res.status(status.NOT_FOUND.status).json(response(status.NOT_FOUND, null));
      }
      return res.status(status.SUCCESS.status).json(response(status.SUCCESS, { message: "소비가 삭제되었습니다." }));
    } catch (error) {
      console.error("deleteExpense Error:", error);
      return res.status(status.INTERNAL_SERVER_ERROR.status).json(response(status.INTERNAL_SERVER_ERROR, null));
    }
  }

  /**
   * 총 소비를 조회합니다.
   * @param {Object} req - Express 요청 객체
   * @param {Object} res - Express 응답 객체
   */
  async getTotalExpense(req, res) {
    try {
      const total = await expenseService.getTotalExpense();
      return res.status(status.SUCCESS.status).json(response(status.SUCCESS, { totalExpense: total }));
    } catch (error) {
      console.error("getTotalExpense Error:", error);
      return res.status(status.INTERNAL_SERVER_ERROR.status).json(response(status.INTERNAL_SERVER_ERROR, null));
    }
  }
}

export default new ExpenseController();
