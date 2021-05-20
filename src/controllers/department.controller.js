// Utils
import catchAsync from '../utils/catchAsync';

// Services
import { departmentService } from '../services/index';

/**
 * Create New Department
 * @param   {Object} req
 * @param   {Object} res
 * @returns {JSON}
 */
export const createDepartment = catchAsync(async (req, res) => {
  // 1) Create Department
  const { type, message, statusCode, department } =
    await departmentService.createDepartment(req.body);

  // 2) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If Everything is OK, Send Department
  return res.status(statusCode).json({
    type,
    message,
    department
  });
});

/**
 * Get All Departments
 * @param   {Object} req
 * @param   {Object} res
 * @returns {JSON}
 */
export const getAllDepartments = catchAsync(async (req, res) => {
  // 1) Get All Departments
  const { type, message, statusCode, departments } =
    await departmentService.queryDepartments(req);

  // 2) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If Everything is OK, Send Departments
  return res.status(statusCode).json({
    type,
    message,
    departments
  });
});

/**
 * Get Department Using It's ID
 * @param   {Object} req
 * @param   {Object} res
 * @returns {JSON}
 */
export const getDepartment = catchAsync(async (req, res) => {
  const { id } = req.params;

  // 1) Get Department Using It's ID
  const { type, message, statusCode, department } =
    await departmentService.queryDepartment(id);

  // 2) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If Everything is OK, Send Department
  return res.status(statusCode).json({
    type,
    message,
    department
  });
});

/**
 * Update Department Using It's ID
 * @param   {Object} req
 * @param   {Object} res
 * @returns {JSON}
 */
export const updateDepartment = catchAsync(async (req, res) => {
  const { id } = req.params;

  // 1) Update Department Using It's ID
  const { type, message, statusCode, department } =
    await departmentService.updateDepartment(id, req.body);

  // 2) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If Everything is OK, Send Department
  return res.status(statusCode).json({
    type,
    message,
    department
  });
});

/**
 * Delete Department Using It's ID
 * @param   {Object} req
 * @param   {Object} res
 * @returns {JSON}
 */
export const deleteDepartment = catchAsync(async (req, res) => {
  const { id } = req.params;

  // 1) Delete Department Using It's ID
  const { type, message, statusCode } =
    await departmentService.deleteDepartment(id);

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
