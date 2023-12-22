import { Router } from 'express';

import * as routes from './routes/index.js';

const eventsRouter = Router();

eventsRouter.post('/', routes.receiveEvent);

export default eventsRouter;
