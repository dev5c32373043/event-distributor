import pino from 'pino';
import { LOGGER_LEVEL, MONGO_URI } from '../conf.js';

const transport = pino.transport({
  targets: [
    {
      level: LOGGER_LEVEL,
      target: 'pino-pretty'
    },
    {
      target: 'pino-mongodb',
      level: LOGGER_LEVEL,
      options: {
        uri: MONGO_URI,
        collection: 'logs'
      }
    }
  ]
});

export const logger = pino(transport);
