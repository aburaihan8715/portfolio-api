import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';

import auth from '../../middlewares/auth';
import { FlashSaleValidation } from './flashSale.validation';
import { FlashSaleController } from './flashSale.controller';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(FlashSaleValidation.createValidationSchema),
  FlashSaleController.createFlashSale,
);

router.get('/', FlashSaleController.getAllCategories);

router.get('/:id', FlashSaleController.getSingleFlashSale);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(FlashSaleValidation.updateValidationSchema),
  FlashSaleController.updateFlashSale,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  FlashSaleController.deleteFlashSale,
);

export const FlashSaleRouter = router;
