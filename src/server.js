import app from './app';
import config from './config/config';
import connectDB from './config/db';
import logger from './config/logger';

// Connect to MongoDB
connectDB();

const serverPort = config.server.port || 3000;

const server = app.listen(serverPort, () => {
  logger.info(`
      ################################################
      🚀 Server listening on port: ${serverPort} 🚀
      ################################################
  `);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
