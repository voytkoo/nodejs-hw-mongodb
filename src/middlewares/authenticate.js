import createHttpError from 'http-errors';
import { Session } from '../db/models/session.js';
import { User } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    next(createHttpError(401, 'Auth header is required!'));
    return;
  }
  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Auth must be of type bearer!'));
    return;
  }

  const session = await Session.findOne({ accessToken: token });

  if (!session) {
    next(
      createHttpError(401, 'Auth token is not associated with any session!'),
    );
    return;
  }

  const accessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (accessTokenExpired) {
    next(createHttpError(401, 'Auth token is expired!'));
  }

  const user = await User.findById(session.userId);

  if (!user) {
    next(createHttpError(401, 'No user is associated with this!'));
    return;
  }

  req.user = user;

  next();
};
