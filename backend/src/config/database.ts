import 'dotenv/config'; // <-- ESTO DEBE IR PRIMERO QUE TODO
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

// URL configurada con los datos de tu pgAdmin:
const CONNECTION_STRING = 'postgresql://postgres:admin@localhost:5432/gestor_de_gastos?schema=public';

// Línea de prueba temporal para verificar el funcionamiento:
console.log('URL de base de datos cargada:', CONNECTION_STRING ? '¡SÍ!' : '¡NO, ESTÁ VACÍA!');

const pool = new pg.Pool({
  connectionString: CONNECTION_STRING,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default prisma;