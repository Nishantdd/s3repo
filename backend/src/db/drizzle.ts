import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';
import { schema } from './schema.js';

config({ path: '.env' });

export const db = drizzle({ connection: process.env.DATABASE_URL!, schema: schema });
