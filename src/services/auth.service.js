// Utils
import catchAsync from '../utils/catchAsync';

// Models
import { User } from '../models/index';

/**
 * Login With Email & Password
 * @param     {Object} body - Email & Password
 * @returns   {Promise<User>}
 */
const login = catchAsync(async (body) => {
  const { email, password } = body;

  // 1) Check Email & Password
  if (!email || !password) {
    return {
      type: 'Error',
      message: 'All Fields Are Required',
      statusCode: 400
    };
  }

  // 2) Get User With Specific Email and Password
  const user = await User.findOne({ email }).select('+password -courses');

  // 3) Check If Email isn't Correct
  if (!user) {
    return {
      type: 'Error',
      message: 'Incorrect Email or Password',
      statusCode: 403
    };
  }

  // 4) Check if Passwords are The Same
  const isMatch = await user.isPasswordMatch(password);

  // 5) Check If Password isn't Correct
  if (!isMatch) {
    return {
      type: 'Error',
      message: 'Incorrect Email or Password',
      statusCode: 403
    };
  }

  // 6) If Everything OK, Send User
  return {
    type: 'Success',
    message: 'User Logged In Successfully',
    statusCode: 200,
    user
  };
});

export default login;
