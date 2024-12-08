/* eslint-disable @typescript-eslint/no-explicit-any */
import { Query, Schema, model } from 'mongoose';
import { IPayment } from './payment.interface';

const paymentSchema = new Schema<IPayment>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['SUCCESS', 'FAILED', 'PENDING'],
      default: 'PENDING',
    },
  },

  {
    timestamps: true,
  },
);

//======== DOCUMENT MIDDLEWARE PRE (save and find)=========

paymentSchema.pre(/^find/, function (this: Query<any, IPayment>, next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//========= DOCUMENT MIDDLEWARE POST (save and find)========
// remove password from send data
paymentSchema.set('toObject', {
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

paymentSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

export const Payment = model<IPayment>('Payment', paymentSchema);
