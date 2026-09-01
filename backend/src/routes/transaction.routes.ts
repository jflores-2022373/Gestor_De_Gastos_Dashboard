import { Router } from 'express';
import { getTransactions, createTransaction, deleteTransaction } from '../controllers/transaction.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', verifyToken, getTransactions);
router.post('/', verifyToken, createTransaction);
router.delete('/:id', verifyToken, deleteTransaction);

export default router;