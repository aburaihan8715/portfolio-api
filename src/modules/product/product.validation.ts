import { z } from 'zod';

const createValidationSchema = z.object({
  body: z.object({}),
});

const updateValidationSchema = z.object({
  body: z.object({}),
});

export const ShopValidation = {
  createValidationSchema,
  updateValidationSchema,
};
