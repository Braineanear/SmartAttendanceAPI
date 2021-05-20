import {
  register,
  login,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail
} from './auth.controller';

import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
} from './user.controller';

import {
  createGroup,
  getAllGroups,
  getGroup,
  updateGroup,
  deleteGroup
} from './group.controller';

import {
  createDepartment,
  getAllDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment
} from './department.controller';

import {
  createCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  deleteCourse
} from './course.controller';

const authController = {
  register,
  login,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail
};

const userController = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
};

const groupController = {
  createGroup,
  getAllGroups,
  getGroup,
  updateGroup,
  deleteGroup
};

const departmentController = {
  createDepartment,
  getAllDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment
};

const courseController = {
  createCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  deleteCourse
};

export {
  authController,
  userController,
  groupController,
  departmentController,
  courseController
};
