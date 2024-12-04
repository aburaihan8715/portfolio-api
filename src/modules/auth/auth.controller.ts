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
    data: { accessToken, userWithoutPassword },
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

export const AuthController = { login, changePassword };
