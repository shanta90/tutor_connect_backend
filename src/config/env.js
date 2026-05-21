import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '30d',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
};
