import { config } from 'dotenv';

config();



if (!process.env.MISTRAL_API_KEY) {

    throw new Error('MISTRAL_API_KEY is not defined in environment variables');
    process.exit(1);
}

export default {
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY
}