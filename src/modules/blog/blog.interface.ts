import { Document } from 'mongoose';

export interface IBlog extends Document {
  _id: string;
  title: string;
  desc: string;
  content: string;
  image?: string;
  createdAt: Date;
  __v: number;
}
