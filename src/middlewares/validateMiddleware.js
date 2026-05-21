import { validationResult } from 'express-validator';
import ApiError from '../errors/ApiError.js';

/**
 * Validation aggregator middleware.
 * Checks for express-validator errors and returns the first error message.
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ApiError(400, errors.array()[0].msg));
  }
  next();
};
