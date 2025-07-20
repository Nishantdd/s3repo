import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '../db/drizzle.js';
import { schema } from '../db/schema.js';

export const auth = betterAuth({
    trustedOrigins: ['http://localhost:3000'],
    emailAndPassword: {
        enabled: true
    },
    database: drizzleAdapter(db, {
        provider: 'pg',
        schema: schema
    })
});
