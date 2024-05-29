'use client';

import { TTagInput } from '@repo/types';
import ImagePicker from '@ui/components/shared/image-picker';
import { Button } from '@ui/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/components/ui/dialog';
import { Input } from '@ui/components/ui/input';
import { Label } from '@ui/components/ui/label';
import { Textarea } from '@ui/components/ui/textarea';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { ElementRef, useRef, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { Hint } from '../hint';
import { TagInput } from '../tag-input';
import { updateStream, updateStreamTags } from '@/actions/stream';
import { useDeleteThumbnail, useUpdateThumbnail } from '@/hooks/use-thumbnail';
interface InfoModalProps {
  initialName: string;
  initialThumbnailUrl: string | null;
  initialDescription: string;
  initialTags: TTagInput[];
}

export const InfoModal = ({
  initialName,
  initialThumbnailUrl,
  initialDescription,
  initialTags,
}: InfoModalProps) => {
  const router = useRouter();
  const closeRef = useRef<ElementRef<'button'>>(null);
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);
  const [tags, setTags] = useState(initialTags);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const { mutate: updateThumbnail } = useUpdateThumbnail();
  const { mutate: deleteThumbnail } = useDeleteThumbnail();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateStream({ name })
        .then(() => {
          toast.success('Stream updated successfully!');
          closeRef?.current?.click();
        })
        .catch((e) => {
          if (e instanceof Error) {
            toast.error(e.message || 'Something went wrong!');
          }
        });
    });
    startTransition(() => {
      updateStream({ description })
        .then(() => {
          toast.success('Stream updated successfully!');
          closeRef?.current?.click();
        })
        .catch((e) => {
          if (e instanceof Error) {
            toast.error(e.message || 'Something went wrong!');
          }
        });
    });
    startTransition(() => {
      updateStreamTags(tags)
        .then(() => {
          toast.success('Stream updated successfully!');
          closeRef?.current?.click();
        })
        .catch((e) => {
          if (e instanceof Error) {
            toast.error(e.message || 'Something went wrong!');
          }
        });
    });
    startTransition(() => {
      updateThumbnail(
        { thumbnail },
        {
          onSuccess: () => {
            startTransition(() => {
              updateStream({ name: name });
            });
            router.refresh();
          },
        }
      );
    });
    if (!thumbnailUrl) {
      startTransition(() => {
        deleteThumbnail(
          { thumbnailUrl },
          {
            onSuccess: () => {
              startTransition(() => {
                updateStream({ name: name });
              });
              router.refresh();
            },
          }
        );
      });
    }
  };

  const onRemove = () => {
    setThumbnail(null);
    setThumbnailUrl(null);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'link'} size={'sm'} className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="hidden-scrollbar max-h-[35rem] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Edit Stream Info</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-10">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              placeholder="Stream Name"
              onChange={(e) => void setName(e.target.value)}
              value={name}
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Stream Description"
              onChange={(e) => void setDescription(e.target.value)}
              value={description}
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Label>Tags</Label>
            <TagInput
              initTags={initialTags.map((tag) => tag.name)}
              onChange={(newtags) => {
                console.log(newtags);
                setTags(
                  newtags.map((value) => {
                    return {
                      name: value,
                    } as TTagInput;
                  })
                );
              }}
            />
          </div>
          <div className="space-y-2">
            <Label>Thumbnail</Label>
            {thumbnail || thumbnailUrl ? (
              <div
                className="relative aspect-video overflow-hidden rounded-xl border border-white/10
            "
              >
                <div className="absolute right-2 top-2 z-10">
                  <Hint label="Remove Thumbnail" side="left" asChild>
                    <Button
                      type="button"
                      disabled={isPending}
                      variant={'destructive'}
                      onClick={onRemove}
                      className="size-auto p-1.5"
                    >
                      <Trash className="size-4" />
                    </Button>
                  </Hint>
                </div>
                <Image
                  fill
                  sizes="inherit"
                  src={thumbnail ? URL.createObjectURL(thumbnail) : thumbnailUrl ?? ''}
                  alt="Thumbnail"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex w-full items-center justify-center">
                <ImagePicker
                  value={thumbnail ? URL.createObjectURL(thumbnail) : null}
                  onChange={async (v) => {
                    setThumbnail(await dataURLToFile(v));
                  }}
                  previewClassName="h-60 w-full"
                />
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant={'ghost'}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

async function dataURLToFile(dataURL: string) {
  const response = await fetch(dataURL);
  const blob = await response.blob();
  const file = new File([blob], 'thumbnail.jpg', {
    type: 'image/jpeg',
    lastModified: Date.now(),
  });
  return file;
}
