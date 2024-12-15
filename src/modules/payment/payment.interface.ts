import { Types } from 'mongoose';

export type TPayment = {
  userEmail: string;
  transactionId: string;
  price: number;
  date: string;
  slots: Types.ObjectId[];
};
