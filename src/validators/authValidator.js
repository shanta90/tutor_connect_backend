import { body } from 'express-validator';

/**
 * Validation rules for user registration request body.
 * Enforces email validation, non-empty names, and robust password validation
 * (min 6 characters, at least 1 uppercase and 1 lowercase letter).
 */
export const registerValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter'),
];

/**
 * Validation rules for user login request body.
 */
export const loginValidator = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];
