import mongoose from 'mongoose';
import { logger } from '#utils';
import { MONGO_URI } from '#conf';

export const initDBConnection = async () => {
  await mongoose.connect(MONGO_URI);

  mongoose.connection.on('connected', () => logger.info('MongoDB connection established'));
  mongoose.connection.on('disconnected', () => logger.info('MongoDB connection closed'));
  mongoose.connection.on('error', err => logger.error(err));
};

export * as db from './models/index.js';
