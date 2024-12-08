import mongoose, { Error } from 'mongoose';
import envConfig from './config/env.config';
import { Server } from 'http';
import app from './app';

let server: Server;

// UNCAUGHT EXCEPTION
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION DETECTED! 💥 Shutting down...');
  console.log('Error name:=>', err.name);
  console.log('Error message:=>', err.message);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

async function main() {
  await mongoose
    .connect(envConfig.DATABASE_URL as string, {})
    .then(() => console.log('🛢 Database connected successfully'));

  const port = process.env.PORT;
  server = app.listen(port, () => {
    console.log(
      `🚀 Application is running at http://localhost:${envConfig.PORT}`,
    );
  });
}
main();

// UNHANDLED REJECTIONS
process.on('unhandledRejection', (err: Error) => {
  console.log('UNHANDLED REJECTION DETECTED! 💥 Shutting down...');
  console.log('Error name:=>', err.name);
  console.log('Error message:=>', err.message);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
