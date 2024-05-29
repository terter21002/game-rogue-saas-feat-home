'use client';

import { TTag } from '@repo/types';
import { Separator } from '@ui/components/ui/separator';
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import { InfoModal } from './info-modal';

interface InfoCardProps {
  name: string;
  description: string | undefined;
  thumbnailUrl: string | null;
  hostIdentity: string;
  viewerIdentity: string;
  tags: TTag[];
}

export const InfoCard = ({
  name,
  thumbnailUrl,
  description,
  hostIdentity,
  viewerIdentity,
  tags,
}: InfoCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  if (!isHost) {
    return null;
  }

  return (
    <div className="px-4">
      <div className="bg-background rounded-xl">
        <div className="flex items-center gap-x-2.5 p-4">
          <div className="bg-primary size-auto rounded-md p-2">
            <Pencil className="size-5" />
          </div>
          <div>
            <h2 className="lg:text-md text-sm font-semibold capitalize">Edit your Stream Info</h2>
            <p className="text-muted-foreground text-xs lg:text-sm">Maximize your visibility</p>
          </div>
          <InfoModal
            initialName={name}
            initialDescription={description ?? ''}
            initialThumbnailUrl={thumbnailUrl}
            initialTags={tags}
          />
        </div>
        <Separator />
        <div className="space-y-4 p-4 lg:p-6">
          <div>
            <h3 className="text-muted-foreground mb-2 text-sm">Name</h3>
            <p className="text-sm font-semibold">{name}</p>
          </div>
          <div>
            <h3 className="text-muted-foreground mb-2 text-sm">Description</h3>
            <p className="text-sm font-semibold">{description}</p>
          </div>
          <div>
            <h3 className="text-muted-foreground mb-2 text-sm">Tags</h3>
            <div className="flex flex-row flex-wrap gap-2">
              {tags.map((tag: TTag) => (
                <span
                  key={tag._id}
                  className="bg-muted text-primary mr-2 flex items-center justify-end gap-3 rounded-[32px] p-1 px-3 text-sm font-medium shadow-sm"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-muted-foreground mb-2 text-sm">Thumbnail</h3>
            {thumbnailUrl && (
              <div className="relative aspect-video w-[200px]  overflow-hidden rounded-md border border-white/10">
                <Image
                  fill
                  sizes="inherit"
                  src={thumbnailUrl}
                  alt={name}
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
