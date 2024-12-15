import { Router } from 'express';
import { PaymentController } from './payment.controller';
import { PaymentValidation } from './payment.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/create-payment-intent',
  auth(USER_ROLE.customer),
  validateRequest(PaymentValidation.createPaymentIntentValidation),
  PaymentController.createPaymentIntent,
);
router.post(
  '/create-payment',
  auth(USER_ROLE.customer),
  validateRequest(PaymentValidation.createPaymentValidation),
  PaymentController.createPayment,
);

export const PaymentRouter = router;
