import { config as dotenvConfig } from 'dotenv';
import * as v from 'valibot';

dotenvConfig({ path: '.env' });

const EnvSchema = v.object({
    BETTER_AUTH_SECRET: v.string(),
    BETTER_AUTH_URL: v.string(),
    DATABASE_URL: v.string(),
    CLOUDFRONT_DOMAIN_URL: v.string(),
    CLIENT_ORIGIN: v.string(),
    PORT: v.pipe(
        v.string(),
        v.transform(s => {
            const n = Number(s);
            if (isNaN(n)) throw new Error('PORT must be a number');
            return n;
        })
    )
});

const result = v.safeParse(EnvSchema, process.env);

if (!result.success) {
    console.error('Invalid or missing environment variables:', result.issues);
    process.exit(1);
}

export const config = result.output;
export type Config = v.InferOutput<typeof EnvSchema>;
