import type { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';

export const searchContacts = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = request as any;
    const { searchTerm } = request.body;

    if (!searchTerm || searchTerm.trim() === '') {
      response.status(400).send('Search term is required');
      return;
    }

    const contacts = await prisma.user.findMany({
      where: {
        AND: [
          {
            OR: [
              { firstName: { contains: searchTerm, mode: 'insensitive' } },
              { lastName: { contains: searchTerm, mode: 'insensitive' } },
            ],
          },
          { id: { not: userId } },
        ],
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    response.status(200).json({
      message: 'Contacts fetched successfully',
      contacts,
    });
  } catch (error) {
    console.error('Error in searching contacts:', error);
    response.status(500).send('Internal Server Error');
  }
};
