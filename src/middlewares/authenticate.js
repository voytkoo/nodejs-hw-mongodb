import createHttpError from 'http-errors';
import { findSessionByToken, findUserById } from '../services/auth.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return next(createHttpError(401, 'Auth header is required!'));
  }
  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return next(createHttpError(401, 'Auth must be of type bearer!'));
  }

  const session = await findSessionByToken(token);
  if (!session) {
    return next(
      createHttpError(401, 'Auth token is not associated with any session!'),
    );
  }
  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpired) {
    return next(createHttpError(401, 'Auth token is expired!'));
  }

  const user = findUserById(session.userId);

  if (!user) {
    return next(createHttpError(401, 'No user is associated with this!'));
  }

  req.user = user;
  next();
};
