import { betterAuth, BetterAuthOptions } from 'better-auth';
import { customSession } from 'better-auth/plugins';
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
    }),
    plugins: [
        customSession(async ({ user, session }) => {
            const fullUser = await db.query.user.findFirst({
                where: (users, { eq }) => eq(users.id, user.id)
            });

            const decryptedSecretAccessKey = fullUser?.secretAccessKey || '';
            const accessKey = fullUser?.accessKey || '';
            const bucketName = fullUser?.bucketName || '';
            const bucketRegion = fullUser?.bucketRegion || '';

            return {
                user: {
                    ...user,
                    accessKey,
                    decryptedSecretAccessKey,
                    bucketName,
                    bucketRegion
                },
                session
            };
        })
    ]
});
