import { Router } from 'express';

import { ProjectController } from './project.controller';
import parseBodyString from '../../middlewares/parseBodyString';

import ProjectImageUpload from './project.upload-file';

const router = Router();

router.post(
  '/',
  ProjectImageUpload.single('file'),
  parseBodyString(),
  ProjectController.addProject,
);
router.get('/', ProjectController.getAllProjects);

export const ProjectRouter = router;
