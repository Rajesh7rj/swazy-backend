import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
import { config } from './config/index.js';
import { errorHandler } from './middleware/error.middleware.js';
import { morganMiddleware } from './middleware/logger.middleware.js';
import routes from './routes/index.js';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
    origin: config.corsOrigin,
    credentials: true,
}));

// Request parsing
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());
app.use(compression());

// Logging
app.use(morganMiddleware);

// Routes
app.use('/api/v1', routes);

// Error Handling
app.use(errorHandler);

export { app };
