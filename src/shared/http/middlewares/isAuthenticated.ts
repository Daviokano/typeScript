import { AppError } from '@shared/errors/AppError'
import { NextFunction, Request, Response } from 'express'
import authConfig from '@config/auth'
import { Secret, verify } from 'jsonwebtoken'

export const isAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const authHeader = request.headers.authorization
  if (!authHeader) {
    throw new AppError('Token is missing', 401)
  }
  const token = authHeader.replace('Bearer ', '')
  try {
    verify(token, authConfig.jwt.secret as Secret)
    return next()
  } catch {
    throw new AppError('Invalid token', 401)
  }
}
