import { Request, RequestHandler, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';

const catchAsync = (asyncFn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await asyncFn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default catchAsync;
