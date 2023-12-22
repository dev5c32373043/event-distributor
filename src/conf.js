export const HOST = process.env.HOST ?? 'http://localhost:3000';
export const PORT = parseInt(process.env.PORT, 10) || 3000;

export const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/dev';
export const LOGGER_LEVEL = process.env.LOGGER_LEVEL ?? 'info';

export const JWT_SECRET = process.env.JWT_SECRET ?? 'youllneverguess';
export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10) || 9;

export const CUSTOM_EXECUTOR_URL = process.env.CUSTOM_EXECUTOR_URL;
export const CUSTOM_EXECUTOR_TOKEN = process.env.CUSTOM_EXECUTOR_TOKEN;
