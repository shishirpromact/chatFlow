import { updateProfile } from '@/controllers/user.controller';
import { verifyToken } from '@/middlewares/authMiddleware';
import { Router } from 'express';

const userRoutes = Router();

userRoutes.patch('/update-profile', verifyToken, updateProfile);

export default userRoutes;
