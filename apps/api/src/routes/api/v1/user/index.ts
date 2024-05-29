import auth from '@/middleware/auth';
import { Router } from 'express';
import {
  checkUserFollowsController,
  getUserByIdController,
  updateUserController,
  userFollowController,
  userFollowListController,
  userUnFollowController,
} from './default';

const router = Router();

router.get('/id/:id', getUserByIdController);
router.get('/follows/:id', [auth], checkUserFollowsController);
router.post('/follow', [auth], userFollowController);
router.get('/follow', [auth], userFollowListController);
router.post('/unfollow', [auth], userUnFollowController);
router.put('/', [auth], updateUserController);

export default router;
