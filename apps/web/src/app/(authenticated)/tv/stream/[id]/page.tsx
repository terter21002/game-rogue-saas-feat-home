import { notFound } from 'next/navigation';
import { StreamPlayer } from '@/components/stream-player';
import { isFollowingUser } from '@/request/follow';
import { isSubcribedUser } from '@/request/subscription';
import { getUserById } from '@/request/user';

interface UserPageProps {
  params: {
    id: string;
  };
}

export default async function UserPage({ params }: UserPageProps): Promise<JSX.Element> {
  const user = await getUserById(params.id);

  if (!user._id || !user.stream._id) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user._id);

  const isSubscribed = await isSubcribedUser(user._id);

  return (
    <StreamPlayer
      user={user}
      stream={user.stream}
      isFollowing={isFollowing}
      isSubscribed={isSubscribed}
    />
  );
}
