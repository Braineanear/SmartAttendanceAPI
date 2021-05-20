import express from 'express';

import authRoute from './auth.route';
import userRoute from './user.route';
import groupRoute from './group.route';
import departmentRoute from './department.route';
import courseRoute from './course.route';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/group', groupRoute);
router.use('/department', departmentRoute);
router.use('/course', courseRoute);

export default router;
