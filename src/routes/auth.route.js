import express from 'express';

import { authController } from '../controllers/index';
import validate from '../middlewares/validate';
import { authValidation } from '../validations/index';

const { registerValidate, loginValidate } = authValidation;

const { register, login } = authController;

const router = express.Router();

router.post('/register', validate(registerValidate), register);
router.post('/login', validate(loginValidate), login);

export default router;
