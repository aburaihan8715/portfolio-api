import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validation';
import { UserController } from './user.controller';

const router = Router();

router.post(
  '/register',
  validateRequest(UserValidation.createValidationSchema),
  UserController.register,
);

export const UserRouter = router;
