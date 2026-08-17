import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (email === 'admin@jflores.com' && password === '123') {
    const token = jwt.sign({ id: '1', email, role: 'admin' }, process.env.JWT_SECRET || 'secreto', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login exitoso', token, role: 'admin' });
    return;
  }

  if (email === 'user@jflores.com' && password === '123') {
    const token = jwt.sign({ id: '2', email, role: 'user' }, process.env.JWT_SECRET || 'secreto', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login exitoso', token, role: 'user' });
    return;
  }

  res.status(401).json({ message: 'Credenciales inválidas' });
};

export const register = async (req: Request, res: Response): Promise<void> => {
  res.status(201).json({ message: 'Registro simulado exitoso' });
};