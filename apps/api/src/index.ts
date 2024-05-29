import cors from 'cors';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { log } from '@repo/logger';
import { apiPort, dbUrl } from './config/const';
import { getIpAddress } from './utils/ip';
import { json, urlencoded } from 'body-parser';
import path from 'path';
import { multerGoogleStorage } from './utils/storage';
import { errorHandler } from './middleware/global';
import apiRouter from './routes/api';
import 'express-async-errors';
import { subscriptionWebhook } from './routes/api/v1/subscription/default';
import { livekitWebhook } from './routes/api/v1/webhooks/default';
import morgan from 'morgan';

const port = apiPort;

getIpAddress()
  .then((address) => {
    console.log('Cluster is running on:', address);
    mongoose
      .connect(dbUrl)
      .then(() => {
        const app = express();
        app.use(morgan('dev'));
        app.post(
          '/api/v1/webhooks/stripe',
          express.raw({ type: 'application/json' }),
          subscriptionWebhook
        );
        app.post(
          '/api/v1/webhooks/livekit',
          express.raw({ type: 'application/webhook+json' }),
          livekitWebhook
        );
        app.use(urlencoded({ extended: true }));
        app.use(json());
        app.use(cors());
        app.get('/message/:name', (req: Request, res: Response) => {
          return res.json({ message: `hello ${req.params.name}` });
        });
        app.get('/health', (req, res) => {
          return res.json({ ok: true });
        });
        app.get('/', (req, res) => {
          return res.json({ ok: true });
        });
        app.get('/uploads/*', async (req, res) => {
          const [, , ...file] = req.path.split('/');
          const filePath = path
            .join(...file)
            .replace(/\\/g, '/')
            .replace(/%20/g, ' ');
          const bucketFile = multerGoogleStorage?.selectedBucket.file(filePath);
          if (!bucketFile || !(await bucketFile.exists())[0])
            return res.status(404).send('Not Found');
          const fileReadStream = bucketFile.createReadStream();
          fileReadStream.pipe(res);
        });

        app.use('/api', apiRouter);

        app.use(errorHandler);

        app.listen(port, () => {
          log(`api running on ${port}`);
        });
      })
      .catch((err) => {
        log(err);
      });
  })
  .catch((err) => {
    console.error(err);
    process.exit(-1);
  });
