'use server';

import { getStream, updateStreamById, updateTags } from '@/request/stream';
import type { TStream, TTagInput } from '@repo/types';
import { revalidatePath } from 'next/cache';

export const updateStream = async (
  values: Partial<Record<string, string | undefined>>
): Promise<TStream> => {
  const selfStream = await getStream();

  if (!selfStream._id) {
    throw new Error('Stream not found!');
  }

  const validData: Partial<TStream> = {
    name: values.name,
    isChatEnabled: Boolean(values.isChatEnabled),
    isChatDelayed: Boolean(values.isChatDelayed),
    isChatFollowersOnly: Boolean(values.isChatFollowersOnly),
    isChatSubscriberOnly: Boolean(values.isChatSubscriberOnly),
    thumbnailUrl: values.thumbnailUrl,
    description: values.description,
  };

  const stream = await updateStreamById(validData, selfStream._id);

  revalidatePath(`/dashboard/settings/broadcast`);
  revalidatePath(`/tv/me`);
  revalidatePath(`/tv/stream/${stream.userId}`);

  return stream;
};

export const updateStreamTags = async (tags: TTagInput[]): Promise<TStream> => {
  const stream = await updateTags(tags);
  revalidatePath(`/dashboard/settings/broadcast`);
  revalidatePath(`/tv/me`);
  revalidatePath(`/tv/stream/${stream?.userId}`);

  return stream;
};
