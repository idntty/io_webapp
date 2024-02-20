import * as React from 'react';
import type { SVGComponentProps } from 'untitledui-js';

export interface WidgetIconProps extends React.HTMLAttributes<HTMLDivElement> {
  Icon: React.ComponentType<SVGComponentProps>;
  strokeClassName?: string;
}

const WidgetIcon: React.FC<WidgetIconProps> = ({ Icon, strokeClassName }) => {
  return (
    <div className="absolute left-[20px] top-[20px] z-10 flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-white">
      <Icon size="24" className={strokeClassName} />
    </div>
  );
};

export default WidgetIcon;
