import { Schema, model } from 'mongoose';
import { ISkill } from './skill.interface';

const skillSchema = new Schema<ISkill>({
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
skillSchema.set('toObject', {
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

skillSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

//============ 04 STATIC METHODS ==============

export const Skill = model<ISkill>('Skill', skillSchema);
