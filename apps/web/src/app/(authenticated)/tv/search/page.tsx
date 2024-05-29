import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { Results, ResultsSkeleton } from '@/components/pages/tv/search/results';

interface SearchPageProps {
  searchParams: {
    term?: string;
  };
}

export default function SearchPage({ searchParams }: SearchPageProps): JSX.Element {
  if (!searchParams.term) {
    redirect('/');
  }

  return (
    <div className="mx-auto h-full max-w-screen-2xl p-8">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results term={searchParams.term} />
      </Suspense>
    </div>
  );
}
