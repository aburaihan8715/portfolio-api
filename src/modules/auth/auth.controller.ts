import { AuthService } from './auth.service';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import envConfig from '../../config/env.config';

// LOGIN
const login = catchAsync(async (req, res) => {
  const userInfo = await AuthService.loginIntoDB(req.body);

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

// CHANGE PASSWORD
const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  const result = await AuthService.changePasswordIntoDB(
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
  const result = await AuthService.getRefreshToken(refreshToken);

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
  const result = await AuthService.forgetPassword(email);
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
  const result = await AuthService.resetPassword(req.body, token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset successful!',
    data: result,
  });
});

export const AuthController = {
  login,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
