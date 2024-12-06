import { z } from 'zod';

const createValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Category is required' }),
  }),
});

const updateValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Category is required' }).optional(),
  }),
});

export const CategoryValidation = {
  createValidationSchema,
  updateValidationSchema,
};
