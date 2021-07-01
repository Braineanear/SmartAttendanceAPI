import moment from 'moment';
import mongoose from 'mongoose';
import toJSON from './plugins/toJSON.plugin';

const attendanceSchema = mongoose.Schema(
  {
    student: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    courseStartsAt: {
      type: String,
      required: true
    },
    courseEndsAt: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

attendanceSchema.plugin(toJSON);

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
