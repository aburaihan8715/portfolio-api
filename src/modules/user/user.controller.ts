import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';
import { IFile } from '../../interface/file.interface';
import envConfig from '../../config/env.config';

// REGISTER
const register = catchAsync(async (req, res) => {
  const newUser = await UserService.registerIntoDB(
    req.file as IFile,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: newUser,
  });
});

// LOGIN
const login = catchAsync(async (req, res) => {
  console.log(req.body);
  const userInfo = await UserService.loginIntoDB(req.body);

  const { refreshToken, accessToken, userWithoutPassword } = userInfo;

  res.cookie('refreshToken', refreshToken, {
    secure: envConfig.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: { accessToken, user: userWithoutPassword },
  });
});

// UPDATE PROFILE OR UPDATE ME
const updateProfile = catchAsync(async (req, res) => {
  const updatedProfile = await UserService.updateProfileIntoDB(
    req.user._id,
    req.user.role,
    req.file as IFile,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully',
    data: updatedProfile,
  });
});

// GET SINGLE USER
const getSingleUser = catchAsync(async (req, res) => {
  const user = await UserService.getSingleUserFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully!',
    data: user,
  });
});

// GET ME
const getMe = catchAsync(async (req, res) => {
  const { _id, role } = req.user;

  const result = await UserService.getMeFromDB(_id, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved successfully',
    data: result,
  });
});

// CHANGE PASSWORD
const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  const result = await UserService.changePasswordIntoDB(
    req.user,
    passwordData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password is changed successfully!',
    data: result,
  });
});

// REFRESH TOKEN
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await UserService.getRefreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Refresh token is retrieved successfully!',
    data: result,
  });
});

// FORGET PASSWORD
const forgetPassword = catchAsync(async (req, res) => {
  const email = req.body.email;
  const result = await UserService.forgetPassword(email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset link is generated successfully!',
    data: result,
  });
});

// RESET PASSWORD
const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1] as string;
  const result = await UserService.resetPassword(req.body, token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset successful!',
    data: result,
  });
});

export const UserController = {
  register,
  updateProfile,
  getSingleUser,
  getMe,
  login,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
