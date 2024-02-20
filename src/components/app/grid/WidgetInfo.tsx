import * as React from 'react';
import { General } from 'untitledui-js';

export interface WidgetInfoProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

const WidgetInfo: React.FC<WidgetInfoProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="info-handle invisible absolute right-[20px] top-[20px] z-10 flex items-center justify-center gap-[4px] rounded-2xl bg-orange-50 p-[8px] group-hover:visible"
    >
      <General.InfoCircle size="12" className="info-handle stroke-orange-500" />
    </button>
  );
};

export default WidgetInfo;
