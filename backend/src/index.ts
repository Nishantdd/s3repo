import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import authRoutes from './routes/auth.js';

const PORT = 8000;
const fastify = Fastify({ logger: false });

fastify.register(fastifyCors, {
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    maxAge: 86400
});

fastify.register(authRoutes);

fastify.listen({ port: PORT }, err => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`Server running on port ${PORT}`);
});
