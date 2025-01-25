import { z } from 'zod';

const addValidation = z.object({
  body: z.object({
    title: z.string().min(1, 'Project title is required.'),
    overview: z.string().min(1, 'Overview is required.'),
    coverImage: z.string().optional(),
    content: z.string().min(1, 'Content is required.'),
    category: z.string().min(1, 'Category is required.'),
  }),
});

const updateValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    overview: z.string().optional(),
    coverImage: z.string().optional(),
    content: z.string().optional(),
    category: z.string().optional(),
  }),
});

export const BlogValidation = {
  addValidation,
  updateValidation,
};
