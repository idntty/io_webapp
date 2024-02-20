import * as React from 'react';
import { Editor } from 'untitledui-js';

export interface WidgetEditProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

const WidgetEdit: React.FC<WidgetEditProps> = () => {
  return (
    <button className="edit-handle invisible absolute bottom-[20px] right-[20px] z-10 flex items-center justify-center gap-[4px] rounded-2xl bg-orange-50 p-[8px] group-hover:visible">
      <Editor.PencilLine size="12" className="edit-handle stroke-orange-500" />
    </button>
  );
};

export default WidgetEdit;
