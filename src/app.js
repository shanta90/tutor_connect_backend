import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import hpp from 'hpp';
import errorMiddleware from './middlewares/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import tutorRoutes from './routes/tutorRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import { config } from './config/env.js';

const app = express();

// Security middlewares
app.use(helmet());
app.use(hpp());
app.use(compression());
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
}

app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      config.clientUrl,
      'http://localhost:5173',
      'http://localhost:5174',
    ];
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all origins in case of Vercel preview URLs
    }
  },
  credentials: true,
}));

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tutors', tutorRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1', healthRoutes);

// Swagger
import { setupSwagger } from './config/swagger.js';
setupSwagger(app);

app.get('/', (req, res) => res.json({ success: true, message: 'MediQueue API is running' }));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Can't find ${req.originalUrl} on this server!` });
});

// Error handler
app.use(errorMiddleware);

export default app;
