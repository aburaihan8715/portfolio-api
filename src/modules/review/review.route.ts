import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';

import auth from '../../middlewares/auth';
import { ReviewValidation } from './review.validation';
import { ReviewController } from './review.controller';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(ReviewValidation.createValidationSchema),
  ReviewController.createReview,
);

router.get('/', ReviewController.getAllCategories);

router.get('/:id', ReviewController.getSingleReview);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(ReviewValidation.updateValidationSchema),
  ReviewController.updateReview,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ReviewController.deleteReview,
);

export const ReviewRouter = router;
