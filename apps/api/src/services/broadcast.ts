import broadcastModel from '@/models/broadcast';
import { TStream } from '@repo/types';

export const getBroadcasts = async (userId: string) => {
  const broadcasts = await broadcastModel
    .find({
      userId,
      isComplete: true,
    })
    .populate<{ stream: TStream | undefined }>('stream');
  return broadcasts;
};
