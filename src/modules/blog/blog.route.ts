import { Router } from 'express';

import { BlogController } from './blog.controller';
import parseBodyString from '../../middlewares/parseBodyString';

import BlogImageUpload from './blog.upload-file';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  BlogImageUpload.single('file'),
  parseBodyString(),
  validateRequest(BlogValidation.addValidation),
  BlogController.addBlog,
);

router.get('/', BlogController.getAllBlogs);
router.get('/featured-blogs', BlogController.getFeaturedBlogs);

router.get('/:id', BlogController.getSingleBlog);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  BlogImageUpload.single('file'),
  parseBodyString(),
  validateRequest(BlogValidation.addValidation),
  BlogController.updateBlog,
);

router.delete('/:id', auth(USER_ROLE.admin), BlogController.deleteBlog);

export const BlogRouter = router;
