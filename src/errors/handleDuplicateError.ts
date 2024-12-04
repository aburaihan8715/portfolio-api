import httpStatus from 'http-status';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

interface IDuplicateError extends Error {
  code?: number;
  keyValue?: Record<string, string>;
}

const handleDuplicateError = (
  err: IDuplicateError,
): TGenericErrorResponse => {
  const statusCode = httpStatus.BAD_REQUEST;
  const message = 'Duplicate key error';
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

export default handleDuplicateError;
