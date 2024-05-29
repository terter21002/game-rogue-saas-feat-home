import { TBroadcast } from '@repo/types';
import { Document, Schema, model } from 'mongoose';

const broadcastSchema = new Schema(
  {
    url: { type: String, required: true },
    isComplete: { type: Boolean, default: false },

    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    streamId: { type: Schema.Types.ObjectId, ref: 'Stream', required: true },
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
      stream: {
        options: {
          ref: 'Stream',
          localField: 'streamId',
          foreignField: '_id',
          justOne: true,
        },
      },
      user: {
        options: {
          ref: 'User',
          localField: 'userId',
          foreignField: '_id',
          justOne: true,
        },
      },
    },
  }
);

const broadcastModel = model<TBroadcast & Document>('Broadcast', broadcastSchema);

export default broadcastModel;
