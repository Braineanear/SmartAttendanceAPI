// Utils
import APIFeatures from '../utils/apiFeatures';
import catchAsync from '../utils/catchAsync';

// Models
import { Group, Department } from '../models/index';

export const createGroup = catchAsync(async (body) => {
  const { name } = body;

  if (!name) {
    return {
      type: 'Error',
      message: 'Please Enter Group Name',
      statusCode: 400
    };
  }

  const group = await Group.create({
    name
  });

  return {
    type: 'Success',
    message: 'Group Created Successfully',
    statusCode: 201,
    group
  };
});

export const queryGroups = catchAsync(async (req) => {
  const groups = await APIFeatures(req, Group);

  if (!groups) {
    return {
      type: 'Error',
      message: 'No Groups Found',
      statusCode: 404
    };
  }

  return {
    type: 'Success',
    message: 'Groups Found Successfully',
    statusCode: 200,
    groups
  };
});

export const queryGroup = catchAsync(async (id) => {
  const group = await Group.findById(id);

  if (!group) {
    return {
      type: 'Error',
      message: `No Group Found With This ID: ${id}`,
      statusCode: 404
    };
  }

  return {
    type: 'Success',
    message: 'Group Found Successfully',
    statusCode: 200,
    group
  };
});

export const queryGroupsAndDepartments = catchAsync(async (req) => {
  req.query.select = 'name';

  const groups = await APIFeatures(req, Group);
  const departments = await APIFeatures(req, Department);

  if (!groups && !departments) {
    return {
      type: 'Error',
      message: 'No Groups & Departments Found',
      statusCode: 404
    };
  }

  return {
    type: 'Success',
    message: 'Groups & Departments Found Successfully',
    statusCode: 200,
    groups,
    departments
  };
});

export const updateGroup = catchAsync(async (id, body) => {
  const { name } = body;

  if (name === '') {
    return {
      type: 'Error',
      message: 'Cannot Insert Empty Group Name',
      statusCode: 400
    };
  }

  let group = await Group.findById(id);

  if (!group) {
    return {
      type: 'Error',
      message: `No Group Found With This ID: ${id}`,
      statusCode: 404
    };
  }

  group = await Group.findByIdAndUpdate(id, { name });

  return {
    type: 'Success',
    message: 'Group Updated Successfully',
    statusCode: 200,
    group
  };
});

export const deleteGroup = catchAsync(async (id) => {
  const group = await Group.findById(id);

  if (!group) {
    return {
      type: 'Error',
      message: `No Group Found With This ID: ${id}`,
      statusCode: 404
    };
  }

  await Group.findByIdAndDelete(id);

  return {
    type: 'Success',
    message: 'Group Deleted Successfully',
    statusCode: 200
  };
});
