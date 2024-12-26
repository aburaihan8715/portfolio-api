import { Router } from 'express';

import { ExperienceController } from './experience.controller';

const router = Router();

router.post('/', ExperienceController.addExperience);
router.get('/', ExperienceController.getAllExperiences);

export const ExperienceRouter = router;
