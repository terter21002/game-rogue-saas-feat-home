import DashboardPageWrapperComponent from '@/components/layout/dashboard/page';
import OrganizationCreatePageComponent from '@/components/pages/dashboard/organization/create';

export default function OrganizationNewPage() {
  return (
    <DashboardPageWrapperComponent title="Create New Organization">
      <OrganizationCreatePageComponent />
    </DashboardPageWrapperComponent>
  );
}
