import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { General, Security } from 'untitledui-js';
import * as RadioGroup from '@radix-ui/react-radio-group';

import { cn } from '../../lib/utils';

import Button from '../button/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '../form';
import Input from '../input';
import TextArea from '../textarea';
import Divider from '../divider';

const FormSchema = z.object({
  // TODO: Figure out how to add date here
  value: z.string().min(1, {
    message: 'Please enter a value.',
  }),
  hashSalt: z.string().min(1, {
    message: 'Please enter a hash salt.',
  }),
  widgetSize: z.enum(['tiny', 'long', 'tall', 'large']),
});

export type EditItemFormSchemaType = z.infer<typeof FormSchema>;

const widgetSizeVariants = [
  { type: 'tiny', sizeClassName: 'h-[40px] w-[40px]' },
  { type: 'long', sizeClassName: 'h-[40px] w-[80px]' },
  { type: 'tall', sizeClassName: 'h-[80px] w-[40px]' },
  { type: 'large', sizeClassName: 'h-[80px] w-[80px]' },
];

export interface EditItemFormProps {
  onCancel: () => void;
  onSubmit: () => void;
}

const EditItemForm: React.FC<EditItemFormProps> = ({ onCancel, onSubmit }) => {
  const form = useForm<EditItemFormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      value: '',
      hashSalt: '',
      widgetSize: 'tiny',
    },
    mode: 'onChange',
  });

  const onFormSubmit = (data: EditItemFormSchemaType) => {
    onSubmit();
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit(onFormSubmit)(e);
        }}
        className="flex flex-col gap-[24px] self-stretch bg-white"
      >
        <div className="flex flex-col gap-[20px] self-stretch pb-[1px]">
          <div className="flex gap-[16px] self-stretch">
            <div className="flex flex-shrink-0 flex-grow basis-0 flex-col gap-[4px]">
              <div className="self-stretch text-lg font-medium text-gray-900">
                Private data
              </div>
              <div className="self-stretch text-sm font-normal text-gray-500">
                Edit the data in your profile
              </div>
            </div>
            <div className="flex items-center gap-[12px]">
              <Button onClick={onCancel} size="md" variant="secondary-gray">
                Cancel
              </Button>
              <Button type="submit" size="md" variant="secondary-color">
                Save
              </Button>
              <Button size="md" variant="primary">
                Save & Sync
              </Button>
            </div>
          </div>
          <Divider />
        </div>
        <div className="flex flex-col gap-[20px] self-stretch">
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem className="flex gap-[32px] self-stretch">
                <div className="flex w-[280px] flex-col">
                  <FormLabel className="self-stretch text-sm font-medium text-gray-700">
                    Value
                  </FormLabel>
                  <FormDescription className="self-stretch text-sm font-normal text-gray-500">
                    Your very private data
                  </FormDescription>
                </div>
                <div className="flex w-[512px] flex-col gap-[6px]">
                  <FormControl>
                    <TextArea
                      className="self-stretch"
                      maxLength={400}
                      placeholder="I'm a Product Designer based in Melbourne, Australia. I specialise in UX/UI design, brand strategy, and Webflow development."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm font-normal">
                    {400 - form.getValues('value').length} characters left
                  </FormMessage>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hashSalt"
            render={({ field }) => (
              <FormItem className="flex gap-[32px] self-stretch">
                <div className="flex w-[280px] flex-col">
                  <FormLabel className="self-stretch text-sm font-medium text-gray-700">
                    Hash salt
                  </FormLabel>
                  <FormDescription className="self-stretch text-sm font-normal text-gray-500">
                    Random data for added protection
                  </FormDescription>
                </div>
                <div className="flex w-[512px] flex-col gap-[6px]">
                  <FormControl>
                    <Input
                      withHelpIcon
                      className="self-stretch"
                      placeholder="D72E8AF6048D51372B1A3F9BC0D72E8AF6048D6048D"
                      // FIXME: This is not the right key icon
                      Icon={Security.Key01}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm font-normal" />
                </div>
              </FormItem>
            )}
          />
          <Divider />
          <FormField
            control={form.control}
            name="widgetSize"
            render={({ field }) => (
              <FormItem className="flex gap-[32px] self-stretch">
                <div className="flex w-[280px] flex-col">
                  <FormLabel className="self-stretch text-sm font-medium text-gray-700">
                    Widget size
                  </FormLabel>
                </div>
                <div className="flex w-[512px] flex-col gap-[6px]">
                  <RadioGroup.Root
                    onValueChange={field.onChange}
                    defaultValue="tiny"
                    className="flex items-center gap-[20px]"
                  >
                    {widgetSizeVariants.map(
                      ({ type, sizeClassName }, index) => (
                        <FormControl key={index}>
                          <RadioGroup.Item
                            value={type}
                            id={type}
                            className={cn(
                              sizeClassName,
                              'flex shrink-0 cursor-pointer items-center justify-center rounded-lg bg-brand-200 text-xs/[18px] font-bold text-white disabled:cursor-not-allowed aria-checked:bg-brand-600',
                            )}
                          >
                            <label htmlFor={type}>{type}</label>
                          </RadioGroup.Item>
                        </FormControl>
                      ),
                    )}
                  </RadioGroup.Root>
                  <FormMessage className="text-sm font-normal" />
                </div>
              </FormItem>
            )}
          />
          <Divider />
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
                <General.Plus size="16" className="stroke-gray-400" />
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
        </div>
      </form>
    </Form>
  );
};

export default EditItemForm;
