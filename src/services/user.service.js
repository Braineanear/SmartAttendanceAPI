// Utils
import catchAsync from '../utils/catchAsync';
import APIFeatures from '../utils/apiFeatures';

// Models
import { User } from '../models/index';

/**
 * Create New User
 * @param     {Object} body
 * @param     {Object} profileImage
 * @returns   {Object<type|message|statusCode|user>}
 */
export const createUser = catchAsync(async (body) => {
  const {
    name,
    email,
    password,
    passwordConfirmation,
    role,
    department,
    group,
    courses
  } = body;

  if (!name || !email || !password || !passwordConfirmation || !role) {
    return {
      type: 'Error',
      message: 'All Fields Are Required',
      statusCode: 400
    };
  }

  // 1) Check if The Email Already Taken
  const isEmailTaken = await User.isEmailTaken(email);

  // 2) If The Email Taken
  if (isEmailTaken) {
    return {
      type: 'Error',
      message: `Email Is Already Taken: ${email}`,
      statusCode: 409
    };
  }

  let user;

  if (role === 'student') {
    if (!department || !group) {
      return {
        type: 'Error',
        message: 'All Fields Are Required',
        statusCode: 400
      };
    }

    user = await User.create({
      name,
      email,
      password,
      passwordConfirmation,
      role,
      department,
      group
    });

    return {
      type: 'Success',
      message: 'Account Created Successfully',
      statusCode: 201,
      user
    };
  }

  if (role === 'instructor') {
    if (!courses) {
      return {
        type: 'Error',
        message: 'All Fields Are Required',
        statusCode: 400
      };
    }

    user = await User.create({
      name,
      email,
      password,
      passwordConfirmation,
      role,
      courses
    });

    return {
      type: 'Success',
      message: 'Account Created Successfully',
      statusCode: 201,
      user
    };
  }

  user = await User.create({
    name,
    email,
    password,
    passwordConfirmation,
    role
  });

  // 4) If Everything is OK, Send User Data
  return {
    type: 'Success',
    message: 'Account Created Successfully',
    statusCode: 201,
    user
  };
});

/**
 * Query Users
 * @param     {Object} req - Request
 * @returns   {Object<type|message|statusCode|users>}
 */
export const queryUsers = catchAsync(async (req) => {
  // 1) Get All Users
  const users = await APIFeatures(req, User);

  // 2) Check If Users Doesn't Exist
  if (users.length === 0) {
    return {
      type: 'Error',
      message: 'No Users Found',
      statusCode: 404
    };
  }

  // 3) If Everything is OK, Send Users Data
  return {
    type: 'Success',
    message: 'Users Found Successfully',
    statusCode: 200,
    users
  };
});

/**
 * Query User
 * @param     {Object} id - User ID
 * @return    {Object<type|message|statusCode|user>}
 */
export const queryUser = catchAsync(async (id) => {
  // 1) Get User Using It's ID
  let user = await User.findById(id);

  // 2) Check If User Doesn't Exist
  if (!user) {
    return {
      type: 'Error',
      message: `No User Found With This ID: ${id}`,
      statusCode: 404
    };
  }

  if (user.role !== 'instructor') {
    user = await User.findById(id).select('-courses');
  }

  // 3) If Everything is OK, Send User Data;
  return {
    type: 'Success',
    message: 'Found User Successfully',
    statusCode: 200,
    user
  };
});

/**
 * Update User Using It's ID
 * @param     {ObjectId}  id - User ID
 * @param     {Object}    body - Updated Body
 * @returns   {Object<type|message|statusCode|user>}
 */
export const updateUser = catchAsync(async (id, body) => {
  let user = await User.findById(id);

  // 1) Check If User Doesn't Exist
  if (!user) {
    return {
      type: 'Error',
      message: `No User Found With This ID: ${id}`,
      statusCode: 404
    };
  }

  if (body.password || body.passwordConfirmation) {
    return {
      type: 'Error',
      message:
        'Cannot Update Password From Here, Please Go To Update Password Route',
      statusCode: 400
    };
  }

  // 2) Check if Email Taken Or Not
  const isEmailTaken = await User.isEmailTaken(body.email, id);

  if (body.email && isEmailTaken) {
    return {
      type: 'Error',
      message: `This Email Is Already Taken: ${body.email}`,
      statusCode: 409
    };
  }

  // 3) Find User Document and Update it
  user = await User.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true
  });

  // 4) If Everything is OK, Send User Data
  return {
    type: 'Success',
    message: 'User Updated Successfully',
    statusCode: 200,
    user
  };
});

/**
 * Delete Using It's ID
 * @param     {ObjectId} id - User ID,
 * @returns   {Object<type|message|statusCode>}
 */
export const deleteUser = catchAsync(async (id) => {
  // 1) Find User Document and Delete it
  const user = await User.findByIdAndDelete(id);

  // 2) Check if User Already Exist
  if (!user) {
    return {
      type: 'Error',
      message: `No User Found With This ID: ${id}`,
      statusCode: 404
    };
  }

  // 3) If Everything is OK, Send Message
  return {
    type: 'Success',
    message: 'Account Deleted Successfully',
    statusCode: 200
  };
});
