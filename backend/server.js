import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { pino } from 'pino';
import pinoHttp from 'pino-http';
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: { colorize: true }
  },
});

app.use(cors());
app.use(express.json());
app.use(pinoHttp({ logger }));

app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

app.use((err, req, res, next) => {
  req.log.error({ err: err.message, stack: err.stack }, 'Server error');
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});