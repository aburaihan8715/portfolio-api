/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources } from '../interface/error';

const handleJWTError = (err: any) => {
  const statusCode = httpStatus.UNAUTHORIZED;
  const message = 'Invalid token. Please log in again!';
  const errorSources: TErrorSources = [
    {
      path: '',
      message: err.message,
    },
  ];

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handleJWTError;
