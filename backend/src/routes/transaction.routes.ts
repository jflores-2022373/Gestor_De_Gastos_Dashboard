import { Router } from 'express';
import { getTransactions, createTransaction } from '../controllers/transaction.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

// Todas estas rutas requerirán que el usuario haya iniciado sesión (Token válido)
router.get('/', verifyToken, getTransactions);
router.post('/', verifyToken, createTransaction);

export default router;