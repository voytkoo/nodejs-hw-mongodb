import { User } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import { Session } from '../db/models/session.js';
import {
  ACCESS_TOKEN_LIVE_TIME,
  REFRESH_TOKEN_LIVE_TIME,
} from '../constants/time.js';

export const registerUser = async (userData) => {
  const password = await bcrypt.hash(userData.password, 10);
  return await User.create({
    ...userData,
    password,
  });
};
export const findUserByEmail = (email) => User.findOne({ email });
export const findUserById = (userId) => User.findById(userId);

export const createSession = async (userId) => {
  await Session.deleteOne({ userId: userId._id });

  const accessToken = crypto.randomBytes(30).toString('base64');
  const refreshToken = crypto.randomBytes(30).toString('base64');
  const accessTokenValidUntil = new Date(Date.now() + ACCESS_TOKEN_LIVE_TIME);
  const refreshTokenValidUntil = new Date(Date.now() + REFRESH_TOKEN_LIVE_TIME);
  return Session.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });
};

export const deleteSession = (sessionId) =>
  Session.deleteOne({ _id: sessionId });

export const findSessionById = (sessionId, refreshToken) => {
  Session.findOne({ _id: sessionId, refreshToken });
};

export const findSessionByToken = (token) =>
  Session.findOne({
    accessToken: token,
  });
