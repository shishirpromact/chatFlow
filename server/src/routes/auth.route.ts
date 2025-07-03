import { getUserInfo, login, logout, register } from '@/controllers/auth.controller';
import { verifyToken } from '@/middlewares/authMiddleware';
import { Router } from 'express';

const authRoutes = Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.get('/user-info', verifyToken, getUserInfo);
authRoutes.post('/logout', verifyToken, logout);


export default authRoutes;
