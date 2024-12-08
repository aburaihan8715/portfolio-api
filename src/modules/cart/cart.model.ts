/* eslint-disable @typescript-eslint/no-explicit-any */
import { Query, Schema, model } from 'mongoose';
import { ICart } from './cart.interface';

const cartSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
      },
    ],
    totalAmount: { type: Number, default: 0 },
  },

  {
    timestamps: true,
  },
);

//======== DOCUMENT MIDDLEWARE PRE (save and find)=========

cartSchema.pre(/^find/, function (this: Query<any, ICart>, next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//========= DOCUMENT MIDDLEWARE POST (save and find)========
// remove password from send data
cartSchema.set('toObject', {
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

cartSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

export const Cart = model<ICart>('Cart', cartSchema);
