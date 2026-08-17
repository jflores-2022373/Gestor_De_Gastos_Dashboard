import { Request, Response } from 'express';

// Controlador de transacciones simulado (modo sin base de datos)
export const getTransactions = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json([
    { id: '1', title: 'Ejemplo Ingreso', amount: 1500, type: 'income', category: 'Sueldo' },
    { id: '2', title: 'Ejemplo Gasto', amount: 50, type: 'expense', category: 'Comida' }
  ]);
};

export const createTransaction = async (req: Request, res: Response): Promise<void> => {
  const { title, amount, type, category } = req.body;
  res.status(201).json({
    message: 'Transacción creada exitosamente (Simulado)',
    transaction: { id: Date.now().toString(), title, amount, type, category }
  });
};