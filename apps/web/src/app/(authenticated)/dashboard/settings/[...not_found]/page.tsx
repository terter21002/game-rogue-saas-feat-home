import { redirect } from 'next/navigation';

export default function NotFoundPage(): never {
  return redirect('/dashboard/settings');
}
