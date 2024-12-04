import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { ILogin } from './auth.interface';

import envConfig from '../../config/env.config';
import { AuthUtils } from './auth.utils';

// LOGIN
const loginIntoDB = async (payload: ILogin) => {
  // 01. checking if the user is exist
  const user = await User.getUserByEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  // 02. checking if the password is correct
  const isPasswordCorrect = await User.isPasswordCorrect(
    payload?.password,
    user?.password as string,
  );
  if (!isPasswordCorrect) throw new AppError(400, 'Wrong credentials!');

  // 03. create accessToken and refreshToken
  const jwtPayload = {
    _id: user._id,
    email: user.email,
    role: user.role as string,
  };

  const accessToken = AuthUtils.createToken(
    jwtPayload,
    envConfig.JWT.jwt_access_secret as string,
    envConfig.JWT.jwt_access_expires_in as string,
  );

  const refreshToken = AuthUtils.createToken(
    jwtPayload,
    envConfig.JWT.jwt_refresh_secret as string,
    envConfig.JWT.jwt_refresh_expires_in as string,
  );

  // 04. delete password form the user
  const { password, __v, ...userWithoutPassword } = user.toObject();
  // user.password = '';

  // 05. return tokens and user to the controller
  return {
    accessToken,
    refreshToken,
    userWithoutPassword,
  };
};

// CHANGE PASSWORD
const changePasswordIntoDB = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking if the user is exist
  const user = await User.getUserById(userData._id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the password is correct
  if (
    !(await User.isPasswordCorrect(payload.oldPassword, user?.password))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }

  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(envConfig.BCRYPT_SALT_ROUNDS),
  );

  await User.findOneAndUpdate(
    {
      _id: userData._id,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    },
    { runValidators: true },
  );

  return null;
};

export const AuthService = { loginIntoDB, changePasswordIntoDB };
