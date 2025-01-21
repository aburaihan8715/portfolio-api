import { Router } from 'express';

import { ProjectController } from './project.controller';
import parseBodyString from '../../middlewares/parseBodyString';

import ProjectImageUpload from './project.upload-file';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { ProjectValidation } from './project.validation';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  ProjectImageUpload.single('file'),
  parseBodyString(),
  validateRequest(ProjectValidation.createValidation),
  ProjectController.addProject,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  ProjectImageUpload.single('file'),
  parseBodyString(),
  validateRequest(ProjectValidation.updateValidation),
  ProjectController.updateProject,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  ProjectController.deleteProject,
);

router.get('/:id', ProjectController.getSingleProject);

router.get('/', ProjectController.getAllProjects);

export const ProjectRouter = router;
