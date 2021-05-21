import mongoose from 'mongoose';
import toJSON from './plugins/toJSON.plugin';

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

groupSchema.plugin(toJSON);

const Group = mongoose.model('Group', groupSchema);

export default Group;
