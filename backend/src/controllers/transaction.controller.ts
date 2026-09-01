import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import prisma from '../config/database';

export const getTransactions = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;
    const transactions = await prisma.transaction.findMany({
      where: { userId }
    });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener transacciones', error });
  }
};

export const createTransaction = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;
    const { title, amount, type, category } = req.body;

    const newTransaction = await prisma.transaction.create({
      data: {
        title,
        amount: parseFloat(amount),
        type,
        category,
        userId
      }
    });

    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la transacción', error });
  }
};

export const deleteTransaction = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    
    await prisma.transaction.delete({
      where: { id }
    });

    res.status(200).json({ message: 'Transacción eliminada correctamente' });
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'La transacción ya no existe en la base de datos' });
      return;
    }

    console.error('Error detallado al eliminar:', error);
    res.status(500).json({ message: 'Error al eliminar la transacción', error });
  }
};