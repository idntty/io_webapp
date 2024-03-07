import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { General, Security, Editor, Time } from 'untitledui-js';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { useState } from 'react';

import { cn, typedObjectKeys } from '../../../lib/utils';

import { useGridStore } from '../../../stores/gridStore';
import { GridItem, ITEM_SIZES } from '../../../types/grid';
import Button from '../../button/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '../../form';
import Input from '../../input';
import TextArea from '../../textarea';
import Divider from '../../divider';
import ImageBadge from '../grid/ImageBadge';

const FIELDS = {
  Name: { schemaName: 'textValue', htmlType: 'text', widgetType: 'name' },
  Bio: { schemaName: 'textAreaValue', htmlType: 'textarea', widgetType: 'bio' },
  'Date of Birth': {
    schemaName: 'dateValue',
    htmlType: 'date',
    widgetType: 'age',
  },
} as const;
const [firstField, ...restFields] = typedObjectKeys(FIELDS);

// FIXME: (very) temporary solution
const getDefaultValues = (editedGridItem: GridItem) => {
  const fieldType = Object.entries(FIELDS).find(
    ([, { widgetType }]) => widgetType === editedGridItem.type,
  )?.[0] as 'Name' | 'Bio' | 'Date of Birth';
  // only one of textValue, textAreaValue, dateValue should be defined, based on fieldType
  const textValue = (
    fieldType === 'Name' ? editedGridItem.content : undefined
  ) as string | undefined;
  const textAreaValue = (
    fieldType === 'Bio' ? editedGridItem.content : undefined
  ) as string | undefined;
  const dateValue = (
    fieldType === 'Date of Birth' ? editedGridItem.content : undefined
  ) as Date | undefined;
  return {
    fieldType,
    textValue,
    textAreaValue,
    dateValue,
    hashSalt: '',
    widgetSize: editedGridItem.size,
  };
};

const FormSchema = z
  .object({
    fieldType: z.enum([firstField, ...restFields], {
      required_error: 'Please select a field type.',
    }),
    textValue: z.string().optional(),
    textAreaValue: z.string().optional(),
    dateValue: z.coerce.date().optional(),
    hashSalt: z.string().min(1, {
      message: 'Please enter a hash salt.',
    }),
    widgetSize: z.enum(ITEM_SIZES),
  })
  // one of the fields is required
  .refine((data) => data.textValue ?? data.textAreaValue ?? data.dateValue, {
    message: 'Please enter a value.',
    path: ['textValue', 'textAreaValue', 'dateValue'],
  });

export type EditItemFormSchemaType = z.infer<typeof FormSchema>;

const widgetSizeVariants = [
  { type: 'tiny', sizeClassName: 'h-[40px] w-[40px]' },
  { type: 'long', sizeClassName: 'h-[40px] w-[80px]' },
  { type: 'tall', sizeClassName: 'h-[80px] w-[40px]' },
  { type: 'large', sizeClassName: 'h-[80px] w-[80px]' },
];

export interface EditItemFormProps {
  editedItemID: string;
  onCancel: () => void;
  onSubmit: () => void;
}

