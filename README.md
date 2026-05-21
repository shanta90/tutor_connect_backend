# TutorConnect Backend

Welcome to the TutorConnect Backend service. This service provides a RESTful API to manage student bookings and tutor profiles.

## Tech Stack
- **Runtime**: Node.js & Express.js
- **Database**: MongoDB & Mongoose
- **Security**: JWT & bcryptjs, Helmet, HPP, Mongo-Sanitize, Rate Limiter

## Environment Variables
The application requires the following environment variables:
- `PORT`: Server port (default 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key used for signing JWTs
- `JWT_EXPIRES_IN`: JWT expiration length (e.g., 30d)
- `CLIENT_URL`: Client URL for CORS policy configurations
