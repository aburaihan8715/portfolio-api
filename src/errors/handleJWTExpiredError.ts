/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources } from '../interface/error';
import httpStatus from 'http-status';

const handleJWTExpiredError = (err: any) => {
  const statusCode = httpStatus.UNAUTHORIZED;
  const message = 'Your token has expired. Please log in again!';
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

export default handleJWTExpiredError;
