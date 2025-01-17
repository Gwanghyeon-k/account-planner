// src/routes/incomeRoutes.js
import express from 'express';
import incomeController from '../controllers/IncomeController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Incomes
 *   description: 수입 관련 API
 */

/**
 * @swagger
 * /incomes:
 *   post:
 *     summary: 수입 등록
 *     tags: [Incomes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - source
 *             properties:
 *               amount:
 *                 type: number
 *               source:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: 수입이 생성되었습니다.
 *       400:
 *         description: 잘못된 요청
 */
router.post('/', incomeController.createIncome);

/**
 * @swagger
 * /incomes:
 *   get:
 *     summary: 모든 수입 조회
 *     tags: [Incomes]
 *     responses:
 *       200:
 *         description: 수입 목록을 반환합니다.
 *       500:
 *         description: 서버 에러
 */
router.get('/', incomeController.getIncomes);

/**
 * @swagger
 * /incomes/{id}:
 *   get:
 *     summary: 수입 상세 조회
 *     tags: [Incomes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 수입 ID
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: 수입 정보를 반환합니다.
 *       404:
 *         description: 수입을 찾을 수 없습니다.
 */
router.get('/:id', incomeController.getIncomeById);

/**
 * @swagger
 * /incomes/{id}:
 *   put:
 *     summary: 수입 수정
 *     tags: [Incomes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 수입 ID
 *         schema:
 *           type: number
 *     requestBody:
 *       description: 수정할 수입 정보
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               source:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: 수입이 수정되었습니다.
 *       400:
 *         description: 잘못된 요청
 *       404:
 *         description: 수입을 찾을 수 없습니다.
 */
router.put('/:id', incomeController.updateIncome);

/**
 * @swagger
 * /incomes/{id}:
 *   delete:
 *     summary: 수입 삭제
 *     tags: [Incomes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 수입 ID
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: 수입이 삭제되었습니다.
 *       404:
 *         description: 수입을 찾을 수 없습니다.
 */
router.delete('/:id', incomeController.deleteIncome);

export default router;
