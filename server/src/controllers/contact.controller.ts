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

export const getDMContacts = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = request as any;

    // 1. Find all messages where the user is either sender or recipient
    const messages = await prisma.message.findMany({
      where: {
        OR: [{ senderId: userId }, { recipientId: userId }],
      },
      select: {
        senderId: true,
        recipientId: true,
      },
    });

    // 2. Collect all unique "other" user IDs
    const contactIds = new Set<string>();

    messages.forEach((msg) => {
      if (msg.senderId !== userId) {
        contactIds.add(msg.senderId);
      }
      if (msg.recipientId && msg.recipientId !== userId) {
        contactIds.add(msg.recipientId);
      }
    });

    // 3. Fetch user data for those contact IDs
    const contacts = await prisma.user.findMany({
      where: {
        id: {
          in: Array.from(contactIds),
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        image: true,
      },
    });

    response.status(200).json({
      message: 'Unique contacts fetched successfully',
      contacts,
    });
  } catch (error) {
    console.error('Error fetching DM contacts:', error);
    response.status(500).send('Internal Server Error');
  }
};

export const getAllContacts = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = request as any;
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: userId,
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    const contacts = users.map((user) => {
      return {
        label: user.firstName
          ? `${user.firstName} ${user.lastName}`
          : user.email,
        value: user.id,
      };
    });

    response.status(200).json({
      message: 'Unique contacts fetched successfully',
      contacts,
    });
  } catch (error) {
    console.error('Error fetching all contacts:', error);
    response.status(500).send('Internal Server Error');
  }
};
