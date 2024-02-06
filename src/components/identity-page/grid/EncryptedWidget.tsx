import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Shapes } from 'untitledui-js';

import { cn } from '../../../lib/utils';
import WidgetIcon from './WidgetIcon';

const encryptedWidgetVariants = cva(
  '@container relative flex overflow-hidden justify-center items-center shrink-0 rounded-[40px] border-solid bg-gray-25 font-widget border border-warning-200',
  {
    variants: {
      size: {
        tiny: 'w-[180px] h-[180px]',
        long: 'w-[180px] h-[400px]',
        tall: 'w-[400px] h-[180px]',
        large: 'w-[400px] h-[400px]',
      },
    },
    defaultVariants: {
      size: 'tiny',
    },
  },
);

const text =
  '1A3F9BC0D72E8AF6048D51372B6C87EA2E0F5D1A3F9BC0D72E8AF6048D51372B6C87EA2E0F5D1A3F9BC0D72E8AF6048D51372B6C87EA2E0F5D1A3F9BC0D72E1A3F9BC0D72E8AF6048D51372B6C87EA2E0F5D1A3F9BC0D72E8AF6048D51372B1A3F9BC0D72E8AF6048D51372B6C87EA2E0F5D1AD513721A3F9BC0D72E8AF6048D51372B6C87EA2E0F5D1A3F9BC0D72E8AF6048D51372B6C87EA2E0F5D1A3F9BC0D722E8AF6048D51372B6C87EA2E0F5D1A3F9BC0D72E8AF6048D51370D72E8AF6048D51372B6C87EA2E0F5D1A3F9BC0D72E8AF6048D51372B1A3F9BC0D72E8AF6048D51372B6C87EA2E0F5D1AD513721A3F9BC0D72E8AF6048D51372B6C87EA2E0F5D1A3F9BC0D72E8AF6048D51372B6C87EA2E0F5D1A3F9BC0D72E8AF6048D51372B6C87EA2E0F5D1A3F9BC0D72E1A3F9BC0D72E8AF6048D51372B6C87EA2E0F5D11A3F9BC0D72E8AF6048D51372B6C87EA2E0F5D1A3F9BC0D72E8AF6048D51372B6C87EA2E0F5D1A3F9BC0D72E8AF6048D51372B6C87EA2E0F5D1A3F9BC0D72E1A3F9BC0D72E8AF6048D51372B6C87EA2E0F5D1A3F9BC0D72E8AF6048D51372B1A3F9BC0D72E8AF6048D51372B6C87EA2E0F5D1AD513721A3F9BC0D72E8AF6048D51372B6C87EA2E0F5D1A3F9BC0D72E8AF6048D51372B6C87EA2E0F5D1A3F9BC0D72E8AF6048D51372B6C87EA2E0F5D1A3F9BC0D72E1A3F9BC0D72E8AF6048D51372B6C87EA2E0F5D1A3F9BC0D72E8AF6048D51372B1A3F9BC0D72E8AF6048D51372B6C87EA2E0F5D1AD513721A3F9BC0D72E8AF6048D51372B6C87EA2E0F5D1A3F9BC0D72E8AF6048D51372B6C87EA2E0F5D1A3F9BC0D72E8AF6048D51372B6C87EA2E0F1A3F9BC0D72E8AF6048D51372B6C87EA2E0F5D1A3F9BC0D72E8AF6048D51372B';

export interface EncryptedWidgetProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof encryptedWidgetVariants> {}

const EncryptedWidget = React.forwardRef<HTMLDivElement, EncryptedWidgetProps>(
  ({ className, size, ...props }, ref) => {
    // FIXME: Is there a better way to handle this?
    if (!size) {
      size = 'tiny';
    }
    return (
      <div
        className={cn(encryptedWidgetVariants({ size }), className)}
        ref={ref}
        {...props}
      >
        <WidgetIcon Icon={Shapes.Cube01} strokeClassName="stroke-warning-200" />
        <div className="select-none text-wrap break-all text-center text-xs/[18px] font-normal text-gray-300">
          {text}
        </div>
        {/* <img
          src="/shield.png"
          alt="shield"
          className="absolute left-1/2 top-1/2 h-[75px] w-[75px] -translate-x-1/2 -translate-y-1/2 transform"
        /> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          viewBox="0 0 100 100"
          version="1.1"
          className="absolute left-1/2 top-1/2 h-[75px] w-[75px] -translate-x-1/2 -translate-y-1/2 transform"
        >
          <path
            d="M 34.446 5.513 C 28.367 8.477, 19.592 12.004, 14.946 13.352 L 6.500 15.803 6.629 26.152 C 6.700 31.843, 7.493 39.588, 8.391 43.363 C 9.289 47.137, 11.397 53.655, 13.075 57.847 C 14.754 62.038, 18.553 69.113, 21.517 73.569 C 24.482 78.025, 30.048 84.633, 33.886 88.253 C 37.723 91.873, 42.933 96.048, 45.462 97.531 L 50.061 100.226 54.280 97.446 C 56.601 95.917, 60.570 92.928, 63.099 90.804 C 65.629 88.679, 69.940 84.142, 72.680 80.721 C 75.419 77.299, 79.254 71.800, 81.203 68.500 C 83.151 65.200, 85.985 59.352, 87.502 55.505 C 89.019 51.657, 91.120 44.298, 92.172 39.151 C 93.300 33.630, 93.964 26.918, 93.792 22.782 L 93.500 15.772 85.049 13.335 C 80.400 11.995, 71.496 8.446, 65.262 5.449 C 56.832 1.396, 52.848 0.016, 49.714 0.063 C 46.740 0.107, 42.248 1.710, 34.446 5.513 M 47.465 32.961 C 46.346 33.409, 44.809 34.526, 44.049 35.441 C 43.289 36.357, 42.667 38.427, 42.667 40.040 C 42.667 41.654, 43.439 43.827, 44.382 44.870 L 46.098 46.766 44.549 53.445 C 43.697 57.118, 43 60.771, 43 61.562 C 43 62.676, 44.579 63, 50 63 C 55.421 63, 57 62.676, 57 61.562 C 57 60.771, 56.303 57.118, 55.451 53.445 L 53.902 46.766 55.618 44.870 C 56.561 43.827, 57.333 41.605, 57.333 39.932 C 57.333 38.240, 56.482 36.072, 55.417 35.049 C 54.362 34.037, 52.600 32.970, 51.500 32.677 C 50.400 32.385, 48.584 32.512, 47.465 32.961"
            stroke="none"
            fill="#fec84b"
            fillRule="evenodd"
          />
        </svg>
      </div>
    );
  },
);
EncryptedWidget.displayName = 'EncryptedWidget';

export default EncryptedWidget;
