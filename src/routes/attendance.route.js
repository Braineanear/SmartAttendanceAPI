import express from 'express';

import { attendanceController } from '../controllers/index';

const { studentAttend, getAttendance } = attendanceController;

const router = express.Router();

router.post('/student', studentAttend);

router.post('/', getAttendance);

export default router;
