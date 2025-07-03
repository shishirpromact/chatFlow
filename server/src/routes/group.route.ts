import { createGroup, getGroupMessages, getUserGroups } from '@/controllers/channel.controller';
import { verifyToken } from '@/middlewares/authMiddleware';
import { Router } from 'express';

const groupRoutes = Router();

groupRoutes.post('/create-group', verifyToken, createGroup);
groupRoutes.get('/get-user-groups', verifyToken, getUserGroups);
groupRoutes.get('/get-group-messages/:channelId', verifyToken, getGroupMessages);

export default groupRoutes;
