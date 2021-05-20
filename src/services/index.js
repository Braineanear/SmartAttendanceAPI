import {
  loginWithEmailAndPassword,
  resetPassword,
  verifyEmail
} from './auth.service';

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
  createUser,
  queryUsers,
  queryUser,
  updateUserDetails,
  updateUserProfileImage,
  deleteUser
} from './user.service';

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
  updateGroup,
  deleteGroup
} from './group.service';

const authService = {
  loginWithEmailAndPassword,
  resetPassword,
  verifyEmail
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

const userService = {
  createUser,
  queryUsers,
  queryUser,
  updateUserDetails,
  updateUserProfileImage,
  deleteUser
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
  updateGroup,
  deleteGroup
};

export {
  authService,
  tokenService,
  userService,
  emailService,
  courseService,
  departmentService,
  groupService
};
