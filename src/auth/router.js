import { Router } from 'express';

import login from './routes/login.js';
import signUp from './routes/signup.js';
import { checkCredentials } from './middleware/check-credentials.js';

const authRouter = Router();

authRouter.post('/login', checkCredentials, login);
authRouter.post('/signup', checkCredentials, signUp);

export default authRouter;
