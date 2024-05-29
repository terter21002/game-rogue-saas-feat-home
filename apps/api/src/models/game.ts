import { TGame, TPlatformEnum } from '@repo/types';
import { Document, Schema, model } from 'mongoose';

const gameSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  banner: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: false,
  },
  platforms: [{ type: String, enum: TPlatformEnum }],
});

const gameModel = model<TGame & Document>('Game', gameSchema);

export default gameModel;
