import mongoose from 'mongoose';

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

const Course = mongoose.model('Course', courseSchema);

export default Course;
