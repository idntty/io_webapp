import * as React from 'react';
import { PencilLine } from 'untitledui-js';

export interface WidgetEditProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  onEditClick: () => void;
}

const WidgetEdit: React.FC<WidgetEditProps> = ({ onEditClick }) => {
  return (
    <button
      onClick={onEditClick}
      className="edit-handle invisible absolute bottom-[20px] right-[20px] z-10 flex items-center justify-center gap-[4px] rounded-2xl bg-orange-50 p-[8px] group-hover:visible"
    >
      <PencilLine size="12" className="edit-handle stroke-orange-500" />
    </button>
  );
};

export default WidgetEdit;
