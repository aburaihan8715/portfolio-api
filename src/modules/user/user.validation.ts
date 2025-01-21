import { z } from 'zod';

const registerValidationSchema = z.object({
  body: z
    .object({
      name: z.string({ required_error: 'Name is required' }),
      email: z
        .string({ required_error: 'Email is required' })
        .email('Invalid email format'),
      password: z
        .string({ required_error: 'Password is required' })
        .min(8, 'Password must be at least 8 characters long'),
      passwordConfirm: z.string({
        required_error: 'password confirm is required',
      }),
      passwordChangedAt: z.date().nullable().optional(),
      role: z.enum(['admin']).default('admin'),
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

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required.' })
      .email({ message: 'Invalid email address' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const updateProfileValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).optional(),
    profilePhoto: z.string().optional(),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password is required',
    }),
    newPassword: z.string({ required_error: 'Password is required' }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

const forgetPasswordValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email id is required!',
      })
      .email({ message: 'Invalid email address' }),
  }),
});

const resetPasswordValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email id is required!',
      })
      .email({ message: 'Invalid email address' }),
    newPassword: z.string({
      required_error: 'User password is required!',
    }),
  }),
});

export const UserValidation = {
  registerValidationSchema,
  updateProfileValidationSchema,
  loginValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
};
