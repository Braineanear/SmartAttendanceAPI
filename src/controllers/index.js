import { register, login } from './auth.controller';

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
  getGroupsAndDepartments,
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

import { studentAttend, getAttendance } from './attendance.controller';

const authController = {
  register,
  login
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
  getGroupsAndDepartments,
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

const attendanceController = {
  studentAttend,
  getAttendance
};

export {
  authController,
  userController,
  groupController,
  departmentController,
  courseController,
  attendanceController
};
