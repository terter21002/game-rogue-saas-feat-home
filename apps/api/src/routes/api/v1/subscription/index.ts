import auth from '@/middleware/auth';
import { Router } from 'express';
import { checkUserSubscribesController, createSubscriptionController } from './default';

const router = Router();

router.post('/', [auth], createSubscriptionController);
router.get('/:id', [auth], checkUserSubscribesController);

export default router;
