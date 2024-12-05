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
  // console.log(JSON.parse(req.body.data));
  // console.log(req.file);
  const id = req.user._id;
  const updatedProfile = await UserService.updateProfileIntoDB(
    id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully',
    data: updatedProfile,
  });
});

export const UserController = { register, updateProfile };
