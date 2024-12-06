import { Document } from 'mongoose';

export interface ICategory extends Document {
  _id: string;
  name: string;
  isDeleted: boolean;
  __v: number;
}
