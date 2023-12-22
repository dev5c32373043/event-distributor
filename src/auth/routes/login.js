import { logIn } from '../services/auth.js';
import { logger, to } from '#utils';

export default async function login({ userCredentials }, res) {
  const [err, authResult] = await to(logIn(userCredentials));
  if (err) {
    if (err.cause?.status === 400) {
      res.status(400).json({ message: err.message });
    } else {
      logger.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }

    return;
  }

  res.json(authResult);
}
