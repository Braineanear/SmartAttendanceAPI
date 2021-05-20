// Utils
import catchAsync from '../utils/catchAsync';

// Services
import { courseService } from '../services/index';

/**
 * Create New Course
 * @param   {Object} req
 * @param   {Object} res
 * @returns {JSON}
 */
export const createCourse = catchAsync(async (req, res) => {
  // 1) Create New Course
  const { type, message, statusCode, course } =
    await courseService.createCourse(req.body);

  // 2) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If Everything is OK, Send Course
  return res.status(statusCode).json({
    type,
    message,
    course
  });
});

/**
 * Get All Courses
 * @param   {Object} req
 * @param   {Object} res
 * @returns {JSON}
 */
export const getAllCourses = catchAsync(async (req, res) => {
  // 1) Get All Courses
  const { type, message, statusCode, courses } =
    await courseService.queryCourses(req);

  // 2) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If Everything is OK, Send Courses
  return res.status(statusCode).json({
    type,
    message,
    courses
  });
});

/**
 * Get Course Using It's ID
 * @param   {Object} req
 * @param   {Object} res
 * @returns {JSON}
 */
export const getCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  // 1) Get Course Using It's ID
  const { type, message, statusCode, course } = await courseService.queryCourse(
    id
  );

  // 2) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If Everything is OK, Send Course
  return res.status(statusCode).json({
    type,
    message,
    course
  });
});

/**
 * Update Course Using It's ID
 * @param   {Object} req
 * @param   {Object} res
 * @returns {JSON}
 */
export const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  // 1) Update Course Using It's ID
  const { type, message, statusCode, course } =
    await courseService.updateCourse(id, req.body);

  // 2) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If Everything is OK, Send Course
  return res.status(statusCode).json({
    type,
    message,
    course
  });
});

/**
 * Delete Course Using It's ID
 * @param   {Object} req
 * @param   {Object} res
 * @returns {JSON}
 */

export const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  // 1) Delete Course Using It's ID
  const { type, message, statusCode } = await courseService.deleteCourse(id);

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
