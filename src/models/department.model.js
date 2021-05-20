import mongoose from 'mongoose';

const departmentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      unique: true,
      trim: true
    }
  },
  { timestamps: true }
);

const Department = mongoose.model('Department', departmentSchema);

export default Department;
