import {
  registerValidate,
  loginValidate,
  forgotPasswordValidate,
  resetPasswordValidate,
  verifyEmailValidate
} from './auth.validation';
import {
  createUserValidate,
  getUsersValidate,
  getUserValidate,
  updateUserValidate,
  deleteUserValidate
} from './user.validation';

const authValidation = {
  registerValidate,
  loginValidate,
  forgotPasswordValidate,
  resetPasswordValidate,
  verifyEmailValidate
};

const userValidation = {
  createUserValidate,
  getUsersValidate,
  getUserValidate,
  updateUserValidate,
  deleteUserValidate
};

export { authValidation, userValidation };