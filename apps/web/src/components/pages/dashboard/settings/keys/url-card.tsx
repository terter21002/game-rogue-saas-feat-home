import { Input } from '@ui/components/ui/input';
import { CopyButton } from './copy-button';

interface UrlCardProps {
  value: string | null;
}

export function UrlCard({ value }: UrlCardProps): JSX.Element {
  return (
    <div className="bg-muted rounded-xl p-6">
      <div className="flex items-center gap-x-10 ">
        <p className="shrink-0 font-semibold">Server URL</p>
        <div className="w-full space-y-2">
          <div className="flex w-full items-center gap-x-2">
            <Input value={value || ''} disabled placeholder="Server URL" />
            <CopyButton value={value || ''} />
          </div>
        </div>
      </div>
    </div>
  );
}
