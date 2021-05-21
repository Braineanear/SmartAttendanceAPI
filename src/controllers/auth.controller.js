// Utils
import catchAsync from '../utils/catchAsync';

// Services
import {
  authService,
  userService,
  tokenService,
  emailService
} from '../services/index';

/**
 * Registeration
 * @param   {Object} req
 * @param   {Object} res
 * @returns {JSON}
 */
export const register = catchAsync(async (req, res) => {
  // 1) Create User
  const { type, message, statusCode, user } = await userService.createUser(
    req.body
  );

  // 2) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) Generate Tokens [Access Token / Refresh Token]
  const tokens = await tokenService.generateAuthTokens(user);

  // 4) Generate Verification Email Token
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(user);

  // 5) Sending Verification Email
  await emailService.sendVerificationEmail(user.email, verifyEmailToken);

  // 6) If Everything OK, Send User Data With Tokens
  return res.status(statusCode).json({
    type,
    message,
    user,
    tokens
  });
});

/**
 * Login
 * @param   {Object} req
 * @param   {Object} res
 * @returns {JSON}
 */
export const login = catchAsync(async (req, res) => {
  // 1) Login User Email & Password
  const { type, message, statusCode, user } = await authService.login(req.body);

  // 2) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) Generate Auth Tokens
  const tokens = await tokenService.generateAuthTokens(user);

  // 4) If Everything is OK, Send User's Data & Tokens
  return res.status(statusCode).json({
    type,
    message,
    user,
    tokens
  });
});

/**
 * Forgot Password
 * @param   {Object} req
 * @param   {Object} res
 * @returns {JSON}
 */
export const forgotPassword = catchAsync(async (req, res) => {
  // 1) Generate Reset Password Token
  const resetPasswordToken = await tokenService.generateResetPasswordToken(
    req.body.email
  );

  // 2) Sending Reset Link to User Email
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);

  // 3) If Everything is OK, Send Message
  return res.status(200).json({
    type: 'Success',
    message: 'Reset Password Link Sent Successfully'
  });
});

/**
 * Reset Password
 * @param   {Object} req
 * @param   {Object} res
 * @returns {JSON}
 */
export const resetPassword = catchAsync(async (req, res) => {
  const { password, passwordConfirmation } = req.body;
  const { token } = req.query;

  // 1) Reseting Password
  const { type, message, statusCode } = await authService.resetPassword(
    token,
    password,
    passwordConfirmation
  );

  // 2) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If Everything is OK, Send Message
  return res.status(statusCode).json({
    type,
    message
  });
});

/**
 * Send Verification Email
 * @param   {Object} req
 * @param   {Object} res
 * @returns {JSON}
 */
export const sendVerificationEmail = catchAsync(async (req, res) => {
  // 1) Generate Verification Token
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(
    req.user
  );

  // 2) Sending Verification Email to User Email
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);

  // 3) If Everything is OK, Send Message
  return res.status(200).json({
    type: 'Success',
    message: 'Verification Email Sent Successfully'
  });
});

/**
 * Verify Email
 * @param   {Object} req
 * @param   {Object} res
 * @returns {JSON}
 */
export const verifyEmail = catchAsync(async (req, res) => {
  // 1) Verifying User Email
  const { type, message, statusCode } = await authService.verifyEmail(
    req.query.token
  );

  // 2) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If Everything is OK, Send Message
  return res.status(statusCode).json({
    type,
    message
  });
});
