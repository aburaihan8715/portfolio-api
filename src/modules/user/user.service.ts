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
  role: string,
  file: IFile,
  payload: Pick<IUser, 'name' | 'profilePhoto' | 'address' | 'phone'>,
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

const makeAdminIntoDB = async (id: string) => {
  const adminUser = (await User.findByIdAndUpdate(
    id,
    { role: 'admin' },
    { new: true },
  )) as IUser;

  return adminUser;
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
