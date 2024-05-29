import streamModel from '@/models/stream';
import { TStream } from '@repo/types/stream';

export const getStreamByUserId = async (userId: string) => {
  const stream = await streamModel.findOne({ userId }).populate('tags');
  return stream;
};

export const updateStreamById = async (data: Partial<TStream>, id: string | undefined) => {
  const stream = await streamModel.findByIdAndUpdate(id, data, { new: true });
  return stream;
};

export const deleteStreamThumbnailById = async (
  thumbnailUrl: string | undefined,
  id: string | undefined
) => {
  const stream = await streamModel.findByIdAndUpdate(
    id,
    {
      $unset: {
        thumbnailUrl,
      },
    },
    { new: true }
  );
  return stream;
};

export const updateStreamByUserId = async (data: Partial<TStream>, userId: string) => {
  const stream = await streamModel.findOneAndUpdate({ userId }, data, {
    new: true,
  });
  return stream;
};

export const getStreams = async () => {
  const streams = await streamModel
    .find()
    .sort({ isLive: -1, updatedAt: -1 })
    .populate<{ stream: TStream | undefined }>({
      path: 'user',
    });

  return streams;
};

export const getSearch = async (term?: string) => {
  try {
    let streams = [];

    let query: any = {
      $or: [
        { name: { $regex: term, $options: 'i' } },
        { 'user.name': { $regex: term, $options: 'i' } },
      ],
    };

    streams = await streamModel.find(query).sort({ isLive: -1, updatedAt: -1 });

    return streams;
  } catch (error) {
    console.error(error);
    return [];
  }
};
