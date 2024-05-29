import { TUserRole, TCountryCode, TUser } from '@repo/types';
import { Schema, model, HydratedDocument } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    banner: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: true,
      enum: TUserRole,
      default: TUserRole.User,
    },
    providers: [
      {
        type: String,
        required: true,
      },
    ],
    country: {
      type: String,
      required: false,
      enum: TCountryCode,
    },
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
      stream: {
        options: {
          ref: 'Stream',
          localField: '_id',
          foreignField: 'userId',
          justOne: false,
        },
      },
    },
  }
);

const userModel = model<HydratedDocument<TUser & Document>>('User', userSchema);

export default userModel;
