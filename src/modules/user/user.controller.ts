import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';
import { IFile } from '../../interface/file.interface';
import sendNotFoundDataResponse from '../../utils/sendNotFoundDataResponse';
import envConfig from '../../config/env.config';

// CREATE OR REGISTER
const register = catchAsync(async (req, res) => {
  const newUserInfo = await UserService.registerIntoDB(
    req.file as IFile,
    req.body,
  );

  const { refreshToken, accessToken, userWithoutPassword } = newUserInfo;

  res.cookie('refreshToken', refreshToken, {
    secure: envConfig.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
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

// MAKE ROLE
const makeAdmin = catchAsync(async (req, res) => {
  const adminUser = await UserService.makeAdminIntoDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin made successfully',
    data: adminUser,
  });
});

// GET ALL USERS
const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserService.getAllUsersFromDB(req.query);

  if (!result || result?.result.length < 1) {
    return sendNotFoundDataResponse(res);
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All users retrieved successfully!',
    meta: result.meta,
    data: result.result,
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

// DELETE USER
const deleteUser = catchAsync(async (req, res) => {
  const user = await UserService.deleteUserFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully!',
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

export const UserController = {
  register,
  updateProfile,
  makeAdmin,
  getAllUsers,
  getSingleUser,
  deleteUser,
  getMe,
};
