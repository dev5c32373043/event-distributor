import { z as t } from 'zod';

export const UserCredentialsSchema = t.object({
  email: t.string().email(),
  password: t.string().min(8)
});
