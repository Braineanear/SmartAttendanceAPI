// Utils
import catchAsync from '../utils/catchAsync';

// Services
import { userService } from '../services/index';

// Models
import { User } from '../models/index';

/**
 * Create New User
 * @param   {Object} req
 * @param   {Object} res
 * @returns {JSON}
 */
export const createUser = catchAsync(async (req, res) => {
  // 1) Create User Document
  const { type, message, statusCode, user } = await userService.createUser(req);

  // 2) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If Everything is OK, Send User Data
  return res.status(statusCode).json({
    type,
    message,
    user
  });
});

/**
 * Get All Users
 * @param   {Object} req
 * @param   {Object} res
 * @returns {JSON}
 */
export const getUsers = catchAsync(async (req, res) => {
  // 1) Get All Users
  const { type, message, statusCode, users } = await userService.queryUsers(
    req
  );

  // 2) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If Everything is OK, Send Data
  return res.status(statusCode).json({
    type,
    message,
    users
  });
});

/**
 * Get User Data
 * @param   {Object} req
 * @param   {Object} res
 * @returns {JSON}
 */
export const getUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  // 1) Find User Document By It's ID
  const { type, message, statusCode, user } = await User.findById(id);

  // 2) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If Everything is OK, Send User's Data
  return res.status(statusCode).json({
    type,
    message,
    user
  });
});

/**
 * Update User's Data
 * @param   {Object} req
 * @param   {Object} res
 * @returns {JSON}
 */
export const updateUser = catchAsync(async (req, res) => {
  // 1) Find User Document and Update it
  const { type, message, statusCode, user } = await userService.updateUserById(
    req.params.id,
    req.body
  );

  // 2) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If Everything is OK, Send User's Data
  return res.status(statusCode).json({
    type,
    message,
    user
  });
});

/**
 * Delete User's Data
 * @param   {Object} req
 * @param   {Object} res
 * @returns {JSON}
 */
export const deleteUser = catchAsync(async (req, res) => {
  // 1) Find User Document and Delete it
  const { type, message, statusCode } = await userService.deleteUserById(
    req.params.id
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
