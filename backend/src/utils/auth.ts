import { betterAuth, BetterAuthOptions } from 'better-auth';
import { customSession } from 'better-auth/plugins';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '../db/drizzle.js';
import { schema } from '../db/schema.js';
import { config } from './config.js';

export const auth = betterAuth({
    baseURL: config.BETTER_AUTH_URL,
    secret: config.BETTER_AUTH_SECRET,
    trustedOrigins: [config.CLIENT_ORIGIN],
    advanced: {
        useSecureCookies: config.NODE_ENV === 'production',
        defaultCookieAttributes: {
            secure: config.NODE_ENV === 'production',
            partitioned: config.NODE_ENV === 'production',
            sameSite: config.NODE_ENV === 'production' ? 'None' : 'Lax'
        }
    },
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
            const cloudfrontDomainUrl = fullUser?.cloudfrontDomainUrl || '';

            return {
                user: {
                    ...user,
                    accessKey,
                    decryptedSecretAccessKey,
                    bucketName,
                    bucketRegion,
                    cloudfrontDomainUrl
                },
                session
            };
        })
    ]
});
