// Utils
import APIFeatures from '../utils/apiFeatures';
import catchAsync from '../utils/catchAsync';

// Models
import { Course } from '../models/index';

/**
 * Create New Course
 * @param   {Object} body
 * @returns {Object<type|message|statusCode|course>}
 */
export const createCourse = catchAsync(async (body) => {
  const { name } = body;

  // 1) Check If User Entered All Fields
  if (!name) {
    return {
      type: 'Error',
      message: 'Please Insert Department Name',
      statusCode: 400
    };
  }

  // 2) Create New Course
  const course = await Course.create({ name });

  // 3) If Everything is OK, Send Data
  return {
    type: 'Success',
    message: 'Course Created Successfully',
    statusCode: 201,
    course
  };
});

/**
 * Query Courses
 * @param   {Object} req
 * @returns {Object<type|message|statusCode|courses>}
 */
export const queryCourses = catchAsync(async (req) => {
  // 1) Query All Courses
  const courses = await APIFeatures(req, Course);

  // 2) Check If Courses Doesn't Exist
  if (!courses) {
    return {
      type: 'Error',
      message: 'No Courses Found',
      statusCode: 404
    };
  }

  // 3) If Everything is OK, Send Data
  return {
    type: 'Success',
    message: 'Courses Found Successfully',
    statusCode: 200,
    courses
  };
});

/**
 * Query Course Using It's ID
 * @param   {ObjectId}  id
 * @returns {Object<type|message|statusCode|course>}
 */
export const queryCourse = catchAsync(async (id) => {
  // 1) Get Course Using Using It's ID
  const course = await Course.findById(id);

  // 2) Check If Course Doesn't Exist'
  if (!course) {
    return {
      type: 'Error',
      message: `No Course Found With This ID: ${id}`,
      statusCode: 404
    };
  }

  // 3) If Everything is OK, Send Data
  return {
    type: 'Success',
    message: 'Course Found Successfully',
    statusCode: 200,
    course
  };
});

/**
 * Update Course Using It's ID
 * @param     {ObjectId}  id
 * @param     {Object}    body
 * @returns   {Object<type|message|statusCode|course>}
 */
export const updateCourse = catchAsync(async (id, body) => {
  const { name } = body;

  // 1) Check If User Entered Course Name
  if (name === '') {
    return {
      type: 'Error',
      message: 'Course Name Cannot Be Empty',
      statusCode: 400
    };
  }

  // 2) Find Course Using It's ID
  let course = await Course.findById(id);

  // 3) Check If Course Doesn't Exist
  if (!course) {
    return {
      type: 'Error',
      message: `No Course Found With This ID: ${id}`,
      statusCode: 404
    };
  }

  // 4) Update Course
  course = await Course.findByIdAndUpdate(
    id,
    { name },
    {
      new: true,
      runValidators: true
    }
  );

  // 5) If Everything is OK, Send Data
  return {
    type: 'Success',
    message: 'Course Updated Successfully',
    statusCode: 200,
    course
  };
});

/**
 * Delete Course Using It's ID
 * @param     {ObjectId}  id
 * @returns   {Object<type|message|statusCode>}
 */
export const deleteCourse = catchAsync(async (id) => {
  // 1) Find Course Using It's ID
  const course = await Course.findById(id);

  // 2) Check If Course Doesn't Exist
  if (!course) {
    return {
      type: 'Error',
      message: `No Course Found With This ID: ${id}`,
      statusCode: 404
    };
  }

  // 3) Delete Course
  await Course.findByIdAndDelete(id);

  // 4) If Everything is OK, Send Data
  return {
    type: 'Success',
    message: 'Course Deleted Successfully',
    statusCode: 200
  };
});
