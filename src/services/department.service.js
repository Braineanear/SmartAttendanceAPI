// Utils
import APIFeatures from '../utils/apiFeatures';
import catchAsync from '../utils/catchAsync';

// Models
import { Department } from '../models/index';

export const createDepartment = catchAsync(async (body) => {
  const { name } = body;

  if (!name) {
    return {
      type: 'Error',
      message: 'Please Insert Department Name',
      statusCode: 400
    };
  }

  const department = await Department.create({ name });

  return {
    type: 'Success',
    message: 'Department Created Successfully',
    statusCode: 201,
    department
  };
});

export const queryDepartments = catchAsync(async (req) => {
  const departments = await APIFeatures(req, Department);

  if (!departments) {
    return {
      type: 'Error',
      message: 'No Departments Found',
      statusCode: 404
    };
  }

  return {
    type: 'Success',
    message: 'Departments Found Successfully',
    statusCode: 200,
    departments
  };
});

export const queryDepartment = catchAsync(async (id) => {
  const department = await Department.findById(id);

  if (!department) {
    return {
      type: 'Error',
      message: `No Department Found With This ID: ${id}`,
      statusCode: 404
    };
  }

  return {
    type: 'Success',
    message: 'Department Found Successfully',
    statusCode: 200,
    department
  };
});

export const updateDepartment = catchAsync(async (id, body) => {
  const { name } = body;

  if (name === '') {
    return {
      type: 'Error',
      message: 'Department Cannot Be Empty',
      statusCode: 400
    };
  }

  let department = await Department.findById(id);

  if (!department) {
    return {
      type: 'Error',
      message: `No Department Found With This ID: ${id}`,
      statusCode: 404
    };
  }

  department = await Department.findByIdAndUpdate(id, { name });

  return {
    type: 'Success',
    message: 'Department Updated Successfully',
    statusCode: 200,
    department
  };
});

export const deleteDepartment = catchAsync(async (id) => {
  const department = await Department.findById(id);

  if (!department) {
    return {
      type: 'Error',
      message: `No Group Found With This ID: ${id}`,
      statusCode: 404
    };
  }

  await Department.findByIdAndDelete(id);

  return {
    type: 'Success',
    message: 'Department Deleted Successfully',
    statusCode: 200
  };
});
