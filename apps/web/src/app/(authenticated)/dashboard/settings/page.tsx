import { redirect } from 'next/navigation';

export default function SettingsIndexPage(): never {
  return redirect('/dashboard/settings/general');
}
