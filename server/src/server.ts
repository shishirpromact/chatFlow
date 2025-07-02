/**
 * Node modules
 */
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from '@/config';
import authRoutes from './routes/auth.route';
import userRoutes from './routes/user.route';
import contactRoutes from './routes/contact.route';
import setupSocket from './socket';
import messageRoutes from './routes/message.route';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/message', messageRoutes);

const server = app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});

setupSocket(server);
