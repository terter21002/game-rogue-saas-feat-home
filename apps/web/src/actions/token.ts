'use server';

import { AccessToken } from 'livekit-server-sdk';
import { v4 } from 'uuid';
import { liveKitConfig } from '@/config/const';
import { getSelf } from '@/request/auth';
import { getUserById } from '@/request/user';

export const createViewerToken = async (hostIdentity: string): Promise<string> => {
  let self;

  try {
    self = await getSelf();
  } catch (error) {
    const id = v4();
    const username = `guest#${Math.round(Math.random() * 10000)}`;
    self = { id, username };
  }

  const host = await getUserById(hostIdentity);

  if (!host._id) {
    throw new Error('Stream Host not found!');
  }

  const isHost = self._id === host._id;

  const token = new AccessToken(liveKitConfig.apiKey, liveKitConfig.secretKey, {
    identity: isHost ? `host-${self._id}` : self._id,
    name: self.name,
  });

  token.addGrant({
    room: host._id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  });
  return Promise.resolve(token.toJwt());
};
