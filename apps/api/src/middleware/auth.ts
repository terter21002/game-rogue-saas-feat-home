import { jwtSecret } from '../config/const';
import streamModel from '@/models/stream';
import userModel from '../models/user';
import { parseToken } from '../services/auth';
import { log } from '@repo/logger';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { TStream } from '@repo/types';

export default async function (req: Request, res: Response, next: NextFunction) {
  const tokenHeader = req.headers.authorization;
  if (!tokenHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = parseToken(tokenHeader);
  try {
    const payload = jwt.verify(token!, jwtSecret) as {
      name: string;
      email: string;
      image?: string;
    };
    if (!payload?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    } else {
      const user = await userModel
        .findOne({ email: payload.email })
        .populate<{ stream: TStream | undefined }>({
          path: 'stream',
        });
      if (!user) {
        const newUser = await userModel.create({
          email: payload.email,
          name: payload.name,
          image: payload.image,
          providers: ['google'],
        });
        const newStream = new streamModel({
          name: `${newUser.name}'s stream`,
          userId: newUser._id,
        });
        await newStream.save();
        await newUser.populate<{ stream: TStream | undefined }>('stream');
        res.locals.user = newUser;
      } else {
        if (payload.name && !user.name) user.name = payload.name;
        if (payload.image && !user.image) user.image = payload.image;
        if (!user.stream)
          await streamModel.create({
            name: `${user.name}'s stream`,
            userId: user.id,
          });
        await user.save();
        res.locals.user = user;
      }
    }
    next();
  } catch (err) {
    log(err);
    // @ts-expect-error
    res.status(403).json({ success: false, message: err.message });
  }
}
