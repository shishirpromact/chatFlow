import { getUserInfo, login, register } from '@/controllers/auth.controller';
import { verifyToken } from '@/middlewares/authMiddleware';
import { Router } from 'express';

const authRoutes = Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.get('/user-info', verifyToken, getUserInfo);

export default authRoutes;
