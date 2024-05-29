import auth from '@/middleware/auth';
import { Router } from 'express';
import { getBroadcastsController } from './default';

const router = Router();

router.get('/:id', [auth], getBroadcastsController);

export default router;
