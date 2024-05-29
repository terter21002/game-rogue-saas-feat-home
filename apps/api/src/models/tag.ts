import { TTag } from '@repo/types';
import { Document, Schema, model } from 'mongoose';

const tagSchema = new Schema(
  {
    type: { type: String, default: 'stream' },
    name: { type: String, required: true, unique: true },
    isDisabled: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

const tagModel = model<TTag & Document>('Tag', tagSchema);

export default tagModel;
