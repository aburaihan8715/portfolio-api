import Stripe from 'stripe';
import { TPayment } from './payment.interface';
import { Payment } from './payment.model';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// CREATE
const createPaymentIntent = async (payload: { price: number }) => {
  const amount = Math.trunc(payload.price * 100);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',
    payment_method_types: ['card'],
  });

  return { clientSecret: paymentIntent.client_secret };
};

const createPaymentIntoDB = async (payload: TPayment) => {
  const newPayment = await Payment.create(payload);
  return newPayment;
};

export const PaymentService = {
  createPaymentIntent,
  createPaymentIntoDB,
};
