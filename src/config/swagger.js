import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MediQueue API',
      version: '1.0.0',
      description: 'Tutor Booking System API',
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
