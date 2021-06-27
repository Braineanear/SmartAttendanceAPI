// Utils
import catchAsync from '../utils/catchAsync';

// Services
import { authService, userService, tokenService } from '../services/index';

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

  // 4) If Everything OK, Send User Data With Tokens
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
  const { type, message, statusCode, user } = await authService(req.body);

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
