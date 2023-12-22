import { UserCredentialsSchema } from '#validators';

export function checkCredentials(req, res, next) {
  const result = UserCredentialsSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ message: 'Please check your email and password' });
    return;
  }

  req.userCredentials = result.data;

  next();
}
