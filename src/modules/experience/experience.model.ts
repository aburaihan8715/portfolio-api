import { Schema, model } from 'mongoose';
import { IExperience } from './experience.interface';

const experienceSchema = new Schema<IExperience>({
  title: {
    type: String,
    required: true,
  },

  desc: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

//======== 01 DOCUMENT MIDDLEWARE PRE (save and find)=========
//========= 02 DOCUMENT MIDDLEWARE POST (save and find)========
//========= 03 TRANSFORM ALL RETURN DOCUMENTS ========
// remove password (if exists) and __v from any return documents
experienceSchema.set('toObject', {
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

experienceSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

//============ 04 STATIC METHODS ==============

export const Experience = model<IExperience>(
  'Experience',
  experienceSchema,
);
