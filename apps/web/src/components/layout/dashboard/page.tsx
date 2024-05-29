import type { ReactNode } from 'react';

export default function DashboardPageWrapperComponent({
  children,
  title,
  removeWrapper,
}: {
  children: ReactNode;
  title?: string;
  removeWrapper?: boolean;
}): JSX.Element {
  if (removeWrapper)
    return (
      <div className="flex flex-1 flex-col gap-2 overflow-auto lg:gap-4">
        {title ? (
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
          </div>
        ) : null}
        <div className="flex flex-1">{children}</div>
      </div>
    );
  return (
    <div className="flex flex-1 flex-col gap-2 overflow-auto p-2 lg:gap-4 lg:p-4">
      {title ? (
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
        </div>
      ) : null}
      <div className="flex flex-1 rounded-lg border border-dashed p-2 shadow-sm">{children}</div>
    </div>
  );
}
