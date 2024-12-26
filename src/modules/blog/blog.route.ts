import { Router } from 'express';

import { BlogController } from './blog.controller';
import parseBodyString from '../../middlewares/parseBodyString';

import BlogImageUpload from './blog.upload-file';

const router = Router();

router.post(
  '/',
  BlogImageUpload.single('file'),
  parseBodyString(),
  BlogController.addBlog,
);
router.get('/', BlogController.getAllBlogs);

export const BlogRouter = router;
