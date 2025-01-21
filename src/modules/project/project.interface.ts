import { Document } from 'mongoose';

// NOTE: TUser should IUser
export interface IProject extends Document {
  _id: string;
  name: string;
  type: string;
  coverImage?: string;
  overview: string;
  techStack: string[];
  links: string[];
  createdAt: Date;
  __v: number;
}
