import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { cryptography } from '@klayr/client/browser';

import axios from 'axios';
import { useState } from 'react';

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
import Spinner from '../../spinner';
import { Mail01 } from 'untitledui-js';

const FormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  address: z.string(),
  secret: z
    .string()
    .length(8, { message: 'Verification code must be 8 characters long' }),
});

export type FaucetFormSchemaType = z.infer<typeof FormSchema>;

export interface FaucetFormProps {
  publicKey: string;
}

const FaucetForm: React.FC<FaucetFormProps> = ({ publicKey }) => {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isProcessingFaucetRequest, setIsProcessingFaucetRequest] =
    useState(false);

  const form = useForm<FaucetFormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      address: cryptography.address.getKlayr32AddressFromPublicKey(
        Buffer.from(publicKey, 'hex'),
      ),
      secret: '',
    },
    mode: 'onChange',
  });

  const sendCode = async () => {
    setIsCodeSent(true);
    const response = await axios.get(
      `https://ihno2sl2y3.execute-api.us-east-1.amazonaws.com/test/faucet`,
      {
        params: {
          publicKey: form.getValues('address'),
          email: form.getValues('email'),
        },
        withCredentials: true,
      },
    );
    console.log(response);
    if (response.status !== 200) {
      console.error('Failed to send code');
    }
  };

  const getTokens = async () => {
    setIsProcessingFaucetRequest(true);
    const response = await axios.post(
      'https://ihno2sl2y3.execute-api.us-east-1.amazonaws.com/test/faucet',
      {
        publicKey: form.getValues('address'),
        email: form.getValues('email'),
        secret: form.getValues('secret'),
      },
      // { withCredentials: true },
    );
    console.log(response);
    if (response.status === 200) {
      console.log('Got tokens');
    } else {
      console.error('Failed to get tokens');
    }
    setIsProcessingFaucetRequest(false);
  };

  const onSubmit = (data: FaucetFormSchemaType) => {
    console.log(data);
    getTokens().catch(console.error);
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
                Faucet
              </div>
              <div className="self-stretch text-sm font-normal text-gray-500">
                Get your testnet tokens here
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
                  <FormControl>
                    <Input
                      className="self-stretch"
                      placeholder="olivia@untitledui.com"
                      type="email"
                      Icon={Mail01}
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
                    <Input className="self-stretch" {...field} />
                  </FormControl>
                  <FormMessage className="text-sm font-normal" />
                </div>
              </FormItem>
            )}
          />
          <Divider />
          {isCodeSent && (
            <FormField
              control={form.control}
              name="secret"
              render={({ field }) => (
                <FormItem className="flex gap-[32px] self-stretch">
                  <div className="flex w-[280px] flex-col">
                    <FormLabel className="self-stretch text-sm font-medium text-gray-700">
                      Verification code
                    </FormLabel>
                  </div>
                  <div className="flex w-[196px] flex-col gap-[6px]">
                    <FormControl>
                      <Input className="self-stretch" {...field} />
                    </FormControl>
                    <FormMessage className="text-sm font-normal" />
                  </div>
                </FormItem>
              )}
            />
          )}
          <Divider />
          <div className="flex items-center justify-end gap-[12px] self-stretch">
            {!isCodeSent ? (
              <Button
                size="sm"
                variant="primary"
                onClick={() => {
                  sendCode().catch(console.error);
                }}
              >
                Code
              </Button>
            ) : (
              <Button
                size="md"
                variant="primary"
                type="submit"
                disabled={isProcessingFaucetRequest}
              >
                Get tokens
                {isProcessingFaucetRequest && <Spinner size="small" />}
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default FaucetForm;
