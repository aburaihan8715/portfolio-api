import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';

import auth from '../../middlewares/auth';
import { CouponValidation } from './coupon.validation';
import { CouponController } from './coupon.controller';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(CouponValidation.createValidationSchema),
  CouponController.createCoupon,
);

router.get('/', CouponController.getAllCategories);

router.get('/:id', CouponController.getSingleCoupon);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(CouponValidation.updateValidationSchema),
  CouponController.updateCoupon,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  CouponController.deleteCoupon,
);

export const CouponRouter = router;
