import { Document } from 'mongoose';

export interface ISkill extends Document {
  _id: string;
  title: string;
  desc: string;
  createdAt: Date;
  __v: number;
}
