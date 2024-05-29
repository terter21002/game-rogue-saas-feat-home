import DefaultLayoutComponent from '@/components/layout/default';
import TVLayoutComponent from '@/components/layout/tv';

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps): JSX.Element {
  return (
    <DefaultLayoutComponent>
      <TVLayoutComponent>{children}</TVLayoutComponent>
    </DefaultLayoutComponent>
  );
}
