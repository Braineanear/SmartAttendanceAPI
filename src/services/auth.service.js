// Config
import tokenTypes from '../config/tokens';

// Utils
import catchAsync from '../utils/catchAsync';

// Services
import { sendAfterResetPasswordMessage } from './email.service';
import { verifyToken } from './token.service';

// Models
import { Token, User } from '../models/index';

/**
 * Login With Email & Password
 * @param     {Object} body - Email & Password
 * @returns   {Promise<User>}
 */
export const login = catchAsync(async (body) => {
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

/**
 * Reset Password
 * @param     {String} resetPasswordToken
 * @param     {String} newPassword
 */
export const resetPassword = catchAsync(
  async (resetPasswordToken, newPassword, newPasswordConfirmation) => {
    // 1) Verify Reset Password Token
    const resetPasswordTokenDoc = await verifyToken(
      resetPasswordToken,
      tokenTypes.RESET_PASSWORD
    );

    // 2) Find User and Update it's Password
    const user = await User.findByIdAndUpdate(resetPasswordTokenDoc.user, {
      password: newPassword,
      passwordConfirmation: newPasswordConfirmation
    });

    // 3) Check if User Already Exist
    if (!user) {
      return {
        type: 'Error',
        message: 'No User Found',
        statusCode: 404
      };
    }

    // 4) Sending After Reset Password Mail
    await sendAfterResetPasswordMessage(user.email);

    // 5) Deleteing User Reset Token
    await Token.deleteMany({
      user: user.id,
      type: tokenTypes.RESET_PASSWORD
    });

    // 6) If Everything is OK, Send Message
    return {
      type: 'Success',
      message: 'Password Reseted Successfully',
      statusCode: 200
    };
  }
);

/**
 * Verify Email
 * @param     {String} verifyEmailToken
 */
export const verifyEmail = catchAsync(async (verifyEmailToken) => {
  // 1) Verify Email Token
  const verifyEmailTokenDoc = await verifyToken(
    verifyEmailToken,
    tokenTypes.VERIFY_EMAIL
  );

  // 2) Find User
  const user = await User.findById(verifyEmailTokenDoc.user);

  // 3) Check if User Already Exist
  if (!user) {
    return {
      type: 'Error',
      message: 'No User Found',
      statusCode: 404
    };
  }

  // 4) Deleting User Verify Email Token
  await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL });

  // 5) Update User isEmailVerified Filed (Set True)
  await User.findByIdAndUpdate(user.id, { isEmailVerified: true });

  // 6) If Everything is OK, Send Message
  return {
    type: 'Success',
    message: 'Email Verified Successfully',
    statusCode: 200
  };
});
