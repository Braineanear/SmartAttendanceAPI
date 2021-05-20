import moment from 'moment';
import mongoose from 'mongoose';

const attendanceSchema = mongoose.Schema(
  {
    date: {
      type: Date,
      default: moment()
    },
    students: [Array]
  },
  { timestamps: true }
);

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
