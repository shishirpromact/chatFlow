import { getMessages } from '@/controllers/message.controller';
import { verifyToken } from '@/middlewares/authMiddleware';
import { Router } from 'express';

const messageRoutes = Router();

messageRoutes.post('/get-messages', verifyToken, getMessages);

export default messageRoutes;
