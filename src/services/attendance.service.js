// External Packages
import moment from 'moment';

// Utils
import catchAsync from '../utils/catchAsync';

// Models
import { Attendance } from '../models/index';

/**
 * Student Attend Service
 * @param   {ObjectId}    course
 * @param   {ObjectId}    student
 * @param   {String}      startsAt
 * @param   {String}      endsAt
 * @returns {Object<type|message|statusCode|attend>}
 */
export const studentAttend = catchAsync(
  async (course, student, startsAt, endsAt, date) => {
    if (!course || !student || !startsAt || !endsAt || !date) {
      return {
        type: 'Error',
        message: 'All Fields Are Required',
        statusCode: 400
      };
    }

    startsAt = moment(startsAt, 'HH:mm a');
    endsAt = moment(endsAt, 'HH:mm a');

    const current = moment();
    const duration = moment.duration(endsAt.diff(current));

    if (duration < 0) {
      return {
        type: 'Error',
        message: 'Course Finished You Cannot Assign Today',
        statusCode: 400
      };
    }

    const attendance = await Attendance.findOne({ student, date });

    if (attendance) {
      return {
        type: 'Error',
        message: 'Student Assigned Before',
        statusCode: 405
      };
    }

    const attend = await Attendance.create({
      course,
      student,
      courseStartsAt: startsAt,
      courseEndsAt: endsAt,
      date
    });

    return {
      type: 'Success',
      message: 'Student Assigned Successfully',
      statusCode: 201,
      attend
    };
  }
);

/**
 * Get Course Attendance At Specific Data Service
 * @param   {ObjectId}  course
 * @param   {String}    date
 * @returns {Object<type|message|statusCode|attendance>}
 */
export const getAttendance = catchAsync(async (course, date) => {
  if (!course || !date) {
    return {
      type: 'Error',
      message: 'All Fields Are Required',
      statusCode: 404
    };
  }

  const attendance = await Attendance.find({ course, date }).populate([
    {
      path: 'course',
      select: 'name -_id'
    },
    {
      path: 'student',
      select: 'name email department group'
    }
  ]);

  if (attendance.length === 0) {
    return {
      type: 'Error',
      message: 'No Attendance Found For This Course',
      statusCode: 404
    };
  }

  return {
    type: 'Success',
    message: 'Attendance Found For This Course',
    statusCode: 200,
    attendance
  };
});
