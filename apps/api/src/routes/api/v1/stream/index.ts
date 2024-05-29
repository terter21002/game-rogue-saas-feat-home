import { thumbnailUploader } from '@/utils/storage';
import { Router } from 'express';
import {
  deleteThumbnail,
  getStreamByUserController,
  getStreamController,
  getStreamsController,
  getStreamsRecommendedController,
  getTagsController,
  updateStreamByIdController,
  updateStreamByUserIdController,
  updateStreamTagsByUser,
  updateThumbnail,
} from './default';

const router = Router();

router.get('/userid/:userId', getStreamByUserController);
router.get('/userid', getStreamController);
router.get('/', getStreamsController);
router.get('/recommended/:userId', getStreamsRecommendedController);
router.put('/userid/:userId', updateStreamByUserIdController);
router.put('/tags/:userId', updateStreamTagsByUser);
router.get('/tags', getTagsController);
router.put('/id/:id', updateStreamByIdController);
router.post('/thumbnail', [thumbnailUploader], updateThumbnail);
router.delete('/thumbnail', deleteThumbnail);
export default router;
