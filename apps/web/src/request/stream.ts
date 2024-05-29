import type { TApiResponse, TStream, TTag, TTagInput, TUser } from '@repo/types';
import { getSelf } from './auth';
import apiClient from '@/utils/api-client';

export const getStreamByUserId = async (userId: string): Promise<TStream & { tags: TTag[] }> => {
  const res = await apiClient.get(`/stream/userid/${userId}`);
  const data = (await res.data) as TApiResponse<TStream & { tags: TTag[] }>;
  return data.data;
};

export const getStream = async (): Promise<TStream> => {
  const res = await apiClient.get(`/stream/userid`);
  const data = (await res.data) as TApiResponse<TStream>;
  return data.data;
};

export const updateStreamById = async (data: Partial<TStream>, id: string): Promise<TStream> => {
  const res = await apiClient.put(`/stream/id/${id}`, data);
  const stream = (await res.data) as TApiResponse<TStream>;
  return stream.data;
};

export const updateStreamByUserId = async (
  data: Partial<TStream>,
  userId: string
): Promise<TStream> => {
  const res = await apiClient.put(`/stream/userid/${userId}`, data);
  const stream = (await res.data) as TApiResponse<TStream>;
  return stream.data;
};

export const getStreams = async (): Promise<(TStream & { user: TUser })[]> => {
  const res = await apiClient.get(`/stream/`);
  const data = (await res.data) as TApiResponse<(TStream & { user: TUser })[]>;
  return data.data;
};

export const getRecommended = async (): Promise<(TUser & { stream: TStream })[]> => {
  const self = await getSelf();
  const res = await apiClient.get(`/stream/recommended/${self._id}`);
  const data = (await res.data) as TApiResponse<(TUser & { stream: TStream })[]>;
  return data.data;
};

export const updateTags = async (tags: TTagInput[]): Promise<TStream & { tags: TTag[] }> => {
  const self = await getSelf();
  const res = await apiClient.put(`/stream/tags/${self._id}`, tags);
  const stream = (await res.data) as TApiResponse<TStream & { tags: TTag[] }>;
  return stream.data;
};

export const getTags = async (): Promise<TTag[]> => {
  const res = await apiClient.get(`/stream/tags`);
  const stream = (await res.data) as TApiResponse<TTag[]>;
  return stream.data;
};
