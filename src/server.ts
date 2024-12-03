import mongoose from 'mongoose';
import app from './app';
import envConfig from './config/env.config';

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
