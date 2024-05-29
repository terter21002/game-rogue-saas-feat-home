import { StreamPlayer } from '@/components/stream-player';
import { getSelf } from '@/request/auth';
import { getUserById } from '@/request/user';

export default async function DashboardPage(): Promise<JSX.Element> {
  const self = await getSelf();
  const user = await getUserById(self._id);

  return <StreamPlayer user={user} stream={user.stream} isFollowing isSubscribed={false} />;
}
