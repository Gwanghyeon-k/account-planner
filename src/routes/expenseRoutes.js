// src/routes/expenseRoutes.js
import express from 'express';
import expenseController from '../controllers/ExpenseController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Expenses
 *   description: 소비 관련 API
 */

/**
 * @swagger
 * /expenses:
 *   post:
 *     summary: 소비 등록
 *     tags: [Expenses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - category
 *             properties:
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: 소비가 생성되었습니다.
 *       400:
 *         description: 잘못된 요청
 */
router.post('/', expenseController.createExpense);

/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: 모든 소비 조회
 *     tags: [Expenses]
 *     responses:
 *       200:
 *         description: 소비 목록을 반환합니다.
 *       500:
 *         description: 서버 에러
 */
router.get('/', expenseController.getExpenses);

/**
 * @swagger
 * /expenses/{id}:
 *   get:
 *     summary: 소비 상세 조회
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 소비 ID
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: 소비 정보를 반환합니다.
 *       404:
 *         description: 소비를 찾을 수 없습니다.
 */
router.get('/:id', expenseController.getExpenseById);

/**
 * @swagger
 * /expenses/{id}:
 *   put:
 *     summary: 소비 수정
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 소비 ID
 *         schema:
 *           type: number
 *     requestBody:
 *       description: 수정할 소비 정보
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: 소비가 수정되었습니다.
 *       400:
 *         description: 잘못된 요청
 *       404:
 *         description: 소비를 찾을 수 없습니다.
 */
router.put('/:id', expenseController.updateExpense);

/**
 * @swagger
 * /expenses/{id}:
 *   delete:
 *     summary: 소비 삭제
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 소비 ID
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: 소비가 삭제되었습니다.
 *       404:
 *         description: 소비를 찾을 수 없습니다.
 */
router.delete('/:id', expenseController.deleteExpense);

export default router;
