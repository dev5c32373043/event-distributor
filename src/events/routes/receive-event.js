import { processEvent } from '../services/event-distributor/index.js';
import { logger, to } from '#utils';
import { EventSchema } from '#validators';

export async function receiveEvent(req, res) {
  const result = EventSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ issues: result.error.issues });
    return;
  }

  const [err, execResult] = await to(processEvent(result.data));
  if (err) {
    logger.error(err);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }

  res.json(execResult);
}
