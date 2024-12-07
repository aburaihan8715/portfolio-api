import { Document, Types } from 'mongoose';

export interface IShop extends Document {
  _id: string;
  name: string;
  description: string;
  logo?: string;
  vendorId: Types.ObjectId;
  followers: Types.ObjectId[];
  followersCount: number;
  isDeleted: boolean;
  __v: number;
}
