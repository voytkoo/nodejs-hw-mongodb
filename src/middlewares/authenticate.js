import createHttpError from 'http-errors';
import { Session } from '../db/models/Session.js';
import { User } from '../db/models/User.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return next(createHttpError(401, 'Auth header is required!'));
  }
  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return next(createHttpError(401, 'Auth must be of type bearer!'));
  }

  const session = await Session.findOne({ accessToken: token });
  if (!session) {
    return next(
      createHttpError(401, 'Auth token is not associated with any session!'),
    );
  }
  if (session.accessTokenValidUntil < new Date()) {
    return next(createHttpError(401, 'Auth token is expired!'));
  }
  const user = await User.findById(session.userId);

  if (!user) {
    return next(createHttpError(401, 'No user is associated with this!'));
  }

  req.user = user;
  next();
};
