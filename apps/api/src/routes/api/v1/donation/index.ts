import auth from '@/middleware/auth';
import { Router } from 'express';
import { createDonationController } from './default';

const router = Router();

router.post('/', [auth], createDonationController);

export default router;
