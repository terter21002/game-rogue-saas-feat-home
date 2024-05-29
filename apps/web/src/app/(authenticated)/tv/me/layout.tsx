import DashboardULayoutComponent from '@/components/layout/dashboard/u';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps): JSX.Element {
  return <DashboardULayoutComponent>{children}</DashboardULayoutComponent>;
}
