import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId =
  (idName = 'id') =>
  (req, res, next) => {
    const { Id } = req.params[idName];
    if (!isValidObjectId(Id)) {
      throw createHttpError(400, 'Invalid contact ID');
    }
    next();
  };
