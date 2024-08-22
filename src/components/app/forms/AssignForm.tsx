import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useBadgeStore } from '../../../stores/gridStores';

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

const FormSchema = z.object({
  recipient: z.string().min(1, {
    message: "Please enter the recipient's public key.",
  }),
  message: z
    .string()
    .min(1, { message: 'Please complete your bio.' })
    .max(400, {
      message: 'Please keep your bio under 400 characters.',
    }),
});

export type AssignFormSchemaType = z.infer<typeof FormSchema>;

export interface AssignFormProps {
  onCancel: () => void;
  selectedForAssignment: string[];
}

const AssignForm: React.FC<AssignFormProps> = ({
  onCancel,
  selectedForAssignment,
}) => {
  const transactionCost = 145000;

  const badgeGrid = useBadgeStore((state) => state.grid);

  const form = useForm<AssignFormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      recipient: '',
      message: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: AssignFormSchemaType) => {
    console.log(data);
    const publicKey = localStorage.getItem('publicKey');
    const privateKey = sessionStorage.getItem('privateKey');
    if (!publicKey) {
      throw new Error('Public key not found');
    }
    if (!privateKey) {
      throw new Error('Private key not found');
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
                Assignment
              </div>
              <div className="self-stretch text-sm font-normal text-gray-500">
                Fill out the data assignment preferences form
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
                Assign
              </Button>
            </div>
          </div>
          <Divider />
        </div>
        <div className="flex flex-col gap-[20px] self-stretch">
          <FormField
            control={form.control}
            name="recipient"
            render={({ field }) => (
              <FormItem className="flex gap-[32px] self-stretch">
                <div className="flex w-[280px] flex-col">
                  <FormLabel className="self-stretch text-sm font-medium text-gray-700">
                    Recipient
                  </FormLabel>
                  <FormDescription className="self-stretch text-sm font-normal text-gray-500">
                    Specify the recipient&apos;s public key
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
                    Brief message explaining why you are assigning the badges
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
                    {400 - (form.getValues('message') ?? '').length} characters
                    left
                  </FormMessage>
                </div>
              </FormItem>
            )}
          />
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
                {`${transactionCost} IDN`}
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
                Digital badges
              </FormLabel>
              <FormDescription className="self-stretch text-sm font-normal text-gray-500">
                You can share only synchronized private data, select it below
              </FormDescription>
            </div>
            <div className="flex items-center justify-center gap-[20px]">
              {selectedForAssignment.map((id, index) => (
                <Badge key={index} size="md" variant="secondary">
                  {badgeGrid[id].type}
                </Badge>
              ))}
            </div>
          </FormItem>
        </div>
      </form>
    </Form>
  );
};

export default AssignForm;
