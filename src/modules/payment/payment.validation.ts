import { z } from 'zod';
import { Types } from 'mongoose';

const createPaymentValidation = z.object({
  body: z.object({
    userEmail: z.string().email({ message: 'Invalid email address' }),
    transactionId: z.string({
      required_error: 'Transaction ID is required',
    }),
    price: z.number({ required_error: 'Price is required' }),
    date: z.string({ required_error: 'Date is required' }),
    slots: z.array(
      z.string().refine((id) => Types.ObjectId.isValid(id), {
        message: 'Invalid slot ID',
      }),
    ),
  }),
});

const createPaymentIntentValidation = z.object({
  body: z.object({
    price: z.number({ required_error: 'Price is required' }),
  }),
});

export const PaymentValidation = {
  createPaymentValidation,
  createPaymentIntentValidation,
};
