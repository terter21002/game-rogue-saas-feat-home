import type { ComponentProps } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import type { ReactCropperElement } from 'react-cropper';
import { Cropper } from 'react-cropper';
import { Button } from '@ui/components/ui/button';
import { cn } from '@ui/lib/utils';
import 'cropperjs/dist/cropper.css';

export default function ImagePicker({
  value,
  onChange,
  previewClassName,
  input,
}: {
  value: string | null;
  onChange: (v: string) => void;
  previewClassName?: string;
  input?: ComponentProps<'input'>;
}) {
  const [selected, setSelected] = useState<File | null>();
  const preview = usePreview(selected);
  const cropperRef = useRef<ReactCropperElement>(null);
  const id = input?.id ?? 'image-upload';

  if (preview) {
    const onCrop = () => {
      const cropped = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();

      if (cropped) {
        onChange(cropped);
        setSelected(null);
      }
    };

    return (
      <div className="flex flex-col gap-3">
        <Cropper aspectRatio={1} guides ref={cropperRef} src={preview} />
        <div className="flex flex-row gap-3">
          <Button color="primary" onClick={onCrop} type="button">
            Crop
          </Button>
          <Button
            onClick={() => {
              setSelected(null);
            }}
            type="button"
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={previewClassName}>
      <input
        accept="image/*"
        className="hidden"
        id={id}
        multiple={false}
        onChange={(e) => {
          const item = e.target.files?.item(0);

          if (item) setSelected(item);
        }}
        type="file"
        {...input}
      />
      {value ? (
        <label htmlFor={id}>
          <img
            alt="selected file"
            className="w-full h-full rounded-xl cursor-pointer"
            src={value}
          />
        </label>
      ) : (
        <label
          aria-label="Pick Image"
          className={cn(
            'flex flex-col gap-3 items-center justify-center p-2 w-full h-full rounded-xl cursor-pointer',
            'bg-muted/50 border text-center text-muted-foreground/70'
          )}
          htmlFor={id}
        >
          <svg
            className="fill-accent-700 w-10 h-10"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 5h13v7h2V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h8v-2H4V5z" />
            <path d="m8 11-3 4h11l-4-6-3 4z" />
            <path d="M19 14h-2v3h-3v2h3v3h2v-3h3v-2h-3z" />
          </svg>
          <p className="text-xs">Select Image</p>
        </label>
      )}
    </div>
  );
}

export function usePreview(selected: File | Blob | undefined | null): string | null {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (selected) {
      const url = URL.createObjectURL(selected);
      setPreview(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
    setPreview(null);
  }, [selected]);

  return preview;
}
