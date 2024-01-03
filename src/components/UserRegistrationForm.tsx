import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import validator from 'validator';
import * as UntitledUI from 'untitledui-js';

import Button from './button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';
import Input from './input';

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

const formFields = [
  {
    name: 'fullName',
    label: 'Full name',
    placeholder: 'Full name',
    Icon: UntitledUI.Users.User01,
  },
  {
    name: 'citezenship',
    label: 'Citezenship',
    placeholder: 'Citezenship',
    Icon: UntitledUI.Maps.Flag01,
  },
  {
    name: 'phone',
    label: 'Phone',
    placeholder: '+1 123 474 87 67',
    Icon: UntitledUI.Communication.Phone,
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'olivia@untitledui.com',
    Icon: UntitledUI.Communication.Mail01,
  },
  {
    name: 'placeOfBirth',
    label: 'Place of birth',
    placeholder: 'Place of Birth',
    Icon: UntitledUI.General.Home02,
  },
  {
    name: 'currentLocation',
    label: 'Current location',
    placeholder: 'Current location',
    Icon: UntitledUI.Maps.MarkerPin01,
  },
  {
    name: 'nationalID',
    label: 'National Identification Number',
    placeholder: 'National Identification Number',
    Icon: UntitledUI.Alerts.AlertCircle,
  },
  {
    name: 'passportNumber',
    label: 'Passport Number',
    placeholder: 'Passport Number',
    Icon: UntitledUI.Education.BookOpen01,
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
  const form = useForm<z.infer<typeof FormSchema>>({
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
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    alert(JSON.stringify(data, null, 2));
  }

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
            name={fieldData.name as keyof z.infer<typeof FormSchema>}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-[6px]">
                {withLabels && <FormLabel>{fieldData.label}</FormLabel>}
                <FormControl>
                  <Input
                    placeholder={fieldData.placeholder}
                    Icon={fieldData.Icon}
                    {...field}
                  />
                </FormControl>
                {/* FIXME: Figma has a text-shadow if the input is focused
                but I don't see it */}
                {withErrors && (
                  <FormMessage className="text-error-500 text-sm font-normal" />
                )}
              </FormItem>
            )}
          />
        ))}
        <div className="flex flex-col items-start gap-[16px] self-stretch">
          <Button type="submit" size="lg" className="w-full">
            Secure my data
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserRegistrationForm;
