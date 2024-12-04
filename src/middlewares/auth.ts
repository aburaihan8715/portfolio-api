import { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';
import { User } from '../modules/user/user.model';
import AppError from '../errors/AppError';
import { AuthUtils } from '../modules/auth/auth.utils';
import envConfig from '../config/env.config';
import httpStatus from 'http-status';

const auth = (...roles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    // check token
    let token = '';
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not logged in! Please log in to get access!',
      );
    }

    // verify the token
    const decodedData = await AuthUtils.verifyToken(
      token,
      envConfig.JWT.jwt_access_secret as string,
    );

    const { role, _id, iat } = decodedData;

    // check user still exists
    const user = await User.getUserById(_id);
    if (!user) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'User with this token id, no longer exists!',
      );
    }

    // checking if the user is already deleted
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'This user already is deleted !',
      );
    }

    // check if password changed after jwt issued
    if (
      user.passwordChangedAt &&
      User.isPasswordChangedAfterJwtIssued(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'User recently changed password! Please login again!',
      );
    }

    // check authorization if needed
    if (roles && !roles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Role does not match with the token role!',
      );
    }

    // set user in the request
    req.user = decodedData as JwtPayload;

    // grand access the user!!
    next();
  });
};

export default auth;
