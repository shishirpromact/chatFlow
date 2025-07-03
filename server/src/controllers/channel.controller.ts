import type { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';

export const createGroup = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = request as any;
    const { name, members } = request.body as {
      name: string;
      members: string[];
    };

    if (!name || !members || !Array.isArray(members) || members.length === 0) {
      response.status(400).json({ message: 'Invalid group data' });
      return;
    }

    const adminExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!adminExists) {
      response.status(404).json({ message: 'Admin user not found' });
      return;
    }

    const foundMembers = await prisma.user.findMany({
      where: { id: { in: members } },
    });

    if (foundMembers.length !== members.length) {
      response.status(400).json({ message: 'One or more members are invalid' });
      return;
    }

    const allMemberIds = [...new Set([...members, userId])];

    const newGroup = await prisma.channel.create({
      data: {
        name,
        adminId: userId,
        members: {
          connect: allMemberIds.map((id) => ({ id })),
        },
      },
      include: {
        members: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        admin: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    });

    response.status(201).json({
      message: 'Channel created successfully',
      channel: newGroup,
    });
  } catch (error) {
    console.error('Error creating group', error);
    response.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getUserGroups = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = request as any;

    const userGroups = await prisma.channel.findMany({
      where: {
        OR: [{ adminId: userId }, { members: { some: { id: userId } } }],
      },
      include: {
        members: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        admin: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    });

    response.status(201).json({
      message: 'Channel created successfully',
      groups: userGroups,
    });
  } catch (error) {
    console.error('Error creating group', error);
    response.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getGroupMessages = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { channelId } = request.params as { channelId: string };

    const messages = await prisma.message.findMany({
      where: {
        channelId,
      },
      include: {
        sender: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        recipient: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    });

    response.status(201).json({
      message: 'Messages fetched successfully',
      messages,
    });
  } catch (error) {
    console.error('Error creating group', error);
    response.status(500).json({ message: 'Internal Server Error' });
  }
};
