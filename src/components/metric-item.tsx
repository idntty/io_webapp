import { InfoCircle } from 'untitledui-js';

export interface MetricItemProps {
  title: string;
  value: string;
  subvalue?: string;
}

const MetricItem: React.FC<MetricItemProps> = ({ title, value, subvalue }) => {
  return (
    <div className="flex shrink-0 grow basis-0 flex-col gap-[24px] rounded-lg border border-solid border-gray-200 bg-white p-[24px] shadow-table">
      <div className="flex gap-[8px] self-stretch">
        <div className="shrink-0 grow basis-0 text-base font-medium text-gray-900">
          {title}
        </div>
        <InfoCircle size="20" className="stroke-gray-400" />
      </div>
      <div className="flex items-end gap-[16px] self-stretch">
        <div className="flex shrink-0 grow basis-0 gap-[16px]">
          <div className="self-stretch text-[60px]/[72px] -tracking-[1.2px] text-gray-900">
            {value}
          </div>
          {subvalue && (
            <div className="self-end text-[24px]/[32px] text-gray-900">
              {subvalue}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MetricItem;
