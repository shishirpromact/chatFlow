import type { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import jwt from 'jsonwebtoken';
import config from '@/config';
import { compare, genSalt, hash } from 'bcrypt';

const maxAge = 3 * 24 * 60 * 60 * 1000;

/**
 * Creates a JWT token for a given user ID and email.
 *
 * @param userId - The ID of the user.
 * @param email - The email of the user.
 * @returns A JWT token.
 */
const createToken = async (userId: string, email: string) => {
  return jwt.sign({ userId, email }, config.JWT_KEY as string, {
    expiresIn: maxAge,
  });
};

/**
 * Registers a new user.
 *
 * @param request - The request object.
 * @param response - The response object.
 * @param next - The next function.
 * @returns A promise that resolves to the registered user.
 */
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

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
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

/**
 * Logs in a user.
 *
 * @param request - The request object.
 * @param response - The response object.
 * @param next - The next function.
 * @returns A promise that resolves to the logged in user.
 */
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

export const getUserInfo = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const userId = (request as any).userId || '';
    const userData = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userData) {
      response.status(400).send('User not found');
      return;
    }

    response.status(200).json({
      message: 'User data fetched successfully',
      user: {
        id: userData.id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        image: userData.image,
        profileSetup: userData.profileSetup,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    response.cookie('jwt', '', {
      secure: true,
      maxAge: 0,
      sameSite: 'none',
    });

    response.status(200).json({
      message: 'User logged out successfully',
    });
  } catch (error) {
    console.log(error);
  }
};
