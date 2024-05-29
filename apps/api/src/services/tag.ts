import streamModel from '@/models/stream';
import tagModel from '@/models/tag';
import { TTagInput } from '@repo/types';

export const updateTags = async (tags: TTagInput[], userId: string) => {
  const existing = await tagModel.find({
    name: {
      $in: tags.map((tag) => tag.name.trim()),
    },
  });
  const diff = tags.filter((item) => !new Set(existing.map((n) => n.name)).has(item.name));
  const newTags = await tagModel.insertMany(diff);
  const updatedStream = await streamModel
    .findOneAndUpdate(
      { userId },
      {
        $set: {
          tags: existing.concat(newTags).map((tag) => tag._id),
        },
      },
      {
        new: true,
      }
    )
    .populate('tags');
  return updatedStream;
};

export const getTags = async () => {
  return await tagModel.find();
};
