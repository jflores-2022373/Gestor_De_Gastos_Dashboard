import 'dotenv/config'; // <-- ESTO DEBE IR PRIMERO QUE TODO
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

// Línea de prueba temporal para ver si lee la URL en la terminal:
console.log('URL de base de datos cargada:', process.env.DATABASE_URL ? '¡SÍ!' : '¡NO, ESTÁ VACÍA!');

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default prisma;