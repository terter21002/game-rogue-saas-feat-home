import { Router } from 'express';
import { createGame, getGames, updateGame } from './default';
import auth from '@/middleware/auth';
import { profileUploader } from '@/utils/storage';
import 'express-async-errors';

const router = Router();

router.get('/', getGames);

router.post('/', [auth, profileUploader], createGame);

router.put('/:id', [auth, profileUploader], updateGame);

export default router;
