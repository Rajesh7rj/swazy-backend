import { app } from './app.js';
import { config } from './config/index.js';
import { logger } from './utils/logger.js';

const startServer = async () => {
    try {
        // Database connection would go here
        // await connectDB();

        app.listen(config.port, () => {
            logger.info(`Server running on port ${config.port} in ${config.env} mode`);
        });
    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
