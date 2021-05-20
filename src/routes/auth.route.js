import express from 'express';

import { authController } from '../controllers/index';
import auth from '../middlewares/auth';
import validate from '../middlewares/validate';
import { authValidation } from '../validations/index';

const {
  registerValidate,
  loginValidate,
  forgotPasswordValidate,
  resetPasswordValidate,
  verifyEmailValidate
} = authValidation;

const {
  register,
  login,
  forgotPassword,
  resetPassword,
  verifyEmail,
  sendVerificationEmail
} = authController;

const router = express.Router();

router.post('/register', validate(registerValidate), register);
router.post('/login', validate(loginValidate), login);
router.post(
  '/forgot-password',
  validate(forgotPasswordValidate),
  forgotPassword
);
router.post('/reset-password', validate(resetPasswordValidate), resetPassword);
router.post('/send-verification-email', auth('user'), sendVerificationEmail);
router.post(
  '/verify-email',
  auth('user'),
  validate(verifyEmailValidate),
  verifyEmail
);

export default router;
