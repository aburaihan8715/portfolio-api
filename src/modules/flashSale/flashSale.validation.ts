import { z } from 'zod';

const createValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Order is required' }),
  }),
});

const updateValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Order is required' }).optional(),
  }),
});

export const FlashSaleValidation = {
  createValidationSchema,
  updateValidationSchema,
};
