import { Router } from 'express';

import auth from '../../middlewares/auth';

import { CartController } from './cart.controller';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post('/', auth(USER_ROLE.customer), CartController.addCart);
router.get('/', auth(USER_ROLE.customer), CartController.getCart);
router.patch(
  '/increment/:productId',
  auth(USER_ROLE.customer),
  CartController.incrementQuantity,
);
router.patch(
  '/decrement/:productId',
  auth(USER_ROLE.customer),
  CartController.decrementQuantity,
);

router.delete(
  '/remove/:productId',
  auth(USER_ROLE.customer),
  CartController.removeCartItem,
);

router.delete('/:id', auth(USER_ROLE.customer), CartController.clearCart);

export const CartRouter = router;
