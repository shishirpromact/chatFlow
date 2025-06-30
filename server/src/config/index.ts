/**
 * Node modules
 */
import dotenv from 'dotenv';

dotenv.config();

const config = {
    PORT: process.env.PORT,
    JWT_KEY: process.env.JWT_KEY,
    ORIGIN: process.env.ORIGIN,
    DATABASE_URL: process.env.DATABASE_URL,
}

export default config;

