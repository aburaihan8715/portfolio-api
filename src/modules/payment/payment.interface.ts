import { Document, Types } from 'mongoose';

export interface IPayment extends Document {
  _id: string;
  user: Types.ObjectId; // Reference to Users
  transactionId: string; // Unique transaction identifier
  amount: number; // Payment amount
  status: 'SUCCESS' | 'FAILED' | 'PENDING'; // Payment status
  __v: number;
}
