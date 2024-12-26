import { Schema, model } from 'mongoose';
import { IProject } from './project.interface';

const projectSchema = new Schema<IProject>({
  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    default: '',
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
projectSchema.set('toObject', {
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

projectSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

//============ 04 STATIC METHODS ==============

export const Project = model<IProject>('Project', projectSchema);
