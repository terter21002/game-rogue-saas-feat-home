import { TFollow } from '@repo/types';
import { Document, Schema, model } from 'mongoose';

const followSchema = new Schema(
  {
    followingId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    followedById: { type: Schema.Types.ObjectId, ref: 'User', required: true },
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
      following: {
        options: {
          ref: 'User',
          localField: 'followingId',
          foreignField: '_id',
          justOne: true,
        },
      },
      followedBy: {
        options: {
          ref: 'User',
          localField: 'followedById',
          foreignField: '_id',
          justOne: true,
        },
      },
    },
  }
);

const followModel = model<TFollow & Document>('Follow', followSchema);

export default followModel;
