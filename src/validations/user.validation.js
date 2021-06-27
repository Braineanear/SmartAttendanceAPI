import Joi from 'joi';

import { password, objectId } from './custome.validation';

export const createUserValidate = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    passwordConfirmation: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid('student', 'admin', 'instructor'),
    department: Joi.string().custom(objectId),
    group: Joi.string().custom(objectId),
    courses: Joi.array()
  })
};

export const getUsersValidate = {
  query: Joi.object().keys({
    sort: Joi.string(),
    select: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    role: Joi.string()
  })
};

export const getUserValidate = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId)
  })
};

export const updateUserValidate = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId)
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      name: Joi.string(),
      department: Joi.string().custom(objectId),
      group: Joi.string().custom(objectId)
    })
    .min(1)
};

export const deleteUserValidate = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId)
  })
};
