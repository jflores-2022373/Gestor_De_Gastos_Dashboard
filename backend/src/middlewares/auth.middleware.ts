import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'FinanzasDashboard2026_Key!';

export interface AuthRequest extends Request {
  user?: any;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(403).json({ message: 'Token requerido' });
    return;
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      res.status(401).json({ message: 'Token inválido o expirado' });
      return;
    }
    req.user = user;
    next();
  });
};

export const verifyAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  verifyToken(req, res, () => {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Acceso denegado: Se requiere rol de administrador' });
    }
  });
};