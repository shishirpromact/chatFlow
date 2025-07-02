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
    console.log('I am at the sendMessage function');
    const senderSocketId = userSocketMap.get(message.sender);
    const recipientSocketId = userSocketMap.get(message.recipient);

    const createdMessage = await prisma.message.create({
      data: {
        senderId: message.sender,
        recipientId: message.recipient,
        content: message.content,
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
    socket.on('disconnect', () => disconnect(socket));
  });
};

export default setupSocket;
