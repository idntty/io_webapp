import * as React from 'react';
import { General } from 'untitledui-js';

export interface WidgetDeleteProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

const WidgetDelete: React.FC<WidgetDeleteProps> = () => {
  return (
    <button className="delete-handle invisible absolute right-[20px] top-[20px] z-10 flex items-center justify-center gap-[4px] rounded-2xl bg-orange-50 p-[8px] group-hover:visible">
      <General.XClose size="12" className="delete-handle stroke-orange-500" />
    </button>
  );
};

export default WidgetDelete;
