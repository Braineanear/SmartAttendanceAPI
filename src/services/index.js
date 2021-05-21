import { login, resetPassword, verifyEmail } from './auth.service';

import {
  createUser,
  queryUsers,
  queryUser,
  updateUser,
  deleteUser
} from './user.service';

import {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  generateResetPasswordToken,
  generateVerifyEmailToken
} from './token.service';

import {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendAfterResetPasswordMessage,
  sendVerificationEmail
} from './email.service';

import {
  createCourse,
  queryCourses,
  queryCourse,
  updateCourse,
  deleteCourse
} from './course.service';

import {
  createDepartment,
  queryDepartments,
  queryDepartment,
  updateDepartment,
  deleteDepartment
} from './department.service';

import {
  createGroup,
  queryGroups,
  queryGroup,
  queryGroupsAndDepartments,
  updateGroup,
  deleteGroup
} from './group.service';

import { studentAttend, getAttendance } from './attendance.service';

const authService = {
  login,
  resetPassword,
  verifyEmail
};

const userService = {
  createUser,
  queryUsers,
  queryUser,
  updateUser,
  deleteUser
};

const emailService = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendAfterResetPasswordMessage,
  sendVerificationEmail
};

const tokenService = {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  generateResetPasswordToken,
  generateVerifyEmailToken
};

const courseService = {
  createCourse,
  queryCourses,
  queryCourse,
  updateCourse,
  deleteCourse
};

const departmentService = {
  createDepartment,
  queryDepartments,
  queryDepartment,
  updateDepartment,
  deleteDepartment
};

const groupService = {
  createGroup,
  queryGroups,
  queryGroup,
  queryGroupsAndDepartments,
  updateGroup,
  deleteGroup
};

const attendanceService = {
  studentAttend,
  getAttendance
};

export {
  authService,
  tokenService,
  userService,
  emailService,
  courseService,
  departmentService,
  groupService,
  attendanceService
};
