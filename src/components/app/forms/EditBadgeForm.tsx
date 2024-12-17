import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { FileUploader } from '../FileUploader';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { SearchMD } from 'untitledui-js';
import { useDebounce } from '@uidotdev/usehooks';
import { cryptography } from '@klayr/client/browser';

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
import { QueryObserverResult } from '@tanstack/react-query';
import { createBadge, getCreateBadgeCost } from '../../../lib/apiClient';
import { uuidv4 } from '../../../lib/utils';

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
  collection: z.string({
    required_error:
      'Please select an existing collection or type to create a new one.',
  }),
  tags: z.string().optional(),
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
  const [transactionCost, setTransactionCost] = useState<bigint>(0n);
  const debouncedTransactionCost = useDebounce(transactionCost, 1000);

  const [collections, setCollections] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchCollections = async () => {
      const publicKey = localStorage.getItem('publicKey');
      if (!publicKey) {
        throw new Error('Public key not found');
      }
      try {
        const response = await axios.get<string[]>(
          `https://${HOST}/get-collections`,
          {
            params: {
              address: cryptography.address.getKlayr32AddressFromPublicKey(
                Buffer.from(publicKey, 'hex'),
              ),
            },
            withCredentials: true,
          },
        );
        if (response.status === 200) {
          setCollections(response.data);
        } else {
          console.error('Failed to fetch collections:', response.statusText);
        }
      } catch (error) {
        console.error('Error during fetching collections:', error);
      }
    };

    fetchCollections().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchTags = async () => {
      const publicKey = localStorage.getItem('publicKey');
      if (!publicKey) {
        throw new Error('Public key not found');
      }
      try {
        const response = await axios.get<string[]>(`https://${HOST}/get-tags`, {
          params: { publicKey },
          withCredentials: true,
        });
        if (response.status === 200) {
          setTags(response.data);
        }
      } catch (error) {
        console.error('Error during fetching tags:', error);
      }
    };

    fetchTags().catch(console.error);
  }, []);

  const searchableCollectionTypes = collections.map((key, index) => ({
    id: index,
    name: key,
  }));
  type SearchableCollectionType = (typeof searchableCollectionTypes)[number];

  const searchableTagTypes = tags.map((key, index) => ({
    id: index,
    name: key,
  }));
  type SearchableTagType = (typeof searchableTagTypes)[number];

  const badgeGrid = useBadgeStore((state) => state.grid);
  const updateBadgeGridItem = useBadgeStore((state) => state.updateGridItem);
  const removeBadgeGridItem = useBadgeStore((state) => state.removeGridItem);

  const publicKey = localStorage.getItem('publicKey');

  const updateTransactionCost = async (uuid: string) => {
    const publicKey = localStorage.getItem('publicKey');
    if (!publicKey) {
      throw new Error('Public key not found');
    }
    const privateKey = sessionStorage.getItem('privateKey');
    if (!privateKey) {
      throw new Error('Private key not found');
    }

    setTransactionCost(await getCreateBadgeCost(uuid, privateKey, publicKey));
  };

  useEffect(() => {
    updateTransactionCost(editedBadgeID).catch(console.error);
  }, [editedBadgeID]);

  const [file, setFile] = useState<File | undefined>(undefined);
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
      tags: '',
    },
    mode: 'onChange',
  });

  const addCollection = async (publicKey: string, collection: string) => {
    const jwt = sessionStorage.getItem('jwt');
    if (!jwt) {
      throw new Error('JWT not found');
    }

    try {
      const response = await axios.post(
        `https://${HOST}/add-collection`,
        {
          publicKey,
          collection,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      if (response.status === 200) {
        console.log('Collection added:', collection);
        setCollections((prevCollections) => [...prevCollections, collection]);
      } else {
        console.error('Failed to add collection:', response.statusText);
      }
    } catch (error) {
      console.error('Error during adding collection:', error);
    }
  };

  const addTags = async (publicKey: string, newTags: string[]) => {
    const jwt = sessionStorage.getItem('jwt');
    if (!jwt) {
      throw new Error('JWT not found');
    }

    try {
      const response = await axios.post(
        `https://${HOST}/add-tags`,
        {
          publicKey,
          tags: newTags,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      if (response.status === 200) {
        console.log('Tags added:', newTags);
        setTags((prevTags) => [...prevTags, ...newTags]);
      }
    } catch (error) {
      console.error('Error during adding tags:', error);
    }
  };

  const onFormSubmit = (data: EditBadgeFormSchemaType) => {
    const publicKey = localStorage.getItem('publicKey');
    if (!publicKey) {
      throw new Error('Public key not found');
    }
    const privateKey = sessionStorage.getItem('privateKey');
    if (!privateKey) {
      throw new Error('Private key not found');
    }

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
          createBadge(newFileName, privateKey, publicKey)
            .then((transactionId) => {
              console.log('Send tx to node, id:', transactionId);
              refetch()
                .then(() => {
                  console.log('Refetched badge IDs');
                  // if (badgeGrid[editedBadgeID].type === 'new') {
                  //   addNewBadgeGridItem('tiny');
                  // }
                })
                .catch((error) => {
                  console.error(error);
                });
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });

    if (!collections.includes(data.collection)) {
      addCollection(publicKey, data.collection).catch(console.error);
    }

    if (data.tags) {
      const newTags = data.tags
        .split(' ')
        .map((tag) => tag.trim())
        .filter((tag) => !tags.includes(tag));
      if (newTags.length > 0) {
        addTags(publicKey, newTags).catch(console.error);
      }
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
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
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
                <div className="relative flex w-[512px] flex-col gap-[6px] overflow-visible">
                  <SearchMD
                    size="20"
                    className="absolute left-[15px] top-[13px] z-[100] stroke-gray-500"
                  />
                  <FormControl>
                    <ReactSearchAutocomplete<SearchableCollectionType>
                      items={searchableCollectionTypes}
                      onSearch={(string: string) => {
                        field.onChange(string);
                      }}
                      onSelect={(item: SearchableCollectionType) => {
                        field.onChange(item.name);
                      }}
                      formatResult={(item: SearchableCollectionType) => {
                        return (
                          <div className="relative flex w-full cursor-pointer select-none items-center justify-between gap-[8px] px-[14px] py-[10px] text-base outline-none data-[disabled]:pointer-events-none">
                            {item.name}
                          </div>
                        );
                      }}
                      placeholder="Search for a field type"
                      styling={{
                        height: '44px',
                        border: '1px solid #D0D5DD',
                        borderRadius: '8px',
                        backgroundColor: 'white',
                        boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
                        hoverBackgroundColor: 'white',
                        color: '#101828',
                        fontSize: '16px',
                        fontFamily: 'Inter',
                        iconColor: 'white',
                        lineColor: '#101828',
                        placeholderColor: '#667085',
                        searchIconMargin: '0 0 0 9px',
                      }}
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
            name="tags"
            render={({ field }) => (
              <FormItem className="flex gap-[32px] self-stretch">
                <div className="flex w-[280px] flex-col">
                  <FormLabel className="self-stretch text-sm font-medium text-gray-700">
                    Skill tags
                  </FormLabel>
                  <FormDescription className="self-stretch text-sm font-normal text-gray-500">
                    Add skills related to this badge
                  </FormDescription>
                </div>
                <div className="flex w-[512px] flex-col gap-[12px]">
                  <div className="relative flex flex-col gap-[6px] overflow-visible">
                    <SearchMD
                      size="20"
                      className="absolute left-[15px] top-[13px] z-[100] stroke-gray-500"
                    />
                    <FormControl>
                      <ReactSearchAutocomplete<SearchableTagType>
                        items={searchableTagTypes}
                        onSearch={(string: string) => {
                          field.onChange(string);
                          setSelectedTags(string.split(' ').filter(Boolean));
                        }}
                        onSelect={(item: SearchableTagType) => {
                          const words = field.value?.split(' ') ?? [];
                          words[words.length - 1] = item.name;
                          const newValue = words.join(' ') + ' ';
                          field.onChange(newValue);
                          setSelectedTags(newValue.split(' ').filter(Boolean));
                        }}
                        formatResult={(item: SearchableTagType) => (
                          <div className="relative flex w-full cursor-pointer select-none items-center justify-between gap-[8px] px-[14px] py-[10px] text-base outline-none data-[disabled]:pointer-events-none">
                            {item.name}
                          </div>
                        )}
                        placeholder="Type tags separated by space"
                        styling={{
                          height: '44px',
                          border: '1px solid #D0D5DD',
                          borderRadius: '8px',
                          backgroundColor: 'white',
                          boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
                          hoverBackgroundColor: 'white',
                          color: '#101828',
                          fontSize: '16px',
                          fontFamily: 'Inter',
                          iconColor: 'white',
                          lineColor: '#101828',
                          placeholderColor: '#667085',
                          searchIconMargin: '0 0 0 9px',
                        }}
                      />
                    </FormControl>
                  </div>
                  <div className="flex flex-wrap items-center gap-[8px]">
                    {selectedTags.map((tag) => (
                      <Badge key={uuidv4()} size="md" variant="primary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </FormItem>
            )}
          />
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
              <FormControl>
                <FileUploader
                  handleFileChange={setFile}
                  required={badgeGrid[editedBadgeID].type === 'new'}
                  value={file}
                />
              </FormControl>
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
                {`${debouncedTransactionCost} IDN`}
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
