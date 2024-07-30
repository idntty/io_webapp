import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { SearchMD, Plus, Key01, TextInput, Calendar } from 'untitledui-js';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

import { cn, saveDataToServer } from '../../../lib/utils';
import { setFeature, getSetFeatureCost } from '../../../lib/apiClient';

import { encryptGridItemContent } from '../../../lib/crypto';
import { useGridStore } from '../../../stores/gridStores';
import { GridItem, GridItemType, ITEM_SIZES } from '../../../types/grid';
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../tabs';

const handleSendEncryptedData = async (uuid: string, content: string) => {
  const { encryptedMessage, nonce } = await encryptGridItemContent(content);
  const data = [
    {
      uuid,
      value: Buffer.from(encryptedMessage).toString('hex'),
      nonce: Buffer.from(nonce).toString('hex'),
    },
  ];
  const publicKey = localStorage.getItem('publicKey');
  if (!publicKey) {
    throw new Error('Public key not found');
  }
  const privateKey = sessionStorage.getItem('privateKey');
  if (!privateKey) {
    throw new Error('Private key not found');
  }
  console.log('Saving data to server:', data);
  return Promise.all([
    saveDataToServer(publicKey, 'private', data),
    setFeature(data, privateKey, publicKey),
  ]);
};

const getRandomHashSalt = () =>
  Array.from({ length: 3 })
    .map(() => Math.random().toString(36).slice(2).toUpperCase())
    .join('');

const FIELDS = {
  Name: { schemaName: 'textValue', htmlType: 'text', widgetType: 'name' },
  Bio: { schemaName: 'textAreaValue', htmlType: 'textarea', widgetType: 'bio' },
  'Date of Birth': {
    schemaName: 'dateValue',
    htmlType: 'date',
    widgetType: 'age',
  },
  Phone: { schemaName: 'textValue', htmlType: 'tel', widgetType: 'phone' },
  Email: { schemaName: 'textValue', htmlType: 'email', widgetType: 'email' },
  Citizenship: {
    schemaName: 'textValue',
    htmlType: 'text',
    widgetType: 'citizenship',
  },
  Location: {
    schemaName: 'textValue',
    htmlType: 'text',
    widgetType: 'location',
  },
};

// FIXME: a (very) temporary solution
const getWidgetTypeOrOther = (fieldType: string) => {
  return (FIELDS[fieldType as keyof typeof FIELDS]?.widgetType ??
    'other') as GridItemType;
};

// FIXME: a (very) temporary solution
const getSchemaNameOrTextValue = (fieldType: string) => {
  return (FIELDS[fieldType as keyof typeof FIELDS]?.schemaName ??
    'textValue') as 'textValue' | 'textAreaValue' | 'dateValue';
};

// FIXME: a (very) temporary solution
const getDefaultValues = (editedGridItem: GridItem) => {
  const fieldType = Object.entries(FIELDS).find(
    ([, { widgetType }]) => widgetType === editedGridItem.type,
  )?.[0] as
    | 'Name'
    | 'Bio'
    | 'Date of Birth'
    | 'Phone'
    | 'Email'
    | 'Citizenship'
    | 'Location';
  // only one of textValue, textAreaValue, dateValue should be defined, based on fieldType
  const textValue = (
    fieldType in ['Name', 'Phone', 'Email', 'Citizenship', 'Location']
      ? editedGridItem.content
      : undefined
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
    hashSalt: getRandomHashSalt(),
    widgetSize: editedGridItem.size,
  };
};

const searchableFieldTypes = Object.keys(FIELDS).map((key, index) => ({
  id: index,
  name: key,
}));
type SearchableFieldType = (typeof searchableFieldTypes)[number];

