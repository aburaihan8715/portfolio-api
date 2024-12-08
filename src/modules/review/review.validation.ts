import { z } from 'zod';

const createValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Review is required' }),
  }),
});

const updateValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Review is required' }).optional(),
  }),
});

export const ReviewValidation = {
  createValidationSchema,
  updateValidationSchema,
};
