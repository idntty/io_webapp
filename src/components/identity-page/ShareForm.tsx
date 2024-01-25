import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Users } from 'untitledui-js';

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

const FormSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  bio: z
    .string()
    .min(1, {
      message: 'Please complete your bio.',
    })
    .max(400, {
      message: 'Please keep your bio under 400 characters.',
    }),
});

export type ShareFormSchemaType = z.infer<typeof FormSchema>;

const ShareForm: React.FC = () => {
  const form = useForm<ShareFormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      bio: '',
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
                Personal info
              </div>
              <div className="self-stretch text-sm font-normal text-gray-500">
                Update your photo and personal details here.
              </div>
            </div>
            <div className="flex items-center gap-[12px]">
              <Button size="md" variant="secondary-gray">
                Cancel
              </Button>
              <Button type="submit" size="md" variant="primary">
                Share
              </Button>
            </div>
          </div>
          {/* TODO: Extract as Divider component */}
          <div className="h-[1px] self-stretch bg-gray-200" />
        </div>
        <div className="flex flex-col gap-[20px] self-stretch">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex gap-[32px] self-stretch">
                <FormLabel className="w-[280px] text-sm font-medium text-gray-700">
                  Email address
                </FormLabel>
                <div className="flex w-[512px] flex-col gap-[6px]">
                  <FormControl>
                    <Input
                      className="self-stretch"
                      placeholder="olivia@untitledui.com"
                      Icon={Users.User01}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm font-normal" />
                </div>
              </FormItem>
            )}
          />
          {/* TODO: Extract as Divider component */}
          <div className="h-[1px] self-stretch bg-gray-200" />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="flex gap-[32px] self-stretch">
                <div className="flex w-[280px] flex-col">
                  <FormLabel className="self-stretch text-sm font-medium text-gray-700">
                    Email address
                  </FormLabel>
                  <FormDescription className="self-stretch text-sm font-normal text-gray-500">
                    Write a short introduction.
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
                    {400 - form.getValues('bio').length} characters left
                  </FormMessage>
                </div>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default ShareForm;

// const UserRegistrationForm: React.FC<UserRegistrationFormProps> = ({
//   withLabels,
//   withErrors,
// }) => {
//   const navigate = useNavigate();

//   const form = useForm<UserRegistrationFormSchemaType>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       fullName: '',
//       citezenship: '',
//       phone: '',
//       email: '',
//       placeOfBirth: '',
//       currentLocation: '',
//       nationalID: '',
//       passportNumber: '',
//     },
//     mode: 'onBlur',
//   });

//   const setPrivateData = useOnboardingStore((state) => state.setPrivateData);

//   const onSubmit = (data: UserRegistrationFormSchemaType) => {
//     setPrivateData(data);
//     navigate('/create-account');
//   };

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           void form.handleSubmit(onSubmit)(e);
//         }}
//         className="flex w-[360px] flex-col items-stretch gap-[12px]"
//       >
//         {formFields.map((fieldData, index) => (
//           <FormField
//             key={index}
//             control={form.control}
//             // FIXME: There is probably a way to do this without the type assertion
//             name={fieldData.name as keyof UserRegistrationFormSchemaType}
//             render={({ field }) => (
//               <FormItem className="flex flex-col gap-[6px]">
//                 {withLabels && <FormLabel>{fieldData.label}</FormLabel>}
//                 <FormControl>
//                   <Input
//                     placeholder={fieldData.placeholder}
//                     Icon={fieldData.Icon}
//                     {...field}
//                   />
//                 </FormControl>
//                 {/* FIXME: Figma has a text-shadow if the input is focused
//                 but I don't see it */}
//                 {withErrors && (
//                   <FormMessage className="text-sm font-normal text-error-500" />
//                 )}
//               </FormItem>
//             )}
//           />
//         ))}
//         <div className="flex flex-col items-start gap-[16px] self-stretch">
//           {/* FIXME: Fix hardcoded width*/}
//           <Button
//             type="submit"
//             size="lg"
//             className="w-[360px]"
//             disabled={!form.formState.isDirty || !form.formState.isValid}
//           >
//             Secure my data
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// };

// export default UserRegistrationForm;
