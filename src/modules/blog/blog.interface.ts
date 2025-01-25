import { Document } from 'mongoose';

export interface IBlog extends Document {
  _id: string;
  title: string;
  overview: string;
  coverImage?: string;
  content: string;
  category: string;
  createdAt: Date;
  __v: number;
}
