import { searchContacts } from '@/controllers/contact.controller';
import { verifyToken } from '@/middlewares/authMiddleware';
import { Router } from 'express';

const contactRoutes = Router();

contactRoutes.post('/search', verifyToken, searchContacts);

export default contactRoutes;
