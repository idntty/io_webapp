import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

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

const FormSchema = z.object({
  sharingType: z.enum(['Specific user', 'Public (For everyone)'], {
    // FIXME: Error messages are not showing up
    invalid_type_error: 'Select a sharing type.',
    required_error: 'Please select a sharing type.',
  }),
  recepient: z
    .string()
    .min(1, {
      message: "Please enter the recepient's public key.",
    })
    .optional(),
  message: z
    .string()
    .min(1, {
      message: 'Please complete your bio.',
    })
    .max(400, {
      message: 'Please keep your bio under 400 characters.',
    })
    .optional(),
});

export type ShareFormSchemaType = z.infer<typeof FormSchema>;

export interface ShareFormProps {
  onCancel: () => void;
}

const ShareForm: React.FC<ShareFormProps> = ({ onCancel }) => {
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
                onClick={onCancel}
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
              {['Full name', 'Date of birth', 'Bio'].map((name, index) => (
                <Badge key={index} size="md" variant="secondary">
                  {name}
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
