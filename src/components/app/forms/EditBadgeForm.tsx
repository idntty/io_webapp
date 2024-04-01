import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { FileUploader } from 'react-drag-drop-files';
import { useState } from 'react';
import axios from 'axios';
import { General } from 'untitledui-js';

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

const HOST = 'api.idntty.io';
// const HOST = 'localhost';
const PORT = 443;

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
}

const EditBadgeForm: React.FC<EditBadgeFormProps> = ({
  editedBadgeID,
  onCancel,
  onSubmit,
}) => {
  const badgeGrid = useBadgeStore((state) => state.grid);
  const addNewBadgeGridItem = useBadgeStore((state) => state.addNewGridItem);
  const updateBadgeGridItem = useBadgeStore((state) => state.updateGridItem);
  const removeBadgeGridItem = useBadgeStore((state) => state.removeGridItem);

  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (file: File) => setFile(file);
  const handleFileUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await axios.post(
          `https://${HOST}:${PORT}/upload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        if (response.status === 200) {
          console.log(response.data);
        } else {
          console.error(response.statusText);
        }
      } catch (error) {
        console.error(error);
      }
      return file.name;
    }
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
      .then(() => {
        console.log('File uploaded');
      })
      .catch((error) => {
        console.error(error);
      });
    updateBadgeGridItem(editedBadgeID, {
      size: 'tiny',
      type: 'other',
      content: data.badgeName,
    });
    if (badgeGrid[editedBadgeID].type === 'new') {
      addNewBadgeGridItem('tiny');
    }
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
                handleChange={handleFileChange}
                name="file"
                types={['SVG', 'PNG', 'JPG', 'JPEG', 'GIF']}
                required={badgeGrid[editedBadgeID].type === 'new'}
                hoverTitle=" "
              >
                <div className="flex flex-col items-center gap-[4px] self-stretch rounded-lg border border-solid border-gray-200 bg-white py-[16px]">
                  <div className="flex flex-col items-center gap-[12px] self-stretch">
                    <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[28px] border-[6px] border-solid border-gray-50 bg-gray-100 p-[10px]">
                      <General.UploadCloud01
                        size="20"
                        className="shrink-0 stroke-gray-600"
                      />
                    </div>
                    <div className="flex flex-col items-center gap-[4px] self-stretch">
                      <div className="flex items-start justify-center gap-[4px] self-stretch">
                        <span className="text-sm font-semibold text-brand-700">
                          Click to upload
                        </span>
                        <span className="text-sm text-gray-500">
                          or drag and drop
                        </span>
                      </div>
                      <span className="text-center text-sm text-gray-500">
                        SVG, PNG, JPG or GIF (max. 800x400px)
                      </span>
                    </div>
                  </div>
                </div>
              </FileUploader>
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
