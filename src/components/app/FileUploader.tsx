import { FileUploader as FileUploaderBase } from 'react-drag-drop-files';
import { UploadCloud01 } from 'untitledui-js';

export interface FileUploaderProps {
  handleFileChange: (file: File) => void;
  required: boolean;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  handleFileChange,
  required,
}) => {
  return (
    <FileUploaderBase
      handleChange={handleFileChange}
      name="file"
      types={['SVG', 'PNG', 'JPG', 'JPEG', 'GIF']}
      required={required}
      hoverTitle=" "
    >
      <div className="flex flex-col items-center gap-[4px] self-stretch rounded-lg border border-solid border-gray-200 bg-white py-[16px]">
        <div className="flex flex-col items-center gap-[12px] self-stretch">
          <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[28px] border-[6px] border-solid border-gray-50 bg-gray-100 p-[10px]">
            <UploadCloud01 size="20" className="shrink-0 stroke-gray-600" />
          </div>
          <div className="flex flex-col items-center gap-[4px] self-stretch">
            <div className="flex items-start justify-center gap-[4px] self-stretch">
              <span className="text-sm font-semibold text-brand-700">
                Click to upload
              </span>
              <span className="text-sm text-gray-500">or drag and drop</span>
            </div>
            <span className="text-center text-sm text-gray-500">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </span>
          </div>
        </div>
      </div>
    </FileUploaderBase>
  );
};
