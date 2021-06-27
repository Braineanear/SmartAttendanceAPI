import authService from './auth.service';

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
  generateAuthTokens
} from './token.service';

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

const userService = {
  createUser,
  queryUsers,
  queryUser,
  updateUser,
  deleteUser
};

const tokenService = {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens
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
  courseService,
  departmentService,
  groupService,
  attendanceService
};
