import QueryBuilder from '../../builder/QueryBuilder';
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

const makeAdminIntoDB = async (id: string) => {
  const user = (await User.findByIdAndUpdate(
    id,
    { role: 'admin' },
    { new: true },
  )) as IUser;

  // delete password form the user
  const { password, __v, ...userWithoutPassword } = user.toObject();

  return userWithoutPassword;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .search(['name', 'email', 'role', 'phone', 'address'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await userQuery.modelQuery;
  const meta = await userQuery.calculatePagination();

  return {
    meta,
    result,
  };
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

const deleteUserFromDB = async (id: string) => {
  const user = await User.findByIdAndUpdate(id, { isDeleted: true });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found !');
  }

  return user;
};

export const UserService = {
  registerIntoDB,
  updateProfileIntoDB,
  makeAdminIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  getMeFromDB,
};
