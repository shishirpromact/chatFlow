import {
  getAllContacts,
  getDMContacts,
  searchContacts,
} from '@/controllers/contact.controller';
import { verifyToken } from '@/middlewares/authMiddleware';
import { Router } from 'express';

const contactRoutes = Router();

contactRoutes.post('/search', verifyToken, searchContacts);
contactRoutes.get('/get-dm-contacts', verifyToken, getDMContacts);
contactRoutes.get('/get-all-contacts', verifyToken, getAllContacts);

export default contactRoutes;
