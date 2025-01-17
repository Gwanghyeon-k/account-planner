// routes/reportRoutes.js
import express from 'express';
import reportController from '../controllers/ReportController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: 수입 및 소비 통합 조회 및 총합 API
 */

/**
 * @swagger
 * /reports/combined:
 *   get:
 *     summary: 수입 및 소비 통합 조회
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: 수입과 소비를 통합하여 반환합니다.
 *       500:
 *         description: 서버 에러
 */
router.get('/combined', reportController.getCombinedRecords);

/**
 * @swagger
 * /reports/summary:
 *   get:
 *     summary: 수입 및 소비 총합 조회
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: 수입과 소비의 총합을 반환합니다.
 *       500:
 *         description: 서버 에러
 */
router.get('/summary', reportController.getTotalSummary);

/**
 * @swagger
 * /reports/balance:
 *   get:
 *     summary: 총 잔액 조회
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: 총 잔액 정보를 반환합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 code:
 *                   type: number
 *                 message:
 *                   type: string
 *                 result:
 *                   type: object
 *                   properties:
 *                     totalIncome:
 *                       type: number
 *                       description: 총 수입
 *                     totalExpense:
 *                       type: number
 *                       description: 총 소비
 *                     balance:
 *                       type: number
 *                       description: 잔액 (총 수입 - 총 소비)
 *       500:
 *         description: 서버 내부 오류
 */
router.get('/balance', reportController.getBalance);

export default router;