const FieldsSchema = z
  .object({
    fieldType: z.string({
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
  // FIXME: path is not working
  .refine((data) => data.textValue ?? data.textAreaValue ?? data.dateValue, {
    message: 'Please enter a value.',
    path: ['textValue', 'textAreaValue', 'dateValue'],
  });

const BadgeSchema = z.object({
  selectedBadge: z.string(),
});
const FormSchema = z.union([FieldsSchema, BadgeSchema]);

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
  const [tab, setTab] = useState<'private' | 'badge'>('private');

  const grid = useGridStore((state) => state.grid);
  const addNewGridItem = useGridStore((state) => state.addNewGridItem);
  const updateGridItem = useGridStore((state) => state.updateGridItem);

  const [transactionCost, setTransactionCost] = useState<bigint>(0n);

  const form = useForm<EditItemFormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: getDefaultValues(grid[editedItemID]),
    mode: 'onChange',
  });

  const onFormSubmit = (data: EditItemFormSchemaType) => {
    onSubmit();
    console.log(data);
    if ('selectedBadge' in data) {
      updateGridItem(editedItemID, {
        size: 'tiny',
        type: 'badge',
        content: `/badges/${data.selectedBadge}.png`,
      });
    } else {
      const content =
        data.textValue ?? data.textAreaValue ?? data.dateValue ?? '';
      updateGridItem(editedItemID, {
        size: data.widgetSize,
        type: getWidgetTypeOrOther(data.fieldType),
        content,
      });
      handleSendEncryptedData(editedItemID, content.toString())
        .then(([_, { transactionId }]) => {
          console.log('Send tx to node, id:', transactionId);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (grid[editedItemID].type === 'new') {
      addNewGridItem('tiny');
    }
  };

  const updateTransactionCost = async (uuid: string, content: string) => {
    const { encryptedMessage, nonce } = await encryptGridItemContent(content);
    const data = [
      {
        uuid,
        value: Buffer.from(encryptedMessage).toString('hex'),
        nonce: Buffer.from(nonce).toString('hex'),
      },
    ];
    const publicKey = localStorage.getItem('publicKey');
    if (!publicKey) {
      throw new Error('Public key not found');
    }
    const privateKey = sessionStorage.getItem('privateKey');
    if (!privateKey) {
      throw new Error('Private key not found');
    }

    setTransactionCost(await getSetFeatureCost(data, privateKey, publicKey));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit(onFormSubmit, (errors) => {
            console.log(errors);
          })(e);
        }}
      >
        <Tabs
          defaultValue={tab}
          onValueChange={() => setTab(tab === 'private' ? 'private' : 'badge')}
          className="flex flex-col gap-[24px] self-stretch bg-white"
        >
          <div className="flex flex-col gap-[20px] self-stretch pb-[1px]">
            <div className="flex h-[42px] flex-col items-center justify-center gap-[10px]">
              <TabsList>
                <TabsTrigger value="private">Private</TabsTrigger>
                <TabsTrigger value="badge">Badge</TabsTrigger>
              </TabsList>
            </div>
            <div className="flex gap-[16px] self-stretch">
              <div className="flex flex-shrink-0 flex-grow basis-0 flex-col gap-[4px]">
                <div className="self-stretch text-lg font-medium text-gray-900">
                  {tab === 'private' ? 'Private data' : 'Digital Badge'}
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
          <TabsContent value="private">
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
                    <div className="relative flex w-[512px] flex-col gap-[6px] overflow-visible">
                      <SearchMD
                        size="20"
                        className="absolute left-[15px] top-[13px] z-[100] stroke-gray-500"
                      />
                      <ReactSearchAutocomplete<SearchableFieldType>
                        items={searchableFieldTypes}
                        onSearch={(string: string) => {
                          field.onChange(string);
                        }}
                        onSelect={(item: SearchableFieldType) => {
                          field.onChange(item.name);
                        }}
                        formatResult={(item: SearchableFieldType) => {
                          return (
                            <div className="relative flex w-full cursor-pointer select-none items-center justify-between gap-[8px] px-[14px] py-[10px] text-base outline-none data-[disabled]:pointer-events-none">
                              {item.name}
                            </div>
                          );
                        }}
                        placeholder="Search for a field type"
                        styling={{
                          height: '44px',
                          border: '1px solid #D0D5DD',
                          borderRadius: '8px',
                          backgroundColor: 'white',
                          boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
                          hoverBackgroundColor: 'white',
                          color: '#101828',
                          fontSize: '16px',
                          fontFamily: 'Inter',
                          iconColor: 'white',
                          lineColor: '#101828',
                          placeholderColor: '#667085',
                          searchIconMargin: '0 0 0 9px',
                        }}
                      />
                      <FormMessage className="text-sm font-normal" />
                    </div>
                  </FormItem>
                )}
              />
              {form.watch('fieldType') !== '' && (
                <FormField
                  control={form.control}
                  // want to use the value of fieldType to determine which field to show
                  name={getSchemaNameOrTextValue(form.watch('fieldType'))}
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
                                Icon={Calendar}
                                {...field}
                                onChange={(e) => {
                                  updateTransactionCost(
                                    editedItemID,
                                    field.value?.toString() ?? '',
                                  ).catch(console.error);
                                  field.onChange(e);
                                }}
                              />
                            ) : field.name === 'textAreaValue' ? (
                              // @ts-expect-error - TS doesn't know that field.name is 'textAreaValue'
                              <TextArea
                                type="text"
                                className="self-stretch"
                                placeholder="I'm a Product Designer based in Melbourne, Australia. I specialise in UX/UI design, brand strategy, and Webflow development."
                                maxLength={400}
                                {...field}
                                onChange={(e) => {
                                  updateTransactionCost(
                                    editedItemID,
                                    field.value?.toString() ?? '',
                                  ).catch(console.error);
                                  field.onChange(e);
                                }}
                              />
                            ) : field.name === 'textValue' ? (
                              // @ts-expect-error - TS doesn't know that field.name is 'textValue'
                              <Input
                                className="self-stretch"
                                placeholder={
                                  {
                                    Name: 'John Doe',
                                    Phone: '+12223334444',
                                    Email: 'johndoe@gmail.com',
                                    Citizenship: 'RU',
                                    Location: 'RU',
                                  }[form.watch('fieldType')]
                                }
                                type="text"
                                Icon={TextInput}
                                {...field}
                                onChange={(e) => {
                                  updateTransactionCost(
                                    editedItemID,
                                    field.value?.toString() ?? '',
                                  ).catch(console.error);
                                  field.onChange(e);
                                }}
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
                          Icon={Key01}
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
              {grid[editedItemID].type !== 'new' && (
                <>
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
                </>
              )}
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
                    {`${transactionCost} IDN`}
                  </div>
                  {/* <div className="text-sm text-error-500">
                Insufficient funds for{' '}
                <span className="font-bold">save & sync</span>
              </div> */}
                </div>
              </FormItem>
            </div>
          </TabsContent>
          <TabsContent value="badge">
            <FormField
              control={form.control}
              name="selectedBadge"
              render={({ field }) => (
                <FormItem>
                  <RadioGroup.Root
                    className="grid grid-cols-2 gap-[40px] py-[20px] lg:grid-cols-4"
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    {Array.from({ length: 10 }).map((_, index) => (
                      <FormControl key={index}>
                        <RadioGroup.Item
                          value={(index + 1).toString()}
                          id={(index + 1).toString()}
                          className="group cursor-pointer disabled:cursor-not-allowed"
                        >
                          <ImageBadge imgURL={`/badges/${index + 1}.png`} />
                        </RadioGroup.Item>
                      </FormControl>
                    ))}
                  </RadioGroup.Root>
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
};

export default EditItemForm;
