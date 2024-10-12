import { REFRESH_TOKEN_LIVE_TIME } from '../constants/time';

export const setupSectionCookies = (session, res) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + REFRESH_TOKEN_LIVE_TIME),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + REFRESH_TOKEN_LIVE_TIME),
  });
};
