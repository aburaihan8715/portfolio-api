import { Document, Types } from 'mongoose';

// Interface for the Product Sub-document
export interface IOrderProduct {
  product: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  _id: string;
  user: Types.ObjectId;
  shop: Types.ObjectId;
  products: IOrderProduct[];
  totalAmount: number;
  status: 'PENDING' | 'COMPLETED' | 'CANCELED';
  transactionId: string;
  __v: number;
}
