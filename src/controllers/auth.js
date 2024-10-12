import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import {
  createSession,
  deleteSession,
  findSessionById,
  findUserByEmail,
  logoutUser,
  registerUser,
} from '../services/auth.js';
import { setupSectionCookies } from '../utils/setUpSessionCookies.js';

export const registerUserController = async (req, res) => {
  const { name, email } = req.body;
  const user = await findUserByEmail(email);

  if (user) throw createHttpError(409, 'Email in use');
  await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: { name, email },
  });
};

export const loginUserController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);

  if (!user) {
    throw createHttpError(400, 'Wrong credentials');
  }

  const isEqualPassword = await bcrypt.compare(
    req.body.password,
    user.password,
  );

  if (!isEqualPassword) throw createHttpError(401, 'Wrong credentials');

  const session = await createSession(user._id);

  setupSectionCookies(session, res);

  res.json({
    status: 200,
    message: 'Successfully logged in a user !',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res, next) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');
  res.status(204).send();
};

export const refreshUserSessionController = async (req, res) => {
  const sessionId = req.cookies.sessionId;
  const refreshToken = req.cookies.refreshToken;

  const session = findSessionById(sessionId, refreshToken);

  if (!session) throw createHttpError(401, 'Session not found');

  const now = new Date(Date.now());

  if (session.refreshTokenValidUntil < now) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = await createSession(session.userId);
  setupSectionCookies(newSession, res);
  await deleteSession(sessionId);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: newSession.accessToken },
  });
};
