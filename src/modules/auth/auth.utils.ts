import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createToken = (
  payload: Record<string, unknown>,
  secretKey: string,
  expiresIn = '1h',
) => {
  if (typeof payload !== 'object' || !payload)
    throw new Error('Payload must be a non-empty object!');

  if (typeof secretKey !== 'string' || secretKey === '')
    throw new Error('Secret key must be a non-empty string!');

  try {
    const token = jwt.sign(payload, secretKey, { expiresIn });
    return token;
  } catch (error) {
    console.error('Failed to sing the JWT:', error);
    throw error;
  }
};

const verifyToken = async (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (err) {
    console.log('Unauthorize OR failed to verify token', err);
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Unauthorize OR failed to verify token',
    );
  }
};

export const AuthUtils = { createToken, verifyToken };
