import httpStatus from 'http-status';
import { IFile } from '../../interface/file.interface';
import AppError from '../../errors/AppError';
import { Blog } from './blog.model';
import { IBlog } from './blog.interface';

const addBlogIntoDB = async (file: IFile, payload: IBlog) => {
  if (file && file.path) {
    payload.coverImage = file.path;
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

const getFeaturedBlogsFromDB = async () => {
  const result = await Blog.find({}).limit(3);
  return result;
};

const getSingleBlogFromDB = async (blogId: string) => {
  const result = await Blog.findById(blogId);

  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'No blog found with this ID !',
    );
  }

  return result;
};

const updateBlogIntoDB = async (
  file: IFile,
  payload: IBlog,
  blogId: string,
) => {
  if (file && file.path) {
    payload.coverImage = file.path;
  }

  const result = await Blog.findByIdAndUpdate(
    blogId,
    { ...payload },
    { new: true },
  );

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update data !');
  }

  return result;
};

const deleteBlogFromDB = async (blogId: string) => {
  const result = await Blog.findByIdAndDelete(blogId);

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete data !');
  }

  return result;
};

export const BlogService = {
  addBlogIntoDB,
  getAllBlogsFromDB,
  getSingleBlogFromDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
  getFeaturedBlogsFromDB,
};
