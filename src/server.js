import express from 'express';
import helmet from 'helmet';
import pinoHttp from 'pino-http';

import { rateLimit } from 'express-rate-limit';

import passport from 'passport';
import JwtStrategy from './auth/strategies/jwt.js';

import authRouter from './auth/router.js';
import eventsRouter from './events/router.js';

import 'dotenv/config.js';

import { initDBConnection } from '#db';

import { PORT } from '#conf';
import { logger } from '#utils';

const app = express();

app.use(express.json({ limit: '1mb' }));

app.use(pinoHttp({ logger }));

app.use(helmet());

// TODO: add redis store
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: 100, // Limit each IP to 100 requests per `window`
  standardHeaders: 'draft-7',
  legacyHeaders: false // Disable the `X-RateLimit-*` headers.
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);

// Setup of passport
passport.use(JwtStrategy());
app.use(passport.initialize());

// Could be useful for health check
app.get('/api', (req, res) => res.sendStatus(200));

app.use('/api/auth', authRouter);

// Destination endpoints for test purposes only
app.get('/api/destination1', (req, res) => {
  res.sendStatus(200);
});

app.post('/api/destination2', (req, res) => {
  logger.info(req.body);
  res.sendStatus(200);
});

app.put('/api/destination3', (req, res) => {
  logger.info(req.body);
  res.sendStatus(200);
});

app.patch('/api/destination4', (req, res) => {
  logger.info(req.body);
  res.sendStatus(200);
});

app.delete('/api/destination5', (req, res) => {
  res.sendStatus(200);
});

app.use('/api/events', passport.authenticate('jwt', { session: false }), eventsRouter);

initDBConnection()
  .then(() => {
    const server = app.listen(PORT, () => {
      logger.info(`🚀 Server live on: http://localhost:${PORT}`);
    });

    server.on('error', logger.error.bind(logger));
  })
  .catch(logger.error.bind(logger));
