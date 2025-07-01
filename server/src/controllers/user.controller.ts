import type { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';

export const updateProfile = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { userId } = request as any;

  const { firstName, lastName } = request.body;

  if (!firstName && !lastName) {
    response.status(400).send('Missing firstName or lastName');
    return;
  }

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        firstName,
        lastName,
        profileSetup: true,
      },
    });

    response.status(200).json({
      message: 'User profile updated successfully',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        image: updatedUser.image,
        profileSetup: updatedUser.profileSetup,
      },
    });
  } catch (error) {
    console.log('Error updating user profile', error);
  }
};
