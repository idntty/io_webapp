import * as React from 'react';

import { cn } from '../../../lib/utils';
import WidgetInfo from './WidgetInfo';

export interface ImageBadgeType {
  imgURL: string;
}

export interface ImageBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ImageBadgeType {
  onInfoClick?: () => void;
}

const ImageBadge = React.forwardRef<HTMLDivElement, ImageBadgeProps>(
  ({ className, imgURL, onInfoClick, ...props }, ref) => {
    return (
      <div
        className={cn(
          'group relative flex h-[180px] w-[180px] shrink-0 items-center justify-center rounded-[40px] border border-solid border-transparent bg-gray-25 hover:border-orange-500',
          className,
        )}
        ref={ref}
        {...props}
      >
        <WidgetInfo onClick={onInfoClick} />
        <img src={imgURL} alt="badge" className="object-cover" />
      </div>
    );
  },
);
ImageBadge.displayName = 'ImageBadge';

export default ImageBadge;
