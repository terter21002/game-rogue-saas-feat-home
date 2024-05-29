import TabsWrapper from '@/components/pages/tv/home/broadcast/tabs-wrapper';

interface BroadcastLayoutProps {
  children: React.ReactNode;
}

export default function BroadcastLayout({ children }: BroadcastLayoutProps): JSX.Element {
  return <TabsWrapper>{children}</TabsWrapper>;
}
