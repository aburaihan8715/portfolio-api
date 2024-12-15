import jwt, { JwtPayload } from 'jsonwebtoken';

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
  } catch (error) {
    console.log('Failed to verify token', error);
    throw error;
  }
};

export const AuthUtils = { createToken, verifyToken };
