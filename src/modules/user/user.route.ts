import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';
import parseBodyString from '../../middlewares/parseBodyString';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import UserImageUpload from './user.upload-file';

const router = Router();

router.post(
  '/register',
  validateRequest(UserValidation.registerValidationSchema),
  UserController.register,
);

router.post(
  '/login',
  validateRequest(UserValidation.loginValidationSchema),
  UserController.login,
);

router.patch(
  '/profile-update',
  auth(USER_ROLE.admin),
  UserImageUpload.single('file'),
  parseBodyString(),
  validateRequest(UserValidation.updateProfileValidationSchema),
  UserController.updateProfile,
);

router.get('/me', auth(USER_ROLE.admin), UserController.getMe);

router.get('/:id', auth(USER_ROLE.admin), UserController.getSingleUser);

router.post(
  '/change-password',
  auth(USER_ROLE.admin),
  validateRequest(UserValidation.changePasswordValidationSchema),
  UserController.changePassword,
);

router.post(
  '/refresh-token',
  validateRequest(UserValidation.refreshTokenValidationSchema),
  UserController.refreshToken,
);

router.post(
  '/forget-password',
  validateRequest(UserValidation.forgetPasswordValidationSchema),
  UserController.forgetPassword,
);

router.post(
  '/reset-password',
  validateRequest(UserValidation.forgetPasswordValidationSchema),
  UserController.resetPassword,
);

export const UserRouter = router;
