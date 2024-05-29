import { TFollow, TStream, TUser } from '@repo/types';
import { Following, FollowingSkeleton } from './following';
import { HomeButton } from './home';
import { Recommended, RecommendedSkeleton } from './recommended';
import { Toggle, ToggleSkeleton } from './toggle';
import { Wrapper } from './wrapper';

type SidebarProps = {
  recommended: (TUser & { stream: TStream })[] | undefined;
  following:
    | (TFollow & {
        following: TUser & {
          stream: { isLive: boolean } | null;
        };
      })[]
    | undefined;
};

export function Sidebar({ following, recommended }: SidebarProps): JSX.Element {
  return (
    <Wrapper>
      <HomeButton />
      <Toggle />
      {following && <Following data={following} />}
      {recommended && <Recommended data={recommended} />}
    </Wrapper>
  );
}

export function SidebarSkeleton(): JSX.Element {
  return (
    <aside className="bg-background fixed left-0 z-20 flex size-full flex-col border-r border-[#2D2E35]">
      <ToggleSkeleton />
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  );
}
