import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import config from '@/config';

export const verifyToken = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const token = request.cookies.jwt;

  if (!token) {
    response.status(401).send('Unauthorized');
    return;
  }

  try {
    jwt.verify(token, config.JWT_KEY as string, (err: any, payload: any) => {
      if (err) {
        response.status(403).send('Token is not valid');
        return;
      }
      (request as any).userId = payload?.userId;
      next();
    });
  } catch (error) {
    response.status(401).send('Unauthorized');
  }
};
