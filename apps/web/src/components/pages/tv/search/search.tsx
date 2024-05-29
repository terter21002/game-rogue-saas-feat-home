'use client';

import { Button } from '@ui/components/ui/button';
import { Input } from '@ui/components/ui/input';
import { SearchIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import { useState } from 'react';

export function Search(): JSX.Element {
  const router = useRouter();
  const [value, setValue] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!value) return;

    const url = qs.stringifyUrl(
      {
        url: '/search',
        query: {
          term: value,
        },
      },
      { skipEmptyString: true }
    );

    router.push(url);
  };

  const onClear = (): void => {
    setValue('');
  };

  return (
    <form className="relative  flex w-full items-center lg:w-[500px]" onSubmit={onSubmit}>
      <Input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder="Search"
        className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
      />
      {value ? (
        <X
          onClick={onClear}
          className="text-muted-foreground absolute right-14 top-2.5 size-5 cursor-pointer transition hover:opacity-75"
        />
      ) : null}
      <Button type="submit" size="sm" variant="secondary" className="rounded-l-none">
        <SearchIcon className="text-muted-foreground size-5 text-primary" />
      </Button>
    </form>
  );
}
