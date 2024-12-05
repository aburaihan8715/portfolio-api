import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validation';
import { UserController } from './user.controller';
import multerUpload from '../../utils/fileUpload';
import parseBodyString from '../../middlewares/parseBodyString';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = Router();

router.post(
  '/register',
  multerUpload.single('file'),
  parseBodyString(),
  validateRequest(UserValidation.createValidationSchema),
  UserController.register,
);

router.patch(
  '/profile-update/:id',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.customer,
    USER_ROLE.vendor,
  ),
  multerUpload.single('file'),
  parseBodyString(),
  validateRequest(UserValidation.updateProfileValidationSchema),
  UserController.updateProfile,
);

router.patch(
  '/make-role/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(UserValidation.makeRoleValidationSchema),
  UserController.makeRole,
);

export const UserRouter = router;
