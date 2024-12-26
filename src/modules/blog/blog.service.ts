import httpStatus from 'http-status';
import { IFile } from '../../interface/file.interface';
import AppError from '../../errors/AppError';
import { Blog } from './blog.model';
import { IBlog } from './blog.interface';

const addBlogIntoDB = async (file: IFile, payload: IBlog) => {
  if (file && file.path) {
    payload.image = file.path;
  }

  const result = await Blog.create(payload);

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create data !');
  }

  return result;
};

const getAllBlogsFromDB = async () => {
  const result = await Blog.find({});
  return result;
};

export const BlogService = {
  addBlogIntoDB,
  getAllBlogsFromDB,
};
