import { Document } from 'mongoose';

// NOTE: TUser should IUser
export interface IProject extends Document {
  _id: string;
  name: string;
  image?: string;
  createdAt: Date;
  __v: number;
}
