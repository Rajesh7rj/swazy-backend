import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.string().default('3000').transform((val) => parseInt(val, 10)),
    CORS_ORIGIN: z.string().default('*'),
    // Add other env vars here as needed from the guide
    // DATABASE_URL: z.string(), 
    // JWT_SECRET: z.string(),
});

const envVars = envSchema.safeParse(process.env);

if (!envVars.success) {
    console.error('❌ Invalid environment variables:', envVars.error.format());
    process.exit(1);
}

export const config = {
    env: envVars.data.NODE_ENV,
    port: envVars.data.PORT,
    corsOrigin: envVars.data.CORS_ORIGIN,
};
