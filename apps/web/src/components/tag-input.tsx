'use client';

import { useQuery } from '@tanstack/react-query';
import { AutoComplete, type Option } from '@ui/components/ui/autocomplete';

import { X } from 'lucide-react';
import { useState } from 'react';
import { getTags } from '@/request/stream';

type TagInputProps = {
  initTags: string[];
  onChange: (value: string[]) => void;
};

export function TagInput({ initTags, onChange }: TagInputProps): JSX.Element {
  const [tags, setTags] = useState<string[]>(initTags);

  const addTag = (newTag: string) => {
    if (newTag && !tags.includes(newTag)) {
      onChange([...tags, newTag]);
      setTags([...tags, newTag]);
    }
  };

  const removeTag = (tag: string) => {
    onChange(tags.filter((t) => t !== tag));
    setTags(tags.filter((t) => t !== tag));
  };

  const [value, setValue] = useState<Option>();

  const { data, isLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      return getTags();
    },
  });

  return (
    <div className="flex w-[300px] flex-col md:w-[400px]">
      <AutoComplete
        options={
          data !== undefined ? data.map((tag) => ({ value: tag.name, label: tag.name })) : []
        }
        placeholder="Search tag..."
        isLoading={isLoading}
        onValueChange={(v) => {
          addTag(v.value.toLowerCase().trim());
          setValue(v);
        }}
        value={value}
      />

      <div className="mt-4 flex flex-row flex-wrap gap-3">
        {tags.map((tag: string, index: number) => (
          <span
            key={`${index}-${tag}`}
            className="bg-muted text-primary mr-2 flex items-center justify-end gap-2 rounded-[32px] p-1 pl-3 text-sm font-medium shadow-sm"
          >
            {tag}
            <button
              className="bg-muted/40 hover:bg-primary flex size-5 items-center justify-center rounded-full text-white"
              onClick={() => removeTag(tag)}
              title={`Remove ${tag}`}
            >
              <X className="size-4 text-white" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
