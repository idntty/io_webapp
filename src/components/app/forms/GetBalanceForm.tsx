import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { cryptography } from '@liskhq/lisk-client/browser';

import axios from 'axios';

import Button from '../../button/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  // FormDescription,
} from '../../form';
import Input from '../../input';
import Divider from '../../divider';
import { Mail01 } from 'untitledui-js';

const FormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  address: z.string(),
  balance: z.number(),
});

export type GetBalanceFormSchemaType = z.infer<typeof FormSchema>;

export interface GetBalanceFormProps {
  publicKey: string;
}

interface GetBalanceResponse {
  availableBalance: string;
}
const handleGetBalance = async (address: string) => {
  const response = await axios.get<GetBalanceResponse>(
    'https://api.idntty.io/account/balance',
    {
      params: { address },
      withCredentials: true,
    },
  );
  return response.data.availableBalance;
};

const GetBalanceForm: React.FC<GetBalanceFormProps> = ({ publicKey }) => {
  const address = cryptography.address.getLisk32AddressFromPublicKey(
    Buffer.from(publicKey, 'hex'),
  );

  const form = useForm<GetBalanceFormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      address,
      balance: 0,
    },
    mode: 'onChange',
  });

  const onSubmit = (data: GetBalanceFormSchemaType) => {
    console.log(data);
    handleGetBalance(data.address)
      .then((balance) => {
        form.setValue('balance', parseInt(balance));
      })
      .catch((error) => {
        console.error(error);
      });
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
                Personal info
              </div>
              <div className="self-stretch text-sm font-normal text-gray-500">
                Update your photo and personal details here
              </div>
            </div>
            <div className="flex items-center gap-[12px]"></div>
          </div>
          <Divider />
        </div>
        <div className="flex flex-col gap-[20px] self-stretch">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex gap-[32px] self-stretch">
                <div className="flex w-[280px] flex-col">
                  <FormLabel className="self-stretch text-sm font-medium text-gray-700">
                    Email Address
                  </FormLabel>
                </div>
                <div className="flex w-[512px] flex-col gap-[6px]">
                  <Input
                    className="self-stretch"
                    placeholder="olivia@untitledui.com"
                    type="email"
                    Icon={Mail01}
                    {...field}
                  />
                  <FormMessage className="text-sm font-normal" />
                </div>
              </FormItem>
            )}
          />
          <Divider />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="flex gap-[32px] self-stretch">
                <div className="flex w-[280px] flex-col">
                  <FormLabel className="self-stretch text-sm font-medium text-gray-700">
                    IDNTTY Address
                  </FormLabel>
                </div>
                <div className="flex w-[512px] flex-col gap-[6px]">
                  <FormControl>
                    <Input
                      className="self-stretch"
                      placeholder={address}
                      {...field}
                      disabled
                      value={address}
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
            name="balance"
            render={({ field }) => (
              <FormItem className="flex gap-[32px] self-stretch">
                <div className="flex w-[280px] flex-col">
                  <FormLabel className="self-stretch text-sm font-medium text-gray-700">
                    Balance
                  </FormLabel>
                </div>
                <div className="flex w-[512px] flex-col gap-[6px]">
                  <FormControl>
                    <Input
                      className="self-stretch"
                      placeholder="0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm font-normal" />
                </div>
              </FormItem>
            )}
          />
          <Divider />
          <div className="flex items-center justify-end gap-[12px] self-stretch">
            <Button size="md" variant="primary">
              Get
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default GetBalanceForm;
