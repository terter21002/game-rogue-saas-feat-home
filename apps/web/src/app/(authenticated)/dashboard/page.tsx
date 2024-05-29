import { redirect } from 'next/navigation';

export default async function DashboardIndexPage(): Promise<never> {
  return redirect(`/dashboard/home`);
}
