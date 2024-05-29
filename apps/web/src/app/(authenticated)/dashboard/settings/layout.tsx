import type { ReactNode } from 'react';
import SettingsLayoutComponent from '@/components/layout/dashboard/settings';

export default function SettingsLayout({ children }: { children: ReactNode }): JSX.Element {
  return <SettingsLayoutComponent>{children}</SettingsLayoutComponent>;
}
