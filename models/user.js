const {Schema, model} = require('mongoose');
const Joi = require('joi');

const userRegisterSchema = Schema({
        password: {
          type: String,
          required: [true, 'Password is required'],
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
        },
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter"
        },
        token: {
          type: String,
          default: null,
        },
        avatarURL: {
          type: String,
          required: [true, 'Avatar URL is required'],
        }
}, {versionKey: false, timestamps: true})

const joiUserSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().required(),
    subscription: Joi.string(),
    token: Joi.string()
  })

  const joiLoginSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().required(),
  })

  const joiSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required()
  })

  const User = model('user', userRegisterSchema);

  module.exports = {
    User,
    joiUserSchema,
    joiLoginSchema,
    joiSubscriptionSchema
  };