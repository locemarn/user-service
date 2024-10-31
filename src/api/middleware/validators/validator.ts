import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

interface IErrorMessage {
  details: IDetails[]
}

interface IDetails {
  message: string
}

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    await schema
      .validateAsync(req.body)
      .then(() => next())
      .catch((err: IErrorMessage) =>
        res.status(400).json({ error: err.details[0].message })
      )
  }
}
