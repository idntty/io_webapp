import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Buffer } from 'buffer';
import { saveDataToServer } from '../../../lib/utils';
import { encryptGridItemContent } from '../../../lib/crypto';

import { useGridStore } from '../../../stores/gridStores';

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
import Badge from '../../badge';
import Divider from '../../divider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../select';

const FormSchema = z
  .object({
    sharingType: z.enum(['Specific user', 'Public (For everyone)'], {
      // FIXME: Error messages are not showing up
      invalid_type_error: 'Select a sharing type.',
      required_error: 'Please select a sharing type.',
    }),
    recepient: z.string().optional(),
    message: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.sharingType === 'Specific user') {
      if (!data.recepient || data.recepient.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['recepient'],
          message: "Please enter the recipient's public key.",
        });
      }
      if (!data.message || data.message.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['message'],
          message: 'Please complete your bio.',
        });
      }
    }

    if (data.recepient && data.recepient.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        minimum: 1,
        type: 'string',
        inclusive: true,
        path: ['recepient'],
        message: "Please enter the recipient's public key.",
      });
    }

    if (data.message) {
      if (data.message.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 1,
          type: 'string',
          inclusive: true,
          path: ['message'],
          message: 'Please complete your bio.',
        });
      } else if (data.message.length > 400) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_big,
          maximum: 400,
          type: 'string',
          inclusive: true,
          path: ['message'],
          message: 'Please keep your bio under 400 characters.',
        });
      }
    }
  });

export type ShareFormSchemaType = z.infer<typeof FormSchema>;

export interface ShareFormProps {
  onCancel: () => void;
  selectedForSharing: string[];
}

const ShareForm: React.FC<ShareFormProps> = ({
  onCancel,
  selectedForSharing,
}) => {
  const grid = useGridStore((state) => state.grid);

  const handleShareData = async (publicKey: string, sharedWith?: string) => {
    if (sharedWith) {
      const encryptedData = await Promise.all(
        selectedForSharing.map(async (id) => {
          const { encryptedMessage: value, nonce } =
            await encryptGridItemContent(
              grid[id].content.toString(),
              sharedWith,
            );
          return {
            uuid: id,
            value: Buffer.from(value).toString('hex'),
            nonce: Buffer.from(nonce).toString('hex'),
          };
        }),
      );

      await saveDataToServer(publicKey, 'shared', encryptedData, sharedWith);
    } else {
      const data = selectedForSharing.map((id) => ({
        uuid: id,
        value: grid[id].content.toString(),
        nonce: '',
      }));

      await saveDataToServer(publicKey, 'public', data);
    }
  };

  const form = useForm<ShareFormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sharingType: 'Specific user',
      recepient: '',
      message: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: ShareFormSchemaType) => {
    console.log(data);
    const publicKey = localStorage.getItem('publicKey');
    if (!publicKey) {
      throw new Error('Public key not found');
    }

    if (data.sharingType === 'Public (For everyone)') {
      handleShareData(publicKey).catch((error) => {
        console.error(error);
      });
    } else {
      handleShareData(publicKey, data.recepient).catch((error) => {
        console.error(error);
      });
    }
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
                Share your private data
              </div>
              <div className="self-stretch text-sm font-normal text-gray-500">
                Fill out the data sharing preferences form
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
              {form.getValues('sharingType') === 'Specific user' ? (
                <Button type="submit" size="md" variant="primary">
                  Share
                </Button>
              ) : (
                <Button type="submit" size="md" variant="destructive">
                  Make public
                </Button>
              )}
            </div>
          </div>
          <Divider />
        </div>
        <div className="flex flex-col gap-[20px] self-stretch">
          <FormField
            control={form.control}
            name="sharingType"
            render={({ field }) => (
              <FormItem className="flex gap-[32px] self-stretch">
                <div className="flex w-[280px] flex-col">
                  <FormLabel className="self-stretch text-sm font-medium text-gray-700">
                    Sharing type
                  </FormLabel>
                  <FormDescription className="self-stretch text-sm font-normal text-gray-500">
                    Select the type of data sharing
                  </FormDescription>
                </div>
                <div className="flex w-[512px] flex-col gap-[6px]">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a sharing type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Specific user">
                        Specific user
                      </SelectItem>
                      <SelectItem value="Public (For everyone)">
                        Public (For everyone)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-sm font-normal">
                    {form.getValues('sharingType') === 'Specific user'
                      ? 'If you select this option, the selected data will be unencrypted and available to specific user'
                      : 'If you select this option, the selected data below will be unencrypted and available to everyone'}
                  </FormMessage>
                </div>
              </FormItem>
            )}
          />
          <Divider />
          {form.getValues('sharingType') === 'Specific user' && (
            <>
              <FormField
                control={form.control}
                name="recepient"
                render={({ field }) => (
                  <FormItem className="flex gap-[32px] self-stretch">
                    <div className="flex w-[280px] flex-col">
                      <FormLabel className="self-stretch text-sm font-medium text-gray-700">
                        Recipient
                      </FormLabel>
                      <FormDescription className="self-stretch text-sm font-normal text-gray-500">
                        Specify the recipient&apos;s public key, by which we
                        will find it and encrypt your private data
                      </FormDescription>
                    </div>
                    <div className="flex w-[512px] flex-col gap-[6px]">
                      <FormControl>
                        <Input
                          className="self-stretch"
                          placeholder="AAAAC3NzaC1lZDI1NTE5AAAAILYAIoV2OKRSh/DcM3TicD/NK/4T"
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
                name="message"
                render={({ field }) => (
                  <FormItem className="flex gap-[32px] self-stretch">
                    <div className="flex w-[280px] flex-col">
                      <FormLabel className="self-stretch text-sm font-medium text-gray-700">
                        Message
                      </FormLabel>
                      <FormDescription className="self-stretch text-sm font-normal text-gray-500">
                        Brief message explaining why you are sharing this data
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
                        {400 - (form.getValues('message') ?? '').length}{' '}
                        characters left
                      </FormMessage>
                    </div>
                  </FormItem>
                )}
              />
              <Divider />
            </>
          )}
          <FormItem className="flex gap-[32px] self-stretch">
            <div className="flex w-[280px] flex-col">
              <FormLabel className="self-stretch text-sm font-medium text-gray-700">
                Private data
              </FormLabel>
              <FormDescription className="self-stretch text-sm font-normal text-gray-500">
                You can share only synchronized private data, select it below
              </FormDescription>
            </div>
            <div className="flex items-center justify-center gap-[20px]">
              {selectedForSharing.map((id, index) => (
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

export default ShareForm;
