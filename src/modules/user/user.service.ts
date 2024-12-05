import AppError from '../../errors/AppError';
import { IFile } from '../../interface/file.interface';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import httpStatus from 'http-status';

// REGISTER
const registerIntoDB = async (file: IFile, payload: IUser) => {
  if (file && file.path) {
    payload.profilePhoto = file.path;
  }
  const result = await User.create(payload);

  return result;
};

const updateProfileIntoDB = async (
  id: string,
  file: IFile,
  payload: Pick<IUser, 'name' | 'profilePhoto' | 'address' | 'phone'>,
) => {
  // check if file
  if (file && file.path) {
    payload.profilePhoto = file.path;
  }
  // check user exists
  let user = await User.getUserById(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found !');
  }

  // update the password field
  user = (await User.findByIdAndUpdate(id, payload, {
    new: true,
  })) as IUser;

  // delete password form the user
  const { password, __v, ...userWithoutPassword } = user.toObject();

  // return tokens and user to the controller
  return userWithoutPassword;
};

const makeRoleIntoDB = async (
  id: string,
  payload: Pick<IUser, 'role'>,
) => {
  const userWithUpdatedRole = (await User.findByIdAndUpdate(
    id,
    { role: payload.role },
    { new: true },
  )) as IUser;

  // delete password form the user
  const { password, __v, ...userWithoutPassword } =
    userWithUpdatedRole.toObject();

  return userWithoutPassword;
};

export const UserService = {
  registerIntoDB,
  updateProfileIntoDB,
  makeRoleIntoDB,
};
