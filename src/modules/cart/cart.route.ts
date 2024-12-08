import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';

import auth from '../../middlewares/auth';
import { CartValidation } from './cart.validation';
import { CartController } from './cart.controller';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(CartValidation.createValidationSchema),
  CartController.createCart,
);

router.get('/', CartController.getAllCategories);

router.get('/:id', CartController.getSingleCart);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(CartValidation.updateValidationSchema),
  CartController.updateCart,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  CartController.deleteCart,
);

export const CartRouter = router;
