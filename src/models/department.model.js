import mongoose from 'mongoose';
import toJSON from './plugins/toJSON.plugin';

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

departmentSchema.plugin(toJSON);

const Department = mongoose.model('Department', departmentSchema);

export default Department;
