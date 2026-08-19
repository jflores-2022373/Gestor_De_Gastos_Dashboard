import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import transactionRoutes from './routes/transaction.routes';

const app = express();

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});