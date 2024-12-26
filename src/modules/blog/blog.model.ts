import { Schema, model } from 'mongoose';
import { IBlog } from './blog.interface';

const blogSchema = new Schema<IBlog>({
  title: {
    type: String,
    required: true,
  },

  desc: {
    type: String,
    required: true,
  },

  content: {
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
blogSchema.set('toObject', {
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

blogSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

//============ 04 STATIC METHODS ==============

export const Blog = model<IBlog>('Blog', blogSchema);
