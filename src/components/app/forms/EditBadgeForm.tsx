import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { FileUploader } from '../FileUploader';
import { useState } from 'react';
import axios from 'axios';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../select';
import { QueryObserverResult } from '@tanstack/react-query';

const HOST = 'api.idntty.io';
// const HOST = 'localhost:8000';

const FormSchema = z.object({
  badgeName: z.string().min(1, {
    message: 'Please enter the badge name.',
  }),
  badgeDescription: z
    .string()
    .min(1, {
      message: 'Please enter the badge description.',
    })
    .max(400, {
      message: 'Please keep your badge description under 400 characters.',
    }),
  collection: z.enum(['Partner Badges']),
});

export type EditBadgeFormSchemaType = z.infer<typeof FormSchema>;

export interface EditBadgeFormProps {
  editedBadgeID: string;
  onCancel: () => void;
  onSubmit: () => void;
  refetch: () => Promise<QueryObserverResult<string[], Error>>;
}

const EditBadgeForm: React.FC<EditBadgeFormProps> = ({
  editedBadgeID,
  onCancel,
  onSubmit,
  refetch,
}) => {
  const badgeGrid = useBadgeStore((state) => state.grid);
  const addNewBadgeGridItem = useBadgeStore((state) => state.addNewGridItem);
  const updateBadgeGridItem = useBadgeStore((state) => state.updateGridItem);
  const removeBadgeGridItem = useBadgeStore((state) => state.removeGridItem);

  const publicKey = localStorage.getItem('publicKey');

  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (file: File) => setFile(file);
  const handleFileUpload = async () => {
    if (file && publicKey) {
      try {
        const jwt = sessionStorage.getItem('jwt');
        if (!jwt) {
          throw new Error('JWT not found');
        }
        const urlResponse = await axios.post<{
          url: string;
          newFileName: string;
        }>(
          `https://${HOST}/get-upload-url`,
          {
            publicKey,
            fileName: file.name,
            contentType: file.type,
          },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
            withCredentials: true,
          },
        );
        if (urlResponse.status === 200) {
          const { url, newFileName } = urlResponse.data;

          const uploadResponse = await axios.put(url, file, {
            headers: {
              'Content-Type': file.type,
            },
          });

          if (uploadResponse.status === 200) {
            console.log('File uploaded to S3');
          } else {
            console.error(
              'Failed to upload file to S3:',
              uploadResponse.statusText,
            );
          }

          return newFileName;
        } else {
          console.error('Failed to get presigned URL:', urlResponse.statusText);
        }
      } catch (error) {
        console.error('Error during file upload:', error);
      }
    } else {
      console.error('File or public key not found');
    }
    return null;
  };

  const form = useForm<EditBadgeFormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      badgeName: '',
      badgeDescription: '',
      collection: 'Partner Badges',
    },
    mode: 'onChange',
  });

  const onFormSubmit = (data: EditBadgeFormSchemaType) => {
    onSubmit();
    console.log(data);
    console.log(file);
    handleFileUpload()
      .then((newFileName) => {
        if (newFileName) {
          updateBadgeGridItem(editedBadgeID, {
            size: 'tiny',
            type: 'badge',
            content: `https://d1nyjrmwcoi38d.cloudfront.net/${newFileName}`,
          });
          if (badgeGrid[editedBadgeID].type === 'new') {
            addNewBadgeGridItem('tiny');
          }
          refetch()
            .then(() => {
              console.log('Refetched badge IDs');
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteClick = () => {
    if (badgeGrid[editedBadgeID].type !== 'new') {
      removeBadgeGridItem(editedBadgeID);
    }
    onCancel();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit(onFormSubmit)(e);
        }}
        className="flex flex-col gap-[24px] self-stretch bg-white"
      >
        <div className="flex flex-col gap-[20px] self-stretch pb-[1px]">
          <div className="flex gap-[16px] self-stretch">
            <div className="flex flex-shrink-0 flex-grow basis-0 flex-col gap-[4px]">
              <div className="self-stretch text-lg font-medium text-gray-900">
                Digital Badge
              </div>
              <div className="self-stretch text-sm font-normal text-gray-500">
                Add the details to your profile
              </div>
            </div>
            <div className="flex items-center gap-[12px]">
              <Button onClick={onCancel} size="md" variant="secondary-gray">
                Cancel
              </Button>
              <Button
                onClick={handleDeleteClick}
                size="md"
                variant="destructive"
              >
                Delete
              </Button>
              <Button type="submit" size="md" variant="primary">
                Update
              </Button>
            </div>
          </div>
          <Divider />
        </div>
        <div className="flex flex-col gap-[20px] self-stretch">
          <FormField
            control={form.control}
            name="badgeName"
            render={({ field }) => (
              <FormItem className="flex gap-[32px] self-stretch">
                <div className="flex w-[280px] flex-col">
                  <FormLabel className="self-stretch text-sm font-medium text-gray-700">
                    Badge name
                  </FormLabel>
                  <FormDescription className="self-stretch text-sm font-normal text-gray-500">
                    Select the type of data to be filled
                  </FormDescription>
                </div>
                <div className="flex w-[512px] flex-col gap-[6px]">
                  <FormControl>
                    <Input
                      className="self-stretch"
                      placeholder="SAP Certified Development Associate"
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
            name="badgeDescription"
            render={({ field }) => (
              <FormItem className="flex gap-[32px] self-stretch">
                <div className="flex w-[280px] flex-col">
                  <FormLabel className="self-stretch text-sm font-medium text-gray-700">
                    Badge description
                  </FormLabel>
                  <FormDescription className="self-stretch text-sm font-normal text-gray-500">
                    Your very private data
                  </FormDescription>
                </div>
                <div className="flex w-[512px] flex-col gap-[6px]">
                  <FormControl>
                    <TextArea
                      className="self-stretch"
                      maxLength={400}
                      placeholder='The "SAP Certified Development Associate - ABAP with SAP NetWeaver 7.50" certification exam verifies that the candidate possesses foundational knowledge in the area of ABAP Development.'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm font-normal">
                    {400 - (form.getValues('badgeDescription') ?? '').length}{' '}
                    characters left
                  </FormMessage>
                </div>
              </FormItem>
            )}
          />
          <Divider />
          <FormField
            control={form.control}
            name="collection"
            render={({ field }) => (
              <FormItem className="flex gap-[32px] self-stretch">
                <div className="flex w-[280px] flex-col">
                  <FormLabel className="self-stretch text-sm font-medium text-gray-700">
                    Collection
                  </FormLabel>
                  <FormDescription className="self-stretch text-sm font-normal text-gray-500">
                    Select the type of data to be filled
                  </FormDescription>
                </div>
                <div className="flex w-[512px] flex-col gap-[6px]">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a field type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Partner Badges">
                        Partner Badges
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-sm font-normal" />
                </div>
              </FormItem>
            )}
          />
          <Divider />
          <FormItem className="flex gap-[32px] self-stretch">
            <div className="flex w-[280px] flex-col">
              <FormLabel className="self-stretch text-sm font-medium text-gray-700">
                Skill tags
              </FormLabel>
              <FormDescription className="self-stretch text-sm font-normal text-gray-500">
                Random data for added protection
              </FormDescription>
            </div>
            <div className="flex w-[512px] flex-col">
              <div className="flex flex-wrap items-center justify-center gap-[20px]">
                {[
                  'ABAP Dictionary',
                  'ABAP Objects',
                  'ABAP Programming',
                  'Classical User Interfaces',
                  'Data Types And Data Objects',
                ].map((name, index) => (
                  <Badge key={index} size="md" variant="primary">
                    {name}
                  </Badge>
                ))}
              </div>
            </div>
          </FormItem>
          <FormItem className="flex gap-[32px] self-stretch">
            <div className="flex w-[280px] flex-col">
              <FormLabel className="self-stretch text-sm font-medium text-gray-700">
                Badge image
              </FormLabel>
              <FormDescription className="self-stretch text-sm font-normal text-gray-500">
                Share a few snippets of your work.
              </FormDescription>
            </div>
            <div className="flex w-[512px] flex-col">
              <FileUploader
                handleFileChange={handleFileChange}
                required={badgeGrid[editedBadgeID].type === 'new'}
              />
            </div>
          </FormItem>
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
                0,0176/idn
              </div>
              {/* <div className="text-sm text-error-500">
                Insufficient funds for{' '}
                <span className="font-bold">save & sync</span>
              </div> */}
            </div>
          </FormItem>
        </div>
      </form>
    </Form>
  );
};

export default EditBadgeForm;
