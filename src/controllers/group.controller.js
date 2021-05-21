// Utils
import catchAsync from '../utils/catchAsync';

// Services
import { groupService } from '../services/index';

/**
 * Create New Group
 * @param   {Object} req
 * @param   {Object} res
 * @returns {JSON}
 */
export const createGroup = catchAsync(async (req, res) => {
  // 1) Create Group
  const { type, message, statusCode, group } = await groupService.createGroup(
    req.body
  );

  // 2) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If Everything is OK, Send Group
  return res.status(statusCode).json({
    type,
    message,
    group
  });
});

/**
 * Get All Groups
 * @param   {Object} req
 * @param   {Object} res
 * @returns {JSON}
 */
export const getAllGroups = catchAsync(async (req, res) => {
  // 1) Get All Groups
  const { type, message, statusCode, groups } = await groupService.queryGroups(
    req
  );

  // 2) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If Everything is OK, Send Groups
  return res.status(statusCode).json({
    type,
    message,
    groups
  });
});

/**
 * Get Group Using It's ID
 * @param   {Object} req
 * @param   {Object} res
 * @returns {JSON}
 */
export const getGroup = catchAsync(async (req, res) => {
  const { id } = req.params;

  // 1) Get Group Using It's ID
  const { type, message, statusCode, group } = await groupService.queryGroup(
    id
  );

  // 2) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If Everything is OK, Send Group
  return res.status(statusCode).json({
    type,
    message,
    group
  });
});

/**
 * Get All Groups & Departments
 * @param   {Object} req
 * @param   {Object} res
 * @returns {JSON}
 */
export const getGroupsAndDepartments = catchAsync(async (req, res) => {
  // 1) Get All Groups & Departments
  const { type, message, statusCode, groups, departments } =
    await groupService.queryGroupsAndDepartments(req);

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
    groups,
    departments
  });
});

/**
 * Update Group Using It's ID
 * @param   {Object} req
 * @param   {Object} res
 * @returns {JSON}
 */
export const updateGroup = catchAsync(async (req, res) => {
  const { id } = req.params;

  // 1) Update Group Using It's ID
  const { type, message, statusCode, group } = await groupService.updateGroup(
    id,
    req.body
  );

  // 2) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If Everything is OK, Send Group
  return res.status(statusCode).json({
    type,
    message,
    group
  });
});

/**
 * Delete Group Using It's ID
 * @param   {Object} req
 * @param   {Object} res
 * @returns {JSON}
 */
export const deleteGroup = catchAsync(async (req, res) => {
  const { id } = req.params;

  // 1) Delete Group Using It's ID
  const { type, message, statusCode } = await groupService.deleteGroup(id);

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
