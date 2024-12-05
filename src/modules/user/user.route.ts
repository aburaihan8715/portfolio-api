import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validation';
import { UserController } from './user.controller';
import multerUpload from '../../utils/fileUpload';
import parseBodyString from '../../middlewares/parseBodyString';

const router = Router();

router.post(
  '/register',
  multerUpload.single('file'),
  parseBodyString(),
  validateRequest(UserValidation.createValidationSchema),
  UserController.register,
);

router.post('/profile-update/:id', UserController.updateProfile);

export const UserRouter = router;
