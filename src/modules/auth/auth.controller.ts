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

export const AuthController = { login };
