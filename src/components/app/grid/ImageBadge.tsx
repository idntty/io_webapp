import * as React from 'react';

import { cn } from '../../../lib/utils';

export interface ImageBadgeType {
  imgURL: string;
}

export interface ImageBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ImageBadgeType {}

const ImageBadge = React.forwardRef<HTMLDivElement, ImageBadgeProps>(
  ({ className, imgURL, ...props }, ref) => {
    return (
      <div
        className={cn(
          'relative flex h-[180px] w-[180px] shrink-0 items-center justify-center rounded-[40px] border border-solid border-transparent bg-gray-25 hover:border-orange-500 group-aria-checked:border-brand-300',
          className,
        )}
        ref={ref}
        {...props}
      >
        <img src={imgURL} alt="badge" className="object-cover" />
      </div>
    );
  },
);
ImageBadge.displayName = 'ImageBadge';

export default ImageBadge;
