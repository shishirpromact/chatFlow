import type { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import jwt from 'jsonwebtoken';
import config from '@/config';
import { compare } from 'bcrypt';

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = async (userId: string, email: string) => {
  return jwt.sign({ userId, email }, config.JWT_KEY as string, {
    expiresIn: maxAge,
  });
};

export const register = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      response.status(400).send('Missing email or password');
      return;
    }

    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });

    const token = await createToken(user.id, user.email);

    response.cookie('jwt', token, {
      secure: true,
      maxAge,
      sameSite: 'none',
    });

    response.status(201).json({
      message: 'User created successfully',
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.log(error);
    response.status(500).send('Internal Server Error');
  }
};

export const login = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      response.status(400).send('Missing email or password');
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      response.status(400).send('User not found');
      return;
    }

    const auth = await compare(password, user.password);

    if (!auth) {
      response.status(400).send('Invalid password');
      return;
    }

    const token = await createToken(user.id, user.email);

    response.cookie('jwt', token, {
      secure: true,
      maxAge,
      sameSite: 'none',
    });

    response.status(200).json({
      message: 'User logged in successfully',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.log(error);
    response.status(500).send('Internal Server Error');
  }
};
