import mongoose from 'mongoose';

const groupSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      min: 2
    }
  },
  { timestamps: true }
);

const Group = mongoose.model('Group', groupSchema);

export default Group;
