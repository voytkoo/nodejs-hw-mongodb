import {
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
} from '../services/auth';
import { serializeUser } from '../utils/serializeUser';

const setupSectionCookies = (session, res) => {};

export const registerUserController = async (req, res) => {
  const { body } = req;
  const user = await registerUser(body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: serializeUser(user),
  });
};
export const loginUserController = async (req, res) => {
  const { body } = req;
  const session = await loginUser(body);

  setupSectionCookies(session, res);

  res.json({
    status: 200,
    message: 'Successfully logged in a user!',
    data: { accessToken: session.accessToken },
  });
};

export const logoutUserController = async (req, res, next) => {
  await logoutUser(req.cookies.sessionId, req.cookies.sessionToken);
  res.clearCookie('sessionId');
  res.clearCookie('sessionToken');

  res.status(204).send();
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshSession(
    req.cookies.sessionId,
    req.cookies.sessionToken,
  );

  setupSectionCookies(session, res);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: session.accessToken },
  });
};
