'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { User01, MarkerPin01, Mail01, Calendar, Link03 } from 'untitledui-js';
import { useRouter } from 'next/navigation';

import type { GridItemType } from '../../types/grid';
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
import { useGridStore } from '../../stores/gridStores';
import { FileUploader } from '../app/FileUploader';
import TextArea from '../textarea';

const fieldsToWidgets = {
  fullName: 'name',
  authorityName: 'name',
  dateOfBirth: 'age',
  currentLocation: 'location',
  location: 'location',
  bio: 'bio',
  email: 'email',
  websiteURL: 'other',
} as const;

const PersonalSchema = z.object({
  fullName: z.string().min(1, {
    message: 'Please enter your full name.',
  }),
  dateOfBirth: z
    .date({
      message: 'Please enter a valid date.',
    })
    .optional(),
  currentLocation: z.string().optional(),
  bio: z.string().optional(),
  file: z.instanceof(File).optional(),
  email: z
    .string()
    .email({
      message: 'Please enter a valid email address.',
    })
    .optional(),
});

const AuthoritySchema = z.object({
  authorityName: z.string().min(1, {
    message: 'Please enter the authority name.',
  }),
  websiteURL: z
    .string()
    .url({
      message: 'Please enter a valid URL.',
    })
    .optional()
    .or(z.literal('')),
  location: z.string().optional(),
  file: z.instanceof(File).optional(),
  bio: z.string().optional(),
});

export type UserRegistrationFormPersonalSchemaType = z.infer<
  typeof PersonalSchema
>;
export type UserRegistrationFormAuthoritySchemaType = z.infer<
  typeof AuthoritySchema
>;

const personalFields = [
  {
    name: 'fullName',
    label: 'Full name',
    placeholder: 'Full name',
    Icon: User01,
  },
  {
    name: 'dateOfBirth',
    label: 'Date of birth',
    placeholder: 'Date of birth',
    Icon: Calendar,
  },
  {
    name: 'currentLocation',
    label: 'Current location',
    placeholder: 'Current location',
    Icon: MarkerPin01,
  },
  {
    name: 'bio',
    label: 'Bio',
    placeholder:
      "I'm a Product Designer based in Melbourne, Australia. I specialise in UX/UI design, brand strategy, and Webflow development.",
    Icon: undefined,
  },
  {
    name: 'file',
    label: 'File',
    placeholder: 'File',
    Icon: undefined,
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'olivia@untitledui.com',
    Icon: Mail01,
  },
];

