'use client';

import { TBroadcast } from '@repo/types';
import { useQuery } from '@tanstack/react-query';
import { BroadcastCard } from './broadcast-card';
import { getBroadcasts } from '@/request/broadcast';

type BroadcastResultsProps = {
  id: string;
};

export function Results({ id }: BroadcastResultsProps): JSX.Element {
  const { data } = useQuery({
    queryKey: ['broadcasts', id],
    queryFn: async () => {
      return await getBroadcasts(id ?? '');
    },
    refetchInterval: 1000,
  });
  return (
    <div className="mt-8 w-full p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Past broadcasts</h1>
      </div>
      <div className="grid w-full grid-cols-3 gap-8">
        {data?.map((broadcast: TBroadcast) => (
          <BroadcastCard
            key={broadcast._id}
            url={broadcast.url}
            createdAt={new Date(broadcast.createdAt).toUTCString()}
          />
        ))}
      </div>
    </div>
  );
}
