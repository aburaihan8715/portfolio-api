import { Document, Types } from 'mongoose';

export interface ICartItem {
  product: Types.ObjectId;
  quantity: number;
}
export interface ICart extends Document {
  _id: string;
  user: Types.ObjectId;
  items: ICartItem[];
  totalAmount: number;
  __v: number;
}
