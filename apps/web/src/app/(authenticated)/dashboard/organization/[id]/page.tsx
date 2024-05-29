import type { TApiResponse, TOrganization } from '@repo/types';
import type { AxiosError } from 'axios';
import { notFound } from 'next/navigation';
import DashboardPageWrapperComponent from '@/components/layout/dashboard/page';
import SingleOrganizationPageComponent from '@/components/pages/dashboard/organization/single';
import apiClient from '@/utils/api-client';

interface PageProps {
  params: { id: string };
}
export default async function OrganizationPage(props: PageProps) {
  const { id } = props.params;
  const res = await apiClient
    .get(`organization/${id}`)
    .then((response) => response.data as TApiResponse<TOrganization>)
    .catch((error: AxiosError) => {
      if (error.response?.status === 404) return notFound();
      throw error;
    });
  return (
    <DashboardPageWrapperComponent title="Organization">
      <SingleOrganizationPageComponent id={id} organization={res.data} />
    </DashboardPageWrapperComponent>
  );
}
