// src/controllers/IncomeController.js
import incomeService from '../services/IncomeService.js';
import { response } from '../config/response.js';
import { status } from '../config/status.js';

class IncomeController {
  /**
   * 새로운 수입을 생성합니다.
   * @param {Object} req - Express 요청 객체
   * @param {Object} res - Express 응답 객체
   */
  async createIncome(req, res) {
    try {
      const { amount, source, date } = req.body;
      
      if (amount == null || date == null) {
        return res.status(status.BAD_REQUEST.status).json(response(status.BAD_REQUEST, null));
      }

      const newIncome = await incomeService.createIncome({ amount, source, date });
      return res.status(status.CREATED.status).json(response(status.CREATED, newIncome));
    } catch (error) {
      console.error("createIncome Error:", error);
      return res.status(status.INTERNAL_SERVER_ERROR.status).json(response(status.INTERNAL_SERVER_ERROR, null));
    }
  }

  /**
   * 모든 수입을 조회합니다.
   * @param {Object} req - Express 요청 객체
   * @param {Object} res - Express 응답 객체
   */
  async getIncomes(req, res) {
    try {
      const incomes = await incomeService.getIncomes();
      return res.status(status.SUCCESS.status).json(response(status.SUCCESS, incomes));
    } catch (error) {
      console.error("getIncomes Error:", error);
      return res.status(status.INTERNAL_SERVER_ERROR.status).json(response(status.INTERNAL_SERVER_ERROR, null));
    }
  }

  /**
   * 특정 수입을 ID로 조회합니다.
   * @param {Object} req - Express 요청 객체
   * @param {Object} res - Express 응답 객체
   */
  async getIncomeById(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const income = await incomeService.getIncomeById(id);
      if (!income) {
        return res.status(status.NOT_FOUND.status).json(response(status.NOT_FOUND, null));
      }
      return res.status(status.SUCCESS.status).json(response(status.SUCCESS, income));
    } catch (error) {
      console.error("getIncomeById Error:", error);
      return res.status(status.INTERNAL_SERVER_ERROR.status).json(response(status.INTERNAL_SERVER_ERROR, null));
    }
  }

  /**
   * 특정 수입을 수정합니다.
   * @param {Object} req - Express 요청 객체
   * @param {Object} res - Express 응답 객체
   */
  async updateIncome(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const updatedIncome = await incomeService.updateIncome(id, req.body);
      if (!updatedIncome) {
        return res.status(status.NOT_FOUND.status).json(response(status.NOT_FOUND, null));
      }
      return res.status(status.SUCCESS.status).json(response(status.SUCCESS, updatedIncome));
    } catch (error) {
      console.error("updateIncome Error:", error);
      if (error.name === 'ValidationError') {
        return res.status(status.VALIDATION_ERROR.status).json(response(status.VALIDATION_ERROR, null));
      }
      return res.status(status.INTERNAL_SERVER_ERROR.status).json(response(status.INTERNAL_SERVER_ERROR, null));
    }
  }

  /**
   * 특정 수입을 삭제합니다.
   * @param {Object} req - Express 요청 객체
   * @param {Object} res - Express 응답 객체
   */
  async deleteIncome(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const deletedIncome = await incomeService.deleteIncome(id);
      if (!deletedIncome) {
        return res.status(status.NOT_FOUND.status).json(response(status.NOT_FOUND, null));
      }
      return res.status(status.SUCCESS.status).json(response(status.SUCCESS, { message: "수입이 삭제되었습니다." }));
    } catch (error) {
      console.error("deleteIncome Error:", error);
      return res.status(status.INTERNAL_SERVER_ERROR.status).json(response(status.INTERNAL_SERVER_ERROR, null));
    }
  }

  /**
   * 총 수입을 조회합니다.
   * @param {Object} req - Express 요청 객체
   * @param {Object} res - Express 응답 객체
   */
  async getTotalIncome(req, res) {
    try {
      const total = await incomeService.getTotalIncome();
      return res.status(status.SUCCESS.status).json(response(status.SUCCESS, { totalIncome: total }));
    } catch (error) {
      console.error("getTotalIncome Error:", error);
      return res.status(status.INTERNAL_SERVER_ERROR.status).json(response(status.INTERNAL_SERVER_ERROR, null));
    }
  }
}

export default new IncomeController();