const authorityFields = [
  {
    name: 'authorityName',
    label: 'Authority name',
    placeholder: 'Authority name',
    Icon: User01,
  },
  {
    name: 'websiteURL',
    label: 'Website URL',
    placeholder: 'Website URL',
    Icon: Link03,
  },
  {
    name: 'location',
    label: 'Location',
    placeholder: 'Location',
    Icon: MarkerPin01,
  },
  {
    name: 'file',
    label: 'File',
    placeholder: 'File',
    Icon: undefined,
  },
  {
    name: 'bio',
    label: 'Bio',
    placeholder:
      "I'm a Product Designer based in Melbourne, Australia. I specialise in UX/UI design, brand strategy, and Webflow development.",
    Icon: undefined,
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

  const identity = useOnboardingStore((state) => state.identity);
  const updatePrivateData = useOnboardingStore(
    (state) => state.updatePrivateData,
  );
  const setPrivateData = useOnboardingStore((state) => state.setPrivateData);

  const addGridItem = useGridStore((state) => state.addGridItem);
  const updateGrid = useGridStore((state) => state.updateGrid);
  const updateUpperGridLayout = useGridStore(
    (state) => state.updateUpperGridLayout,
  );

  const personalForm = useForm<UserRegistrationFormPersonalSchemaType>({
    resolver: zodResolver(PersonalSchema),
    defaultValues: {
      fullName: '',
      dateOfBirth: undefined,
      currentLocation: '',
      bio: '',
      file: undefined,
      email: '',
    },
    mode: 'onBlur',
  });
  const authorityForm = useForm<UserRegistrationFormAuthoritySchemaType>({
    resolver: zodResolver(AuthoritySchema),
    defaultValues: {
      authorityName: '',
      websiteURL: '',
      location: '',
      file: undefined,
      bio: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = (
    data:
      | UserRegistrationFormPersonalSchemaType
      | UserRegistrationFormAuthoritySchemaType,
  ) => {
    setPrivateData(data);
    console.log(data);
    router.push('/account/signup');
  };

  const showOtherFields =
    identity === 'personal'
      ? personalForm.watch('fullName') &&
        !personalForm.getFieldState('fullName').invalid
      : authorityForm.watch('authorityName') &&
        !authorityForm.getFieldState('authorityName').invalid;

  return identity === 'personal' ? (
    <Form {...personalForm}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void personalForm.handleSubmit(onSubmit)(e);
        }}
        className="flex w-[360px] flex-col items-stretch gap-[12px]"
      >
        <FormField
          control={personalForm.control}
          name="fullName"
          render={({ field }) => {
            return (
              <FormItem className="flex flex-col gap-[6px]">
                {withLabels && <FormLabel>{personalFields[0].label}</FormLabel>}
                <FormControl>
                  <Input
                    withHelpIcon
                    placeholder={personalFields[0].placeholder}
                    Icon={personalFields[0].Icon}
                    {...field}
                    value={field.value?.toString()}
                    onChange={(e) => {
                      field.onChange(e);
                      // @ts-expect-error ???
                      updatePrivateData('fullName', e.target.value);
                      addGridItem({
                        size: 'tiny',
                        type: fieldsToWidgets.fullName,
                        content: e.target.value,
                      });
                    }}
                  />
                </FormControl>
                {/* FIXME: Figma has a text-shadow if the input is focused
                but I don't see it */}
                {withErrors && <FormMessage className="text-sm font-normal" />}
              </FormItem>
            );
          }}
        />
        {showOtherFields &&
          personalFields.slice(1).map((fieldData, index) => (
            <FormField
              key={index}
              control={personalForm.control}
              // FIXME: There is probably a way to do this without the type assertion
              name={
                fieldData.name as keyof UserRegistrationFormPersonalSchemaType
              }
              render={({ field }) => {
                if (field.name === 'file') {
                  return (
                    <FormItem className="flex flex-col gap-[6px] animate-in fade-in-50">
                      {withLabels && <FormLabel>{fieldData.label}</FormLabel>}
                      <FormControl>
                        <FileUploader
                          handleFileChange={(file) => {
                            field.onChange(file);
                            updatePrivateData('file', file);
                          }}
                          required={false}
                        />
                      </FormControl>
                      {withErrors && (
                        <FormMessage className="text-sm font-normal" />
                      )}
                    </FormItem>
                  );
                }
                return (
                  <FormItem className="flex flex-col gap-[6px] animate-in fade-in-50">
                    {withLabels && <FormLabel>{fieldData.label}</FormLabel>}
                    <FormControl>
                      {field.name === 'bio' ? (
                        <TextArea
                          placeholder={fieldData.placeholder}
                          {...field}
                          value={field.value?.toString()}
                          onChange={(e) => {
                            field.onChange(e);
                            updatePrivateData('bio', e.target.value);
                            addGridItem({
                              size: 'long',
                              type: fieldsToWidgets.bio,
                              content: e.target.value,
                            });
                          }}
                        />
                      ) : (
                        <Input
                          withHelpIcon
                          placeholder={fieldData.placeholder}
                          Icon={fieldData.Icon}
                          {...field}
                          value={field.value?.toString()}
                          onChange={(e) => {
                            field.onChange(e);
                            // @ts-expect-error ???
                            updatePrivateData(field.name, e.target.value);
                            addGridItem({
                              size: 'long',
                              // @ts-expect-error ???
                              type: fieldsToWidgets[field.name] as GridItemType,
                              content: e.target.value,
                            });
                          }}
                        />
                      )}
                    </FormControl>
                    {/* FIXME: Figma has a text-shadow if the input is focused
                but I don't see it */}
                    {withErrors && (
                      <FormMessage className="text-sm font-normal" />
                    )}
                  </FormItem>
                );
              }}
            />
          ))}
        <div className="flex flex-col items-start gap-[16px] self-stretch">
          {/* FIXME: Fix hardcoded width*/}
          <Button
            type="submit"
            size="lg"
            className="w-[360px]"
            disabled={
              !personalForm.formState.isDirty || !personalForm.formState.isValid
            }
          >
            Secure my data
          </Button>
        </div>
      </form>
    </Form>
  ) : (
    <Form {...authorityForm}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void authorityForm.handleSubmit(onSubmit)(e);
        }}
        className="flex w-[360px] flex-col items-stretch gap-[12px]"
      >
        <FormField
          control={authorityForm.control}
          // FIXME: There is probably a way to do this without the type assertion
          name="authorityName"
          render={({ field }) => {
            return (
              <FormItem className="flex flex-col gap-[6px] animate-in fade-in-50">
                {withLabels && (
                  <FormLabel>{authorityFields[0].label}</FormLabel>
                )}
                <FormControl>
                  <Input
                    withHelpIcon
                    placeholder={authorityFields[0].placeholder}
                    Icon={authorityFields[0].Icon}
                    {...field}
                    value={field.value?.toString()}
                    onChange={(e) => {
                      field.onChange(e);
                      // @ts-expect-error ???
                      updatePrivateData('authorityName', e.target.value);
                      addGridItem({
                        size: 'tiny',
                        type: fieldsToWidgets.authorityName,
                        content: e.target.value,
                      });
                    }}
                  />
                </FormControl>
                {/* FIXME: Figma has a text-shadow if the input is focused
                but I don't see it */}
                {withErrors && <FormMessage className="text-sm font-normal" />}
              </FormItem>
            );
          }}
        />
        {showOtherFields &&
          authorityFields.slice(1).map((fieldData, index) => (
            <FormField
              key={index}
              control={authorityForm.control}
              // FIXME: There is probably a way to do this without the type assertion
              name={
                fieldData.name as keyof UserRegistrationFormAuthoritySchemaType
              }
              render={({ field }) => {
                if (field.name === 'file') {
                  return (
                    <FormItem className="flex flex-col gap-[6px] animate-in fade-in-100">
                      {withLabels && <FormLabel>{fieldData.label}</FormLabel>}
                      <FormControl>
                        <FileUploader
                          handleFileChange={(file) => {
                            field.onChange(file);
                            updatePrivateData('file', file);
                          }}
                          required={false}
                        />
                      </FormControl>
                      {withErrors && (
                        <FormMessage className="text-sm font-normal" />
                      )}
                    </FormItem>
                  );
                }
                return (
                  <FormItem className="flex flex-col gap-[6px] animate-in fade-in-50">
                    {withLabels && <FormLabel>{fieldData.label}</FormLabel>}
                    <FormControl>
                      {field.name === 'bio' ? (
                        <TextArea
                          placeholder={fieldData.placeholder}
                          {...field}
                          value={field.value?.toString()}
                          onChange={(e) => {
                            field.onChange(e);
                            updatePrivateData('bio', e.target.value);
                            addGridItem({
                              size: 'long',
                              type: fieldsToWidgets.bio,
                              content: e.target.value,
                            });
                          }}
                        />
                      ) : (
                        <Input
                          withHelpIcon
                          placeholder={fieldData.placeholder}
                          Icon={fieldData.Icon}
                          {...field}
                          value={field.value?.toString()}
                          onChange={(e) => {
                            field.onChange(e);
                            // @ts-expect-error ???
                            updatePrivateData(field.name, e.target.value);
                            addGridItem({
                              size: 'long',
                              // @ts-expect-error ???
                              type: fieldsToWidgets[field.name] as GridItemType,
                              content: e.target.value,
                            });
                          }}
                        />
                      )}
                    </FormControl>
                    {/* FIXME: Figma has a text-shadow if the input is focused
                but I don't see it */}
                    {withErrors && (
                      <FormMessage className="text-sm font-normal" />
                    )}
                  </FormItem>
                );
              }}
            />
          ))}
        <div className="flex flex-col items-start gap-[16px] self-stretch">
          {/* FIXME: Fix hardcoded width*/}
          <Button
            type="submit"
            size="lg"
            className="w-[360px]"
            disabled={
              !authorityForm.formState.isDirty ||
              !authorityForm.formState.isValid
            }
          >
            Secure my data
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserRegistrationForm;