const EditItemForm: React.FC<EditItemFormProps> = ({
  editedItemID,
  onCancel,
  onSubmit,
}) => {
  const [pane, setPane] = useState<'private' | 'badge'>('private');
  const [selectedBadge, setSelectedBadge] = useState<string>('1');

  const grid = useGridStore((state) => state.grid);
  const addNewGridItem = useGridStore((state) => state.addNewGridItem);
  const updateGridItem = useGridStore((state) => state.updateGridItem);

  const form = useForm<EditItemFormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: getDefaultValues(grid[editedItemID]),
    mode: 'onChange',
  });

  const onFormSubmit = (data: EditItemFormSchemaType) => {
    onSubmit();
    console.log(data);
    updateGridItem(editedItemID, {
      size: data.widgetSize,
      type: FIELDS[data.fieldType].widgetType,
      content: data.textValue ?? data.textAreaValue ?? data.dateValue ?? '',
    });
    addNewGridItem('tiny');
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
          <div className="flex h-[42px] flex-col items-center justify-center gap-[10px]">
            <div className="flex justify-center gap-[12px] rounded-2xl bg-gray-50 pb-[4px] pl-[4px] pr-[12px] pt-[4px] mix-blend-multiply">
              <button
                onClick={() => setPane('private')}
                className="flex items-center justify-center rounded-2xl bg-white px-[10px] py-[2px] text-center text-sm font-medium text-gray-700"
              >
                Private
              </button>
              <button
                onClick={() => setPane('badge')}
                className="self-center text-sm font-medium text-gray-700"
              >
                Badge
              </button>
            </div>
          </div>
          <div className="flex gap-[16px] self-stretch">
            <div className="flex flex-shrink-0 flex-grow basis-0 flex-col gap-[4px]">
              <div className="self-stretch text-lg font-medium text-gray-900">
                {pane === 'private' ? 'Private data' : 'Digital Badge'}
              </div>
              <div className="self-stretch text-sm font-normal text-gray-500">
                Add the details to your profile
              </div>
            </div>
            <div className="flex items-center gap-[12px]">
              <Button onClick={onCancel} size="md" variant="secondary-gray">
                Cancel
              </Button>
              <Button type="submit" size="md" variant="secondary-color">
                Save
              </Button>
              <Button type="submit" size="md" variant="primary">
                Save & Sync
              </Button>
            </div>
          </div>
          <Divider />
        </div>
        {pane === 'private' ? (
          <div className="flex flex-col gap-[20px] self-stretch">
            <FormField
              control={form.control}
              name="fieldType"
              render={({ field }) => (
                <FormItem className="flex gap-[32px] self-stretch">
                  <div className="flex w-[280px] flex-col">
                    <FormLabel className="self-stretch text-sm font-medium text-gray-700">
                      Field type
                    </FormLabel>
                    <FormDescription className="self-stretch text-sm font-normal text-gray-500">
                      Select the type of data to be filled
                    </FormDescription>
                  </div>
                  <div className="flex w-[512px] flex-col gap-[6px]">
                    <FormControl>
                      <Input
                        className="self-stretch"
                        Icon={General.SearchMD}
                        placeholder="Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-sm font-normal" />
                  </div>
                </FormItem>
              )}
            />
            {FIELDS[form.watch('fieldType')] && (
              <FormField
                control={form.control}
                // want to use the value of fieldType to determine which field to show
                name={FIELDS[form.watch('fieldType')].schemaName}
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
                        {
                          // FIXME: Help TS with understanding types
                          field.name === 'dateValue' ? (
                            // @ts-expect-error - TS doesn't know that field.name is 'dateValue'
                            <Input
                              className="self-stretch"
                              type="date"
                              Icon={Time.Calender}
                              {...field}
                            />
                          ) : field.name === 'textAreaValue' ? (
                            // @ts-expect-error - TS doesn't know that field.name is 'textAreaValue'
                            <TextArea
                              type="text"
                              className="self-stretch"
                              placeholder="I'm a Product Designer based in Melbourne, Australia. I specialise in UX/UI design, brand strategy, and Webflow development."
                              maxLength={400}
                              {...field}
                            />
                          ) : field.name === 'textValue' ? (
                            // @ts-expect-error - TS doesn't know that field.name is 'textValue'
                            <Input
                              className="self-stretch"
                              placeholder="John Doe"
                              type="text"
                              Icon={Editor.TextInput}
                              {...field}
                            />
                          ) : null
                        }
                      </FormControl>
                      <FormMessage className="text-sm font-normal" />
                    </div>
                  </FormItem>
                )}
              />
            )}
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
                      defaultValue={field.value}
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
        ) : (
          <RadioGroup.Root
            className="grid grid-cols-2 gap-[40px] py-[20px] lg:grid-cols-4"
            defaultValue={selectedBadge}
            onValueChange={(value) => setSelectedBadge(value)}
          >
            {Array.from({ length: 10 }).map((_, index) => (
              <RadioGroup.Item
                key={index}
                value={(index + 1).toString()}
                id={(index + 1).toString()}
                className="group cursor-pointer disabled:cursor-not-allowed"
              >
                <ImageBadge imgURL={`badges/${index + 1}.png`} />
              </RadioGroup.Item>
            ))}
          </RadioGroup.Root>
        )}
      </form>
    </Form>
  );
};

export default EditItemForm;
