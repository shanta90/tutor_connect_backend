import asyncHandler from '../utils/asyncHandler.js';
import * as authService from '../services/authService.js';

const setTokenCookie = (res, token) => {
  const isProduction = process.env.NODE_ENV === 'production';
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

/**
 * Registers a new user, sets their auth cookie, and returns the user object.
 */
export const register = asyncHandler(async (req, res) => {
  const { user, token } = await authService.register(req.body);
  setTokenCookie(res, token);
  res.status(201).json({ status: 'success', data: user });
});

/**
 * Logins an existing user by checking credentials and setting cookie.
 */
export const login = asyncHandler(async (req, res) => {
  const { user, token } = await authService.login(req.body.email, req.body.password);
  setTokenCookie(res, token);
  res.status(200).json({ status: 'success', data: user });
});


export const logout = asyncHandler(async (req, res) => {
  const isProduction = process.env.NODE_ENV === 'production';
  res.cookie('jwt', '', { 
    httpOnly: true, 
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'strict',
    expires: new Date(0) 
  });
  res.status(200).json({ status: 'success', message: 'Logged out' });
});

export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({ status: 'success', data: req.user });
});

export const googleLogin = asyncHandler(async (req, res) => {
  const { user, token } = await authService.googleLogin(req.body);
  setTokenCookie(res, token);
  res.status(200).json({ status: 'success', data: user });
});
