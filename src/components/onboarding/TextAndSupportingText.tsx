import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const textAndSupportingTextVariants = cva(
  'flex w-[360px] flex-col justify-center gap-[12px]',
  {
    variants: {
      align: {
        left: 'text-left items-start',
        center: 'text-center items-center',
        right: 'text-right items-end',
      },
    },
    defaultVariants: {
      align: 'left',
    },
  },
);

export interface TextAndSupportingTextProps
  extends React.ButtonHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof textAndSupportingTextVariants> {
  text: string;
  supportingText: string;
}

const TextAndSupportingText: React.FC<TextAndSupportingTextProps> = ({
  text,
  supportingText,
  align,
  className,
}) => {
  return (
    <div className={cn(textAndSupportingTextVariants({ align }), className)}>
      <div className="text-3xl/[38px] font-semibold">{text}</div>
      <div className="relative inline-block w-[355px] text-base font-normal text-gray-500">
        {supportingText}
      </div>
    </div>
  );
};

export default TextAndSupportingText;
