import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import { convert } from 'html-to-text';

import { IFile } from '../../interface/file.interface';
import { ILogin, IUser } from '../user/user.interface';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import envConfig from '../../config/env.config';
import { sendEmailV2 } from '../../utils/sendEmailV2';
import { UserUtils } from './user.utils';

// REGISTER
const registerIntoDB = async (file: IFile, payload: IUser) => {
  if (file && file.path) {
    payload.profilePhoto = file.path;
  }

  const newUser = await User.create(payload);

  if (!newUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user !');
  }

  // delete password form the user
  const { password, __v, ...userWithoutPassword } = newUser.toObject();

  // return tokens and user to the controller
  return userWithoutPassword;
};

// LOGIN
const loginIntoDB = async (payload: ILogin) => {
  // checking if the user is exist
  const user = await User.getUserByEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  // checking if the password is correct
  const isPasswordCorrect = await User.isPasswordCorrect(
    payload?.password,
    user?.password as string,
  );
  if (!isPasswordCorrect) throw new AppError(400, 'Wrong credentials!');

  // create accessToken and refreshToken
  const jwtPayload = {
    _id: user._id,
    email: user.email,
    role: user.role as string,
  };

  const accessToken = UserUtils.createToken(
    jwtPayload,
    envConfig.JWT.jwt_access_secret as string,
    envConfig.JWT.jwt_access_expires_in as string,
  );

  const refreshToken = UserUtils.createToken(
    jwtPayload,
    envConfig.JWT.jwt_refresh_secret as string,
    envConfig.JWT.jwt_refresh_expires_in as string,
  );

  // delete password form the user
  const { password, __v, ...userWithoutPassword } = user.toObject();
  // user.password = '';

  // return tokens and user to the controller
  return {
    accessToken,
    refreshToken,
    userWithoutPassword,
  };
};

const updateProfileIntoDB = async (
  id: string,
  role: string,
  file: IFile,
  payload: Pick<IUser, 'name' | 'profilePhoto'>,
) => {
  // check if file
  if (file && file.path) {
    payload.profilePhoto = file.path;
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: id, role },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found !');
  }

  return updatedUser;
};

const getSingleUserFromDB = async (id: string) => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found !');
  }

  return user;
};

const getMeFromDB = async (id: string, role: string) => {
  const user = await User.findOne({ _id: id, role });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found !');
  }

  return user;
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

// GET REFRESH TOKEN
const getRefreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = await UserUtils.verifyToken(
    token,
    envConfig.JWT.jwt_refresh_secret as string,
  );

  const { _id, iat } = decoded;

  // checking if the user is exist
  const user = await User.getUserById(_id);

  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This user is not found with the token id !',
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

  const jwtPayload = {
    _id: user._id,
    role: user.role,
    email: user.email,
  };

  const accessToken = UserUtils.createToken(
    jwtPayload,
    envConfig.JWT.jwt_access_secret as string,
    envConfig.JWT.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

// FORGET PASSWORD
const forgetPassword = async (email: string) => {
  // checking if the user is exist
  const user = await User.getUserByEmail(email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'This user already is deleted !',
    );
  }

  const jwtPayload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };

  const resetToken = UserUtils.createToken(
    jwtPayload,
    envConfig.JWT.jwt_password_reset_secret as string,
    envConfig.JWT.jwt_password_reset_expires_in as string,
  );

  const URL =
    envConfig.NODE_ENV === 'production'
      ? envConfig.PASSWORD_RESET_UI_LINK
      : 'http://localhost:5173/reset-password';

  const passwordResetUiLink = `${URL}?email=${user.email}&token=${resetToken} `;

  // Load the email template
  const templatePath = path.join(
    process.cwd(),
    'public',
    'emailTemplate.html',
  );
  const templateSource = fs.readFileSync(templatePath, 'utf-8');
  const template = handlebars.compile(templateSource);

  // Replace placeholders in the template
  const html = template({
    NAME: user.name, // Pass the user's name (or fallback)
    RESET_LINK: passwordResetUiLink,
  });

  // Convert HTML to plain text
  const text = convert(html);

  // Send the email
  await sendEmailV2(user.email, html, text);
};

// RESET PASSWORD
const resetPassword = async (
  payload: { email: string; newPassword: string },
  token: string,
) => {
  // checking if the user is exist
  const user = await User.getUserByEmail(payload?.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  const decoded = await UserUtils.verifyToken(
    token,
    envConfig.JWT.jwt_password_reset_secret as string,
  );

  if (payload.email !== decoded.email) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!');
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(envConfig.BCRYPT_SALT_ROUNDS),
  );

  await User.findOneAndUpdate(
    {
      email: decoded.email,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    },
  );
};

export const UserService = {
  registerIntoDB,
  updateProfileIntoDB,
  getSingleUserFromDB,
  getMeFromDB,
  loginIntoDB,
  changePasswordIntoDB,
  getRefreshToken,
  forgetPassword,
  resetPassword,
};
