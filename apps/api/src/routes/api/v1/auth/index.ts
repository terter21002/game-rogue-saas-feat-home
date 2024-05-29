import { profileUploader } from '@/utils/storage';
import { Router } from 'express';
import { getProfile, getUserOrganizations, updateProfile } from './default';
import auth from '@/middleware/auth';
import 'express-async-errors';

const router = Router();

router.get('/profile', [auth], getProfile);

router.post('/profile', [auth, profileUploader], updateProfile);

router.get('/organization', [auth], getUserOrganizations);

export default router;
