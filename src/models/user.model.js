import crypto from 'crypto';

import { hash, verify } from 'argon2';
import mongoose from 'mongoose';
import validator from 'validator';

import toJSON from './plugins/index';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name']
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      }
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            'Password must contain at least one letter and one number'
          );
        }
      },
      select: false
    },
    passwordConfirmation: {
      type: String,
      required: true,
      validate: {
        // This only works with CREATE & SAVE!!!!!
        validator: function (el) {
          return el === this.password;
        },
        messege: 'Passwords are not the same'
      },
      select: false
    },
    role: {
      type: String,
      enum: ['student', 'admin', 'instructor'],
      default: 'student'
    },
    passwordChangedAt: Date,
    department: {
      type: mongoose.Types.ObjectId,
      ref: 'Department'
    },
    group: {
      type: mongoose.Types.ObjectId,
      ref: 'Group'
    },
    courses: {
      type: Array
    }
  },
  {
    timestamps: true,
    private: true
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);

userSchema.index({ name: 1, email: 1 }, { unique: true });

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  return await verify(this.password, password);
};

// Encrypt Password Using Argon2
userSchema.pre('save', async function (next) {
  // 1) Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // 2) Salt & Hashing Password
  const salt = crypto.randomBytes(32);
  this.password = await hash(this.password, { salt });

  // 3) Delete passwordConfirmation field
  this.passwordConfirmation = undefined;
  next();
});

// Set passwordChangedAt field to the current time when the user change the password
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

export default User;
