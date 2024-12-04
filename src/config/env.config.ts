import dotenv from 'dotenv';

dotenv.config();

export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 5001,
  DATABASE_URL: process.env.DATABASE_URL_ATLAS,
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,

  JWT: {
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    jwt_password_reset_secret: process.env.JWT_PASSWORD_RESET_SECRET,
    jwt_password_reset_expires_in:
      process.env.JWT_PASSWORD_RESET_EXPIRES_IN,
  },
};
