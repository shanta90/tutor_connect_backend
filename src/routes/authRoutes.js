import express from 'express';
import * as authController from '../controllers/authController.js';
import { registerValidator, loginValidator } from '../validators/authValidator.js';
import { validate } from '../middlewares/validateMiddleware.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerValidator, validate, authController.register);
router.post('/login', loginValidator, validate, authController.login);
router.post('/logout', authController.logout);
router.post('/google', authController.googleLogin);
router.get('/me', protect, authController.getMe);

export default router;
