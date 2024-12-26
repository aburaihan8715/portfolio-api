import { Router } from 'express';
import { UserRouter } from '../modules/user/user.route';
import { ProjectRouter } from '../modules/project/project.route';
import { BlogRouter } from '../modules/blog/blog.route';
import { ExperienceRouter } from '../modules/experience/experience.route';
import { SkillRouter } from '../modules/skill/skill.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/projects',
    route: ProjectRouter,
  },
  {
    path: '/blogs',
    route: BlogRouter,
  },
  {
    path: '/experiences',
    route: ExperienceRouter,
  },
  {
    path: '/skills',
    route: SkillRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
