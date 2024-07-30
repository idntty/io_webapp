'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import validator from 'validator';
import {
  User01,
  Flag01,
  MarkerPin01,
  Phone,
  Mail01,
  Home02,
  AlertCircle,
  BookOpen01,
} from 'untitledui-js';
import { useRouter } from 'next/navigation';

import Button from '../button/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../form';
import Input from '../input';

import { useOnboardingStore } from '../../stores/onboardingStore';

const FormSchema = z.object({
  fullName: z.string().min(1, {
    message: 'Please enter your full name.',
  }),
  citezenship: z.string().min(1, {
    message: 'Please enter your country of citizenship.',
  }),
  phone: z.string().refine((value) => validator.isMobilePhone(value), {
    message: 'Please enter a valid phone number.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  placeOfBirth: z.string().min(1, {
    message: 'Please enter your place of birth.',
  }),
  currentLocation: z.string().min(1, {
    message: 'Please enter your current location.',
  }),
  nationalID: z.string().min(1, {
    message: 'Please enter your national identification number.',
  }),
  passportNumber: z.string().min(1, {
    message: 'Please enter your passport number.',
  }),
});

export type UserRegistrationFormSchemaType = z.infer<typeof FormSchema>;

const formFields = [
  {
    name: 'fullName',
    label: 'Full name',
    placeholder: 'Full name',
    Icon: User01,
  },
  {
    name: 'citezenship',
    label: 'Citezenship',
    placeholder: 'Citezenship',
    Icon: Flag01,
  },
  {
    name: 'phone',
    label: 'Phone',
    placeholder: '+1 123 474 87 67',
    Icon: Phone,
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'olivia@untitledui.com',
    Icon: Mail01,
  },
  {
    name: 'placeOfBirth',
    label: 'Place of birth',
    placeholder: 'Place of Birth',
    Icon: Home02,
  },
  {
    name: 'currentLocation',
    label: 'Current location',
    placeholder: 'Current location',
    Icon: MarkerPin01,
  },
  {
    name: 'nationalID',
    label: 'National Identification Number',
    placeholder: 'National Identification Number',
    Icon: AlertCircle,
  },
  {
    name: 'passportNumber',
    label: 'Passport Number',
    placeholder: 'Passport Number',
    Icon: BookOpen01,
  },
];

export interface UserRegistrationFormProps {
  withLabels?: boolean;
  withErrors?: boolean;
}

const UserRegistrationForm: React.FC<UserRegistrationFormProps> = ({
  withLabels,
  withErrors,
}) => {
  const router = useRouter();

  const form = useForm<UserRegistrationFormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: '',
      citezenship: '',
      phone: '',
      email: '',
      placeOfBirth: '',
      currentLocation: '',
      nationalID: '',
      passportNumber: '',
    },
    mode: 'onBlur',
  });

  const setPrivateData = useOnboardingStore((state) => state.setPrivateData);

  const onSubmit = (data: UserRegistrationFormSchemaType) => {
    setPrivateData(data);
    router.push('/account/signup');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit(onSubmit)(e);
        }}
        className="flex w-[360px] flex-col items-stretch gap-[12px]"
      >
        {formFields.map((fieldData, index) => (
          <FormField
            key={index}
            control={form.control}
            // FIXME: There is probably a way to do this without the type assertion
            name={fieldData.name as keyof UserRegistrationFormSchemaType}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-[6px]">
                {withLabels && <FormLabel>{fieldData.label}</FormLabel>}
                <FormControl>
                  <Input
                    withHelpIcon
                    placeholder={fieldData.placeholder}
                    Icon={fieldData.Icon}
                    {...field}
                  />
                </FormControl>
                {/* FIXME: Figma has a text-shadow if the input is focused
                but I don't see it */}
                {withErrors && <FormMessage className="text-sm font-normal" />}
              </FormItem>
            )}
          />
        ))}
        <div className="flex flex-col items-start gap-[16px] self-stretch">
          {/* FIXME: Fix hardcoded width*/}
          <Button
            type="submit"
            size="lg"
            className="w-[360px]"
            disabled={!form.formState.isDirty || !form.formState.isValid}
          >
            Secure my data
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserRegistrationForm;
