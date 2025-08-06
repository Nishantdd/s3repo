import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import imageRoutes from './routes/image.route.js';
import { config } from './utils/config.js';

const PORT = config.PORT || 8000;
const fastify = Fastify({ logger: false });

// Cross Origin Resource Sharing
fastify.register(fastifyCors, {
    origin: config.CLIENT_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    maxAge: 86400
});

// Register routes
fastify.register(authRoutes);
fastify.register(userRoutes);
fastify.register(imageRoutes);

// Error handling for type box validations
fastify.setErrorHandler((error, request, reply) => {
    if (error.validation) {
        reply.status(400).send({
            statusCode: 400,
            error: 'Bad Request',
            message: error.message
        });
    }
});

// Start server
fastify.listen({ port: PORT, host: '0.0.0.0' }, err => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`Server running on port ${PORT}`);
});
