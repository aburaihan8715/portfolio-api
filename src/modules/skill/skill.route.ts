import { Router } from 'express';

import { SkillController } from './skill.controller';

const router = Router();

router.post('/', SkillController.addSkill);
router.get('/', SkillController.getAllSkills);

export const SkillRouter = router;
