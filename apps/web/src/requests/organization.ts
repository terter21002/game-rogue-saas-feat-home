import { TOrganizationCreate } from '@repo/types';
import apiClient from '@/utils/api-client';

export const createOrganizationRequest = async (data: TOrganizationCreate) => {
  return apiClient.post('/organization', data);
};
