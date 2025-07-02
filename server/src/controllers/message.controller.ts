import type { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';

export const getMessages = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const user1 = (request as any).userId;
    const user2 = request.body.id;

    if (!user1 || !user2) {
      response.status(400).send('Bad Request');
      return;
    }

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: user1,
            recipientId: user2,
          },
          {
            senderId: user2,
            recipientId: user1,
          },
        ],
      },
      include: {
        sender: true,
        recipient: true,
      },
      orderBy: {
        timeStamp: 'asc',
      },
    });

    response.status(200).json({
      message: 'Contacts fetched successfully',
      messages,
    });
  } catch (error) {
    console.error('Error in searching contacts:', error);
    response.status(500).send('Internal Server Error');
  }
};
