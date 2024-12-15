import { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';
import { ZodError } from 'zod';

import envConfig from '../config/env.config';
import AppError from '../errors/AppError';
import handleJWTError from '../errors/handleJWTError';
import handleJWTExpiredError from '../errors/handleJWTExpiredError';
import zodValidationError from '../errors/zodValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import mongooseValidationError from '../errors/mongooseValidationError';
import { TErrorSources } from '../interface/error';

const globalError: ErrorRequestHandler = (err, req, res, _next) => {
  let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  const success = false;
  let message = 'Something went wrong!';
  let errorSources: TErrorSources = [
    {
      path: '',
      message,
    },
  ];

  const error = envConfig.NODE_ENV === 'development' ? err : null;
  const stack = envConfig.NODE_ENV === 'development' ? err?.stack : null;

  if (err.name === 'JsonWebTokenError') {
    const simplifiedError = handleJWTError();
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err.name === 'TokenExpiredError') {
    const simplifiedError = handleJWTExpiredError();
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err.name === 'ValidationError') {
    const simplifiedError = mongooseValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof ZodError) {
    const simplifiedError = zodValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  res.status(statusCode).json({
    success,
    message,
    errorSources,
    error,
    stack,
  });
};

export default globalError;
