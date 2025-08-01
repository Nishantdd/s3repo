import { drizzle } from 'drizzle-orm/neon-http';
import { schema } from './schema.js';
import { config } from '../utils/config.js';

export const db = drizzle({ connection: config.DATABASE_URL, schema: schema });
