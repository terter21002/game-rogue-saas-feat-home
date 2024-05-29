import {
  googleServiceAccountString,
  googleStorageBucketName,
  liveKitApiKey,
  liveKitApiUrl,
  liveKitSecretKey,
} from '@/config/const';
import broadcastModel from '@/models/broadcast';
import streamModel from '@/models/stream';
import crypto from 'crypto';
import type { Request, Response } from 'express';
import { EgressClient, RoomServiceClient, WebhookReceiver } from 'livekit-server-sdk';
import { TrackSource } from 'livekit-server-sdk/dist/proto/livekit_models';

function generateRandomString(length: number) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = new Uint32Array(length);
  crypto.getRandomValues(values);
  let randomString = '';
  for (let i = 0; i < length; i++) {
    randomString += charset[values[i] % charset.length];
  }
  return randomString;
}

const receiver = new WebhookReceiver(liveKitApiKey, liveKitSecretKey);
const roomService = new RoomServiceClient(liveKitApiUrl, liveKitApiKey, liveKitSecretKey);

const egressClient = new EgressClient(liveKitApiUrl, liveKitApiKey, liveKitSecretKey);
export async function livekitWebhook(req: Request, res: Response) {
  try {
    const body = req.body;
    const headerPayload = req.headers;
    const authorization = headerPayload.authorization;

    if (!authorization) {
      return res.status(400).send('No authorization Header');
    }

    const event = receiver.receive(body, authorization);

    if (event.event === 'ingress_started') {
      const stream = await streamModel.findOne({
        ingressId: event.ingressInfo?.ingressId,
        isLive: false,
      });
      if (stream) {
        const { tracks } = await roomService.getParticipant(
          //@ts-ignore
          stream?.userId?._id.toString() ?? '',
          //@ts-ignore
          stream?.userId?._id.toString() ?? ''
        );
        console.log('[DEBUG]: 1');
        if (tracks.length > 0) {
          const audioTrackId = tracks.find((track) => track.source === TrackSource.MICROPHONE)?.sid;
          const videoTrackId = tracks.find((track) => track.source === TrackSource.CAMERA)?.sid;
          console.log('[DEBUG]: 2');
          const broadcastId = generateRandomString(32);
          console.log('[DEBUG]: 3');
          await egressClient.startTrackCompositeEgress(
            //@ts-ignore
            stream?.userId?._id.toString() ?? '',
            {
              filepath: `tv/stream/${stream._id}/broadcast/${broadcastId}.mp4`,
              gcp: {
                credentials: googleServiceAccountString,
                bucket: googleStorageBucketName,
              },
            },
            audioTrackId,
            videoTrackId
          );
          console.log('[DEBUG]: 4', stream);
          await broadcastModel.create({
            userId: stream.userId,
            streamId: stream._id,
            url: `/uploads/tv/stream/${stream._id}/broadcast/${broadcastId}.mp4`,
          });

          console.log('[DEBUG]: 5');
          console.log('[EGRESS] created');
          await streamModel.findOneAndUpdate(
            { ingressId: event.ingressInfo?.ingressId },
            { isLive: true }
          );
          console.log('[DEBUG]: 6');
        }
      }
    }

    if (event.event === 'ingress_ended') {
      const stream = await streamModel.findOneAndUpdate(
        { ingressId: event.ingressInfo?.ingressId },
        { isLive: false },
        { new: true }
      );
      console.log('[DEBUG]: 1');
      const broadcast = await broadcastModel.findOne({
        isComplete: false,
        streamId: stream?._id,
      });
      if (broadcast) {
        console.log('[DEBUG]: 2');
        await broadcastModel.findByIdAndUpdate(broadcast?._id, {
          isComplete: true,
        });
      }
    }

    return res.status(200).send('Stream Status Updated!');
  } catch (error) {
    console.error(`[LiveKit WEBHOOK ERROR]: ${error}`);
    return res.status(500).send('LiveKit WebHook Error!');
  }
}
