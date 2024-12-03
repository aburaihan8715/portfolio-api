import dotenv from 'dotenv';

dotenv.config();

export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 5001,
  DATABASE_URL: process.env.DATABASE_URL_ATLAS,
};
