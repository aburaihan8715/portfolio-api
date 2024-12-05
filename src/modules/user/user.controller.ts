import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';
import { IFile } from '../../interface/file.interface';

// CREATE OR REGISTER
const register = catchAsync(async (req, res) => {
  const newUser = await UserService.registerIntoDB(
    req.file as IFile,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully!',
    data: newUser,
  });
});

// UPDATE PROFILE
const updateProfile = catchAsync(async (req, res) => {
  const updatedProfile = await UserService.updateProfileIntoDB(
    req.user._id,
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
const makeRole = catchAsync(async (req, res) => {
  const userWithUpdatedRole = await UserService.makeRoleIntoDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Role updated successfully',
    data: userWithUpdatedRole,
  });
});
export const UserController = { register, updateProfile, makeRole };
