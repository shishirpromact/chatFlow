import { Server as SocketIOServer } from 'socket.io';
import { prisma } from './lib/prisma';

const setupSocket = (server: any) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  const userSocketMap = new Map();

  const sendMessage = async (message: any) => {
    const senderSocketId = userSocketMap.get(message.sender);
    const recipientSocketId = userSocketMap.get(message.recipient);

    const createdMessage = await prisma.message.create({
      data: {
        senderId: message.sender,
        recipientId: message.recipient,
        content: message.content,
        senderName: message.senderName,
      },
    });

    const messageData = await prisma.message.findUnique({
      where: {
        id: createdMessage.id,
      },
      include: {
        sender: true,
        recipient: true,
      },
    });

    if (recipientSocketId) {
      io.to(recipientSocketId).emit('receiveMessage', messageData);
    }

    if (senderSocketId) {
      io.to(senderSocketId).emit('receiveMessage', messageData);
    }
  };

  const sendChannelMessage = async (message: any) => {
    const { channelId, sender, content, senderName } = message;

    // 1. Create message
    const createdMessage = await prisma.message.create({
      data: {
        senderId: sender,
        content: content,
        channelId: channelId,
        senderName: senderName,
      },
    });

    // 2. Fetch enriched message
    const messageData = await prisma.message.findUnique({
      where: { id: createdMessage.id },
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            image: true,
          },
        },
        channel: {
          include: {
            members: true,
            admin: true,
          },
        },
      },
    });

    if (!messageData || !messageData.channel) return;

    const finalData = {
      ...messageData,
      channelId: channelId,
    };

    const { members, admin } = messageData.channel;

    // 3. Build unique recipient set
    const allRecipients = new Set<string>();
    members.forEach((member) => allRecipients.add(member.id));
    if (!allRecipients.has(admin.id)) {
      allRecipients.add(admin.id);
    }

    // 4. Emit to all recipients
    allRecipients.forEach((userId) => {
      const socketId = userSocketMap.get(userId);
      if (socketId) {
        io.to(socketId).emit('receive-channel-message', finalData);
      }
    });
  };

  const disconnect = (socket: any) => {
    console.log(`User disconnected: ${socket.id}`);
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };

  io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User Connected: ${userId} with socket ID: ${socket.id}`);
    } else {
      console.log('User not found');
    }

    socket.on('sendMessage', sendMessage);
    socket.on('send-channel-message', sendChannelMessage);
    socket.on('disconnect', () => disconnect(socket));
  });
};

export default setupSocket;
