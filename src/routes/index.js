import express from 'express';
import incomeRoutes from './incomeRoutes.js';
import expenseRoutes from './expenseRoutes.js';
import reportRoutes from './reportRoutes.js';

const router = express.Router();

router.use('/incomes', incomeRoutes);
router.use('/expenses', expenseRoutes);
router.use('/reports', reportRoutes);

export default router;
