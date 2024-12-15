/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources } from '../interface/error';

const handleJWTError = () => {
  const statusCode = httpStatus.UNAUTHORIZED;
  const message = 'Invalid token. Please log in again!';
  const errorSources: TErrorSources = [
    {
      path: '',
      message,
    },
  ];

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handleJWTError;
