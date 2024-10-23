import { useEffect } from 'react';
import { FileUploader as FileUploaderBase } from 'react-drag-drop-files';
import { UploadCloud01, Trash01 } from 'untitledui-js';
import { filesize } from 'filesize';

export interface FileUploaderProps {
  handleFileChange: (file: File | undefined) => void;
  required: boolean;
  value: File | undefined;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  handleFileChange,
  required,
  value,
}) => {
  const handleChange = (newFile: File | undefined) => {
    if (newFile === null) {
      console.log('handleChange received null, ignoring.');
      return;
    }
    console.log('handleChange called with:', newFile);
    handleFileChange(newFile);
  };

  const removeFile = () => {
    handleFileChange(undefined);
  };

  useEffect(() => {
    console.log('FileUploader mounted');
    return () => {
      console.log('FileUploader unmounted');
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-[4px] self-stretch rounded-lg border border-solid border-gray-200 bg-white py-[16px]">
      {value ? (
        <div className="flex w-full gap-[4px] p-[16px]">
          <div className="flex shrink-0 grow basis-0 gap-[16px]">
            <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[28px] border-[4px] border-brand-50 bg-brand-100 p-[8px]">
              <UploadCloud01 size="16" className="shrink-0 stroke-brand-600" />
            </div>
            <div>
              <span className="block text-sm font-medium text-gray-700">
                {value.name}
              </span>
              <span className="block text-sm text-gray-500">
                {filesize(value.size)}
              </span>
            </div>
          </div>
          <button
            onClick={removeFile}
            className="text-gray-500 hover:text-red-600"
          >
            <Trash01 size="20" />
          </button>
        </div>
      ) : (
        <FileUploaderBase
          handleChange={handleChange}
          name="file"
          types={['SVG', 'PNG', 'JPG', 'JPEG', 'GIF']}
          required={required}
          hoverTitle=" "
        >
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
        </FileUploaderBase>
      )}
    </div>
  );
};
