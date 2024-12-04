import mongoose from 'mongoose';
import app from './app';
import envConfig from './config/env.config';
import { Server } from 'http';

let server: Server;

process.on('uncaughtException', (error) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error('Uncaught Exception Error:', error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error('Unhandled Rejection Error:', error);
  if (server) {
    server.close(() => {
      console.error('Server closed due to unhandled rejection');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

async function main() {
  try {
    await mongoose.connect(envConfig.DATABASE_URL as string);
    console.log('🛢 Database connected successfully');

    app.listen(envConfig.PORT, () => {
      console.log(
        `🚀 Application is running at http://localhost:${envConfig.PORT}`,
      );
    });
  } catch (err) {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  }
}

main();
