import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Plus } from 'untitledui-js';

import { useGridStore } from '../../../stores/gridStores';

import Button from '../../button/button';
import {
  Form,
  // FormControl,
  // FormField,
  FormItem,
  FormLabel,
  // FormMessage,
  FormDescription,
} from '../../form';
import Badge from '../../badge';
import Divider from '../../divider';

const FormSchema = z.object({});

export type ValidateFormSchemaType = z.infer<typeof FormSchema>;

export interface ValidateFormProps {
  onCancel: () => void;
  selectedForValidation: string[];
}

const ValidateForm: React.FC<ValidateFormProps> = ({
  onCancel,
  selectedForValidation,
}) => {
  const grid = useGridStore((state) => state.grid);

  const form = useForm<ValidateFormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
    mode: 'onChange',
  });

  const onSubmit = (data: ValidateFormSchemaType) => {
    console.log(data);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit(onSubmit)(e);
        }}
        className="flex flex-col gap-[24px] self-stretch bg-white"
      >
        <div className="flex flex-col gap-[20px] self-stretch pb-[1px]">
          <div className="flex gap-[16px] self-stretch">
            <div className="flex flex-shrink-0 flex-grow basis-0 flex-col gap-[4px]">
              <div className="self-stretch text-lg font-medium text-gray-900">
                Validate private data
              </div>
              <div className="self-stretch text-sm font-normal text-gray-500">
                Fill out the data validation preferences form
              </div>
            </div>
            <div className="flex items-center gap-[12px]">
              <Button
                onClick={handleCancel}
                type="button"
                size="md"
                variant="secondary-gray"
              >
                Cancel
              </Button>
              <Button type="submit" size="md" variant="primary">
                Share
              </Button>
            </div>
          </div>
          <Divider />
        </div>
        <div className="flex flex-col gap-[20px] self-stretch">
          <FormItem className="flex gap-[32px] self-stretch">
            <div className="flex w-[280px] flex-col">
              <FormLabel className="self-stretch text-sm font-medium text-gray-700">
                Validated by
              </FormLabel>
              <FormDescription className="self-stretch text-sm font-normal text-gray-500">
                Your private data confirmed by other users
              </FormDescription>
            </div>
            {/* Gap is 20px - 12px = 8px */}
            <div className="flex gap-[20px]">
              <div className="flex">
                {Array.from({ length: 10 }).map((_, index) => (
                  <div
                    key={index}
                    className="mr-[-12px] h-[40px] w-[40px] rounded-full border-[1.5px] border-solid border-white bg-gray-300"
                  ></div>
                ))}
                <div className="mr-[-12px] flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border-[2px] border-solid border-white bg-brand-50 px-0 py-[8px] text-center text-base font-medium text-brand-600">
                  +5
                </div>
              </div>
            </div>
            <button className="flex h-[40px] w-[40px] items-center justify-center rounded-full border border-dashed border-gray-300 bg-white p-[8px]">
              <div className="flex items-center justify-center rounded-xl p-[4px]">
                <Plus size="16" className="stroke-gray-400" />
              </div>
            </button>
          </FormItem>
          <Divider />
          <FormItem className="flex gap-[32px] self-stretch">
            <div className="flex w-[280px] flex-col">
              <FormLabel className="self-stretch text-sm font-medium text-gray-700">
                Transaction cost
              </FormLabel>
              <FormDescription className="self-stretch text-sm font-normal text-gray-500">
                Cost of storing data on the blockchain network
              </FormDescription>
            </div>
            <div className="flex w-[512px] flex-col">
              <div className="text-5xl/[60px] font-medium -tracking-[0.96px] text-gray-500">
                0,0176/idn
              </div>
              {/* <div className="text-sm text-error-500">
                Insufficient funds for{' '}
                <span className="font-bold">save & sync</span>
              </div> */}
            </div>
          </FormItem>
          <Divider />
          <FormItem className="flex gap-[32px] self-stretch">
            <div className="flex w-[280px] flex-col">
              <FormLabel className="self-stretch text-sm font-medium text-gray-700">
                Private data
              </FormLabel>
              <FormDescription className="self-stretch text-sm font-normal text-gray-500">
                You can validate only synchronized private data, select it below
              </FormDescription>
            </div>
            <div className="flex items-center justify-center gap-[20px]">
              {selectedForValidation.map((id, index) => (
                <Badge key={index} size="md" variant="secondary">
                  {grid[id].type}
                </Badge>
              ))}
            </div>
          </FormItem>
        </div>
      </form>
    </Form>
  );
};

export default ValidateForm;
