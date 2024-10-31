import joi from 'joi'

export const createUserSchema = joi.object({
  username: joi.string().min(3).max(20).required(),

  password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),

  role: joi
    .string()
    .valid('superuser', 'admin', 'reader', 'editor', 'tester')
    .required(),
})
