import ApiError from '../errors/ApiError.js';
import { verifyToken } from '../utils/token.js';
import User from '../models/User.js';

/**
 * Protect middleware: Verifies JWT token stored in HTTP-only cookies.
 * Attaches the authenticated user details (excluding password) to the request object.
 */
export const protect = async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new ApiError(401, 'Not authorized to access this route'));
  }

  try {
    const decoded = verifyToken(token);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return next(new ApiError(401, 'The user belonging to this token no longer exists. Please log in again.'));
    }
    next();
  } catch (err) {
    return next(new ApiError(401, 'Not authorized to access this route'));
  }
};
