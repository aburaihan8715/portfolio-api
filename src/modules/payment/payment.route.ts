import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';

import auth from '../../middlewares/auth';
import { PaymentValidation } from './payment.validation';
import { PaymentController } from './payment.controller';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(PaymentValidation.createValidationSchema),
  PaymentController.createPayment,
);

router.get('/', PaymentController.getAllCategories);

router.get('/:id', PaymentController.getSinglePayment);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(PaymentValidation.updateValidationSchema),
  PaymentController.updatePayment,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  PaymentController.deletePayment,
);

export const PaymentRouter = router;
