import { Document, Types } from 'mongoose';
import { ICategory } from '../category/category.interface';
import { IShop } from '../shop/shop.interface';

export interface IProduct extends Document {
  _id: string;
  name: string;
  price: number;
  category: Types.ObjectId | ICategory;
  inventoryCount: number;
  description: string;
  images?: string[];
  discount?: number;
  shop: Types.ObjectId | IShop;
  isDeleted?: boolean;
  __v: number;
}
