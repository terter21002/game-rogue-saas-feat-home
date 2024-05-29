import { TOrganization, TSocialType } from '@repo/types';
import { Schema, model, Document } from 'mongoose';

const socialSchema = new Schema({
  type: { type: String, required: true, enum: TSocialType },
  url: { type: String, required: true },
});

const organizationSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    userId: { type: Schema.ObjectId, ref: 'User', required: true },
    image: { type: String, required: false },
    banner: { type: String, required: false },
    title: { type: String, required: false },
    url: { type: String, required: false },
    isActive: { type: Boolean, default: true },
    social: [socialSchema],
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

const organizationModel = model<TOrganization & Document>('Organization', organizationSchema);

export default organizationModel;
