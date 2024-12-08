import { Router } from 'express';

import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { ProductController } from './product.controller';
import parseBodyString from '../../middlewares/parseBodyString';
import ProductsImagesUpload from './product.utils';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.vendor),
  ProductsImagesUpload.array('files', 3),
  parseBodyString(),
  ProductController.createProduct,
);

router.get('/', ProductController.getAllProducts);

router.get('/:id', ProductController.getSingleProduct);

router.patch(
  '/:id',
  auth(USER_ROLE.vendor),
  ProductsImagesUpload.array('files', 3),
  parseBodyString(),
  ProductController.updateProduct,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.vendor),
  ProductController.deleteProduct,
);

export const ProductRouter = router;
