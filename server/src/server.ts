/**
 * Node modules
 */
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from '@/config';
import authRoutes from './routes/auth.route';

const app = express();

app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use("/api/auth", authRoutes)

const server = app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
});