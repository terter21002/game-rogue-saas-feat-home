import { notFound } from 'next/navigation';
import { ToggleCard } from '@/components/pages/dashboard/settings/chat/toggle-card';
import { ConnectModal } from '@/components/pages/dashboard/settings/keys/connect-modal';
import { KeyCard } from '@/components/pages/dashboard/settings/keys/key-card';
import { UrlCard } from '@/components/pages/dashboard/settings/keys/url-card';
import { getSelf } from '@/request/auth';
import { getStreamByUserId } from '@/request/stream';

export default async function KeysPage(): Promise<JSX.Element> {
  const self = await getSelf();
  const stream = await getStreamByUserId(self._id);

  if (!stream._id) {
    notFound();
  }

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Keys & URLs</h1>
        <ConnectModal />
      </div>
      <div className="space-y-4">
        <UrlCard value={stream.serverUrl ?? ''} />
        <KeyCard value={stream.streamKey ?? ''} />
      </div>
      <div className="my-4">
        <h1 className="text-2xl font-bold">Chat Settings</h1>
      </div>
      <div className="space-y-4">
        <ToggleCard field="isChatEnabled" label="Enable Chat" value={stream.isChatEnabled} />
        <ToggleCard field="isChatDelayed" label="Delay Chat" value={stream.isChatDelayed} />
        <ToggleCard
          field="isChatFollowersOnly"
          label="Only followers can Chat"
          value={stream.isChatFollowersOnly}
        />
        <ToggleCard
          field="isChatSubscriberOnly"
          label="Only subscribers can Chat"
          value={stream.isChatSubscriberOnly}
        />
      </div>
    </div>
  );
}
