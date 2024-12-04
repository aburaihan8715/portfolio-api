import httpStatus from 'http-status';

import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { ILogin } from './auth.interface';
import createToken from './auth.utils';
import envConfig from '../../config/env.config';

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
    id: user._id,
    email: user.email,
    role: user.role as string,
  };

  const accessToken = createToken(
    jwtPayload,
    envConfig.JWT.jwt_access_secret as string,
    envConfig.JWT.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
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

export const AuthService = { loginIntoDB };
