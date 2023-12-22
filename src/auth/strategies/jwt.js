import { ExtractJwt, Strategy } from 'passport-jwt';

import { JWT_SECRET } from '#conf';
import { db } from '#db';

export default function JwtStrategy() {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
  };

  return new Strategy(options, async ({ sub, email }, next) => {
    const user = await db.User.exists({ _id: sub });
    if (!user) return next(null, false);

    return next(null, { ...user, email });
  });
}
