import DashboardPageWrapperComponent from '@/components/layout/dashboard/page';
import OrganizationIndexPageComponent from '@/components/pages/dashboard/organization';

export default function OrganizationIndexPage() {
  return (
    <DashboardPageWrapperComponent title="Organizations">
      <OrganizationIndexPageComponent />
    </DashboardPageWrapperComponent>
  );
}
