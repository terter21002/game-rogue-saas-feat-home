import { Results } from '@/components/pages/tv/me/broadcast/results';
import { getSelf } from '@/request/auth';

export default async function BroadcastPage(): Promise<JSX.Element> {
  const self = await getSelf();
  return <Results id={self?._id} />;
}
