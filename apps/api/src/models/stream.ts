import { TStream } from '@repo/types';
import { HydratedDocument, Schema, model } from 'mongoose';

const streamSchema = new Schema(
  {
    name: { type: String },

    thumbnailUrl: { type: String },
    description: { type: String },

    ingressId: { type: String, unique: false },
    serverUrl: { type: String },
    streamKey: { type: String },

    isLive: { type: Boolean, default: false },
    isChatEnabled: { type: Boolean, default: true },
    isChatDelayed: { type: Boolean, default: false },
    isChatFollowersOnly: { type: Boolean, default: false },
    isChatSubscriberOnly: { type: Boolean, default: false },

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
      required: true,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
  },
  {
    strict: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    virtuals: {
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

const streamModel = model<HydratedDocument<TStream & Document>>('Stream', streamSchema);

export default streamModel;
