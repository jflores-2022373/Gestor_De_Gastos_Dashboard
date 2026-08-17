import { Pool } from 'pg';

// Configuración de PostgreSQL (puedes cambiar los datos según tu entorno)
export const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'spendwise',
  password: process.env.DB_PASSWORD || 'postgres',
  port: Number(process.env.DB_PORT) || 5432,
});

export const connectDB = async () => {
  try {
    await pool.query('SELECT NOW()');
    console.log('Base de datos PostgreSQL conectada con éxito');
  } catch (error) {
    console.log('Aviso: PostgreSQL no está activo, operando en modo simulación de memoria.');
  }
};