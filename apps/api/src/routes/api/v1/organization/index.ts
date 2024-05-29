import { Router } from 'express';
import {
  createOrganization,
  getOrganization,
  getOrganizations,
  updateOrganization,
  updateOrganizationSocial,
} from './default';
import { profileUploader } from '@/utils/storage';
import 'express-async-errors';

const router = Router();

router.get('/', getOrganizations);

router.get('/:id', getOrganization);

router.post('/', [profileUploader], createOrganization);

router.put('/:id', [profileUploader], updateOrganization);

router.put('/:id/social', updateOrganizationSocial);

export default router;
