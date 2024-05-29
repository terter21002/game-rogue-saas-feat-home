import { TSubscription } from '@repo/types';
import { Document, Schema, model } from 'mongoose';

const subscriptionSchema = new Schema(
  {
    subscriptionId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subscriptionById: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    isExpired: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    virtuals: {
      subscription: {
        options: {
          ref: 'User',
          localField: 'subscriptionId',
          foreignField: '_id',
          justOne: true,
        },
      },
      subscriptionBy: {
        options: {
          ref: 'User',
          localField: 'subscriptionById',
          foreignField: '_id',
          justOne: true,
        },
      },
    },
  }
);

const subscriptionModel = model<TSubscription & Document>('Subscription', subscriptionSchema);

export default subscriptionModel;
