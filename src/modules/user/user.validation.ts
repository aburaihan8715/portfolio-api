import { z } from 'zod';

const createValidationSchema = z.object({
  body: z
    .object({
      name: z.string({ required_error: 'Name is required' }),
      email: z
        .string({ required_error: 'Email is required' })
        .email('Invalid email format'),
      profilePhoto: z.string().optional().default(''),
      password: z
        .string({ required_error: 'Password is required' })
        .min(8, 'Password must be at least 8 characters long'),
      passwordConfirm: z.string({
        required_error: 'password confirm is required',
      }),
      passwordChangedAt: z.date().nullable().optional(),
      role: z
        .enum(['superAdmin', 'admin', 'customer', 'vendor'])
        .default('customer'),
      address: z.string().optional().default(''),
      phone: z.string().optional().default(''),
      isDeleted: z.boolean().optional().default(false),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.passwordConfirm) {
        ctx.addIssue({
          code: 'custom',
          path: ['passwordConfirm'],
          message: 'Passwords do not match',
        });
      }
    }),
});

const updateProfileValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).optional(),
    profilePhoto: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
  }),
});

export const UserValidation = {
  createValidationSchema,
  updateProfileValidationSchema,
};
