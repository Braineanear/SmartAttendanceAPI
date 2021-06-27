import { registerValidate, loginValidate } from './auth.validation';
import {
  createUserValidate,
  getUsersValidate,
  getUserValidate,
  updateUserValidate,
  deleteUserValidate
} from './user.validation';

const authValidation = {
  registerValidate,
  loginValidate
};

const userValidation = {
  createUserValidate,
  getUsersValidate,
  getUserValidate,
  updateUserValidate,
  deleteUserValidate
};

export { authValidation, userValidation };
