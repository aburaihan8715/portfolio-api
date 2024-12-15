import { Router } from 'express';

import auth from '../../middlewares/auth';

import { CartController } from './cart.controller';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post('/', auth(USER_ROLE.customer), CartController.createCart);
router.get('/', auth(USER_ROLE.customer), CartController.getCarts);

export const CartRouter = router;
