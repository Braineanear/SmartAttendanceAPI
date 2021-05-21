import mongoose from 'mongoose';
import toJSON from './plugins/toJSON.plugin';

const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      min: 2,
      required: true
    }
  },
  { timestamps: true }
);

courseSchema.plugin(toJSON);

const Course = mongoose.model('Course', courseSchema);

export default Course;
