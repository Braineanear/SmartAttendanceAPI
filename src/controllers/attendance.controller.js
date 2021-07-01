// Utils
import catchAsync from '../utils/catchAsync';

// Services
import { attendanceService } from '../services/index';

/**
 * Allow Student Attend Course
 * @param   {Object} req
 * @param   {Object} res
 * @returns {JSON}
 */
export const studentAttend = catchAsync(async (req, res) => {
  const { course, student, startsAt, endsAt, date } = req.body;

  // 1) Assign Studnt
  const { type, message, statusCode, attend } =
    await attendanceService.studentAttend(
      course,
      student,
      startsAt,
      endsAt,
      date
    );

  // 2) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If Everything is OK, Send Data
  return res.status(statusCode).json({
    type,
    message,
    attend
  });
});

/**
 * Allow Instructor To See All Attendance
 * @param   {Object} req
 * @param   {Object} res
 * @returns {JSON}
 */
export const getAttendance = catchAsync(async (req, res) => {
  const { course, date } = req.body;

  // 1) Get Course Attendance On Specific Date
  const { type, message, statusCode, attendance } =
    await attendanceService.getAttendance(course, date);

  // 2) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If Everything is OK, Send Data
  return res.status(statusCode).json({
    type,
    message,
    attendance
  });
});
