import jwt from 'jsonwebtoken';

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

export default createToken;
