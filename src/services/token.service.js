// External Packages
import jwt from 'jsonwebtoken';
import moment from 'moment';

// Config
import config from '../config/config';
import tokenTypes from '../config/tokens';

// Utils
import { Token } from '../models/index';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';

// Models

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} [secret]
 * @returns {string}
 */
export const generateToken = (
  userId,
  expires,
  type,
  secret = config.jwt.secret
) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type
  };

  return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @returns {Promise<Token>}
 */
export const saveToken = catchAsync(async (token, id, expires, type) => {
  // 1) Create New Token Document
  const tokenDoc = await Token.create({
    token,
    user: id,
    expires: expires.toDate(),
    type
  });

  // 2) If Everything is OK, Send Token Data
  return tokenDoc;
});

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
export const verifyToken = catchAsync(async (token, type) => {
  // 1) Verify Token
  const payload = jwt.verify(token, config.jwt.secret);

  // 2) Get Token Data
  const tokenDoc = await Token.findOne({
    token,
    type,
    user: payload.sub
  });

  // 3) Check if Token Already Exist or not
  if (!tokenDoc) {
    throw new AppError('No Token Found', 404);
  }

  // 4) If Everything is OK, Send Token
  return tokenDoc;
});

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
export const generateAuthTokens = catchAsync((user) => {
  // 1) Set Access Token Expire Time
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    'minutes'
  );

  // 2) Generate Access Token
  const accessToken = generateToken(
    user.id,
    accessTokenExpires,
    tokenTypes.ACCESS
  );

  // 6) If Everything is OK, Send Access Token & Refresh Token
  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate()
    }
  };
});
