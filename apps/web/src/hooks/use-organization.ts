import {
  type TApiResponse,
  type TOrganization,
  type TOrganizationCreate,
  type TSocialItemUpdate,
  ZOrganizationCreate,
  ZSocialItemUpdate,
} from '@repo/types';
import { convertIntoFormData } from '@repo/utils/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/config/const';
import apiClient from '@/utils/api-client';

export const useOrganizations = () => {
  const queryKey = [QUERY_KEYS.organizations];
  const query = useQuery({
    queryKey,
    queryFn: async () => {
      return apiClient
        .get('/organization')
        .then((response) => response.data as TApiResponse<TOrganization[]>)
        .then((data) => data.data);
    },
  });
  return { ...query, queryKey };
};

export const useAuthOrganizations = () => {
  const queryKey = [QUERY_KEYS.auth_organization];
  const query = useQuery({
    queryKey,
    queryFn: async () => {
      return apiClient
        .get('/auth/organization')
        .then((response) => response.data as TApiResponse<TOrganization[]>);
    },
  });
  return { ...query, queryKey };
};

export const useUpdateOrganization = () => {
  const mutate = useMutation({
    mutationFn: async ({
      _id,
      data,
      files,
    }: {
      _id?: string;
      data: TOrganizationCreate;
      files?: { image?: File; banner?: File };
    }) => {
      const payload = ZOrganizationCreate.omit({
        image: true,
        banner: true,
      }).parse(data);
      const formData = convertIntoFormData(payload);
      if (files?.image) formData.append('image', files.image);
      if (files?.banner) formData.append('banner', files.banner);
      if (_id) return apiClient.put(`/organization/${_id}`, formData);
      return apiClient.post('/organization', formData);
    },
  });
  return mutate;
};

export const useUpdateOrganizationSocial = () => {
  const mutate = useMutation({
    mutationFn: async ({ _id, data }: { _id: string; data: TSocialItemUpdate }) => {
      const payload = ZSocialItemUpdate.parse(data);
      return apiClient.put(`/organization/${_id}/social`, payload);
    },
  });
  return mutate;
};
