import { Results } from '@/components/pages/tv/me/broadcast/results';

type StreamBroadcastPageProps = {
  params: { id: string };
};

export default async function StreamBroadcastPage({
  params,
}: StreamBroadcastPageProps): Promise<JSX.Element> {
  return <Results id={params.id} />;
}
