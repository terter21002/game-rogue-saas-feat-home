/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use server';

import { AxiosError } from 'axios';
import type { CreateIngressOptions, IngressInfo } from 'livekit-server-sdk';
import {
  IngressAudioEncodingPreset,
  IngressClient,
  IngressInput,
  IngressVideoEncodingPreset,
  RoomServiceClient,
} from 'livekit-server-sdk';

import { TrackSource } from 'livekit-server-sdk/dist/proto/livekit_models';

import { revalidatePath } from 'next/cache';
import { liveKitConfig } from '@/config/const';
import { getSelf } from '@/request/auth';
import { updateStreamByUserId } from '@/request/stream';

const roomService = new RoomServiceClient(
  liveKitConfig.apiUrl,
  liveKitConfig.apiKey,
  liveKitConfig.secretKey
);

const ingressClient = new IngressClient(
  liveKitConfig.apiUrl,
  liveKitConfig.apiKey,
  liveKitConfig.secretKey
);

export const resetIngresses = async (hostIdentity: string): Promise<void> => {
  const ingresses = await ingressClient.listIngress({
    roomName: hostIdentity,
  });

  const rooms = await roomService.listRooms([hostIdentity]);

  for (const room of rooms) {
    await roomService.deleteRoom(room.name);
  }

  for (const ingress of ingresses) {
    if (ingress.ingressId) {
      await ingressClient.deleteIngress(ingress.ingressId);
    }
  }
};

export const createIngress = async (
  ingressType: IngressInput
): Promise<IngressInfo | Error | undefined> => {
  try {
    const self = await getSelf();
    // Reset Previous Ingress
    await resetIngresses(self._id);

    const options: CreateIngressOptions = {
      name: self.name,
      roomName: self._id,
      participantName: self.name,
      participantIdentity: self._id,
    };

    if (ingressType === IngressInput.WHIP_INPUT) {
      options.bypassTranscoding = true;
    } else {
      options.video = {
        source: TrackSource.CAMERA,
        preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
      };
      options.audio = {
        source: TrackSource.MICROPHONE,
        preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
      };
    }

    const ingress = await ingressClient.createIngress(ingressType, options);

    if (!ingress.url || !ingress.streamKey) {
      throw new Error(`Failed to create ingress!`);
    }

    await updateStreamByUserId(
      {
        ingressId: ingress.ingressId,
        serverUrl: ingress.url,
        streamKey: ingress.streamKey,
      },
      self._id
    );
    revalidatePath(`/dashboard/settings/broadcast`);
    return ingress;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error('Ingress creation error: Axios Error', error.response?.data ?? error.message);
      throw new Error(error.response?.data ?? error.message);
    } else if (error instanceof Error) {
      console.error('Ingress creation error', error.message);
      throw new Error(error.message);
    }
    throw error;
  }
};
