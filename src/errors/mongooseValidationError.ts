import mongoose from 'mongoose';
import httpStatus from 'http-status';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const mongooseValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const statusCode = httpStatus.BAD_REQUEST;
  const message = 'Validation Error';
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default mongooseValidationError;
