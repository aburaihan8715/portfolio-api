import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { IFile } from '../../interface/file.interface';
import { BlogService } from './blog.service';

const addBlog = catchAsync(async (req, res) => {
  const result = await BlogService.addBlogIntoDB(
    req.file as IFile,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data added successfully',
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogService.getAllBlogsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data fetched successfully',
    data: result,
  });
});

export const BlogController = {
  addBlog,
  getAllBlogs,
};
