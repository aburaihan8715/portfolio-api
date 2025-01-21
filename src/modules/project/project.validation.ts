import { z } from 'zod';

const createValidation = z.object({
  body: z.object({
    name: z.string().min(1, 'Project name is required.'),
    type: z.string().min(1, 'Project type is required.'),
    coverImage: z.string().optional(),
    overview: z.string().min(1, 'Overview is required.'),
    techStack: z
      .array(
        z
          .string()
          .min(1, 'Each tech stack item must be a non-empty string.'),
      )
      .min(1, 'At least one tech stack item is required.'),
    links: z
      .array(z.string().url('Each link must be a valid URL.'))
      .min(1, 'At least one link is required.'),
  }),
});

const updateValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    type: z.string().optional(),
    coverImage: z.string().optional(),
    overview: z.string().optional(),
    techStack: z.array(z.string()).optional(),
    links: z
      .array(z.string().url('Each link must be a valid URL.'))
      .optional(),
  }),
});

export const ProjectValidation = {
  createValidation,
  updateValidation,
};
