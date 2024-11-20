'use client';

import { Responsive, WidthProvider } from 'react-grid-layout';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { cryptography } from '@liskhq/lisk-client/browser';

import { loginWithPasskey } from '../lib/passkeys';
import { loadMnemonic, createJWT } from '../lib/crypto';
import { removeFeature } from '../lib/apiClient';
import {
  updateLayout,
  getLayoutFromServer,
  getDataFromServer,
  createGridFromLayoutAndData,
  getUserIdentity,
  getBadgeIDsFromServer,
  createBadgeGridFromIDs,
} from '../lib/utils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/tabs';
import Header from '../components/app/Header';
import Footer from '../components/app/Footer';
import Widget from '../components/app/grid/Widget';
import EncryptedWidget from '../components/app/grid/EncryptedWidget';
import { useGridStore, useBadgeStore } from '../stores/gridStores';
import { useOnboardingStore } from '../stores/onboardingStore';
import EditItemForm from '../components/app/forms/EditItemForm';
import EditBadgeForm from '../components/app/forms/EditBadgeForm';
import ShareForm from '../components/app/forms/ShareForm';
import AssignForm from '../components/app/forms/AssignForm';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

interface AccountStoreData {
  features: {
    label: string;
    value: string;
  }[];
  verifications: {
    label: string;
    account: string;
    tx: string;
  }[];
  isAuthority: boolean;
}

const HOST = 'api.idntty.io';

const GridLayout = WidthProvider(Responsive);
export default function IdentityPage() {
  const router = useRouter();

  const [_userStatus, setUserStatus] = useState<'anon' | 'owner' | 'guest'>(
    'anon',
  );
  const [_isLoggedIn, setIsLoggedIn] = useState(false);

  const [identity, setIdentity] = useState<'personal' | 'authority'>(
    'personal',
  );
  const [dataFetched, setDataFetched] = useState(false);

  const onboardingComplete = useOnboardingStore(
    (state) => state.onboardingComplete,
  );
  const setOnboardingComplete = useOnboardingStore(
    (state) => state.setOnboardingComplete,
  );

  const grid = useGridStore((state) => state.grid);
  const upperGridLayout = useGridStore((state) => state.upperGridLayout);
  const lowerGridLayout = useGridStore((state) => state.lowerGridLayout);

  const addNewGridItem = useGridStore((state) => state.addNewGridItem);
  const removeNewGridItem = useGridStore((state) => state.removeNewGridItem);
  const removeGridItem = useGridStore((state) => state.removeGridItem);
  const splitGridAtID = useGridStore((state) => state.splitGridAtID);
  const updateGrid = useGridStore((state) => state.updateGrid);
  const updateUpperGridLayout = useGridStore(
    (state) => state.updateUpperGridLayout,
  );
  const updateLayoutPositions = useGridStore(
    (state) => state.updateLayoutPositions,
  );
  const updateLowerGridLayout = useGridStore(
    (state) => state.updateLowerGridLayout,
  );
  const mergeGrids = useGridStore((state) => state.mergeGrids);

  const badgeGrid = useBadgeStore((state) => state.grid);
  const upperBadgeLayout = useBadgeStore((state) => state.upperGridLayout);
  const lowerBadgeLayout = useBadgeStore((state) => state.lowerGridLayout);

  const addNewBadgeGridItem = useBadgeStore((state) => state.addNewGridItem);
  const removeNewBadgeGridItem = useBadgeStore(
    (state) => state.removeNewGridItem,
  );
  const removeBadgeGridItem = useBadgeStore((state) => state.removeGridItem);
  const splitBadgeGridAtID = useBadgeStore((state) => state.splitGridAtID);
  const updateUpperBadgeLayout = useBadgeStore(
    (state) => state.updateUpperGridLayout,
  );
  const updateLowerBadgeLayout = useBadgeStore(
    (state) => state.updateLowerGridLayout,
  );
  const updateBadgeGrid = useBadgeStore((state) => state.updateGrid);
  const mergeBadgeGrids = useBadgeStore((state) => state.mergeGrids);

  const [isShareOrAssignFormOpen, setIsShareOrAssignFormOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const [areGridsEditable, setAreGridsEditable] = useState(false);

  const [isGridSplit, setIsGridSplit] = useState(false);
  const [editedItemID, setEditedItemID] = useState<string | null>(null);

  const [isBadgeGridSplit, setIsBadgeGridSplit] = useState(false);
  const [editedBadgeID, setEditedBadgeID] = useState<string | null>(null);

  const [collections, setCollections] = useState<string[]>([]);

  const { data: badgeIDs, refetch: refetchBadgeIDs } = useQuery<
    string[],
    Error
  >({
    queryKey: ['badgeIDs', router.query.publicKey],
    queryFn: () => getBadgeIDsFromServer(router.query.publicKey as string),
    enabled: router.isReady,
  });

  const { data: accountState } = useQuery<AccountStoreData, Error>({
    queryKey: ['accountState', router.query.publicKey],
    queryFn: async () => {
      const response = await axios.get<AccountStoreData>(
        `https://${HOST}/account`,
        {
          params: {
            address: cryptography.address.getLisk32AddressFromPublicKey(
              Buffer.from(router.query.publicKey as string, 'hex'),
            ),
          },
          withCredentials: true,
        },
      );
      return response.data;
    },
    enabled: router.isReady,
  });

  interface NotificationResponse {
    id: number;
    public_key: string;
    for_public_key: string;
    type: 'share' | 'issueBadge';
    data: string;
    timestamp: string;
  }
  const { data: sharedNotifications } = useQuery<NotificationResponse[], Error>(
    {
      queryKey: ['sharedNotifications', router.query.publicKey],
      queryFn: async () => {
        const response = await axios.get<NotificationResponse[]>(
          `https://${HOST}/get-notifications`,
          {
            params: {
              publicKey: router.query.publicKey,
            },
            withCredentials: true,
          },
        );
        return response.data;
      },
      enabled: router.isReady,
    },
  );

  const getSyncedItems = () => {
    if (!accountState?.features) return [];

    const syncedLabels = new Set(accountState.features.map((f) => f.label));

    return Object.entries(grid)
      .filter(([id, _]) => syncedLabels.has(id))
      .map(([id, item]) => ({ id, ...item }));
  };

  const getValidatedItems = () => {
    if (!accountState?.verifications) return [];

    const validatedLabels = new Set(
      accountState.verifications.map((v) => v.label),
    );

    return Object.entries(grid)
      .filter(([id, _]) => validatedLabels.has(id))
      .map(([id, item]) => ({ id, ...item }));
  };

  const getSharedItems = () => {
    if (!sharedNotifications) return [];

    const sharedIds = new Set(
      sharedNotifications
        .filter((n) => n.type === 'share')
        .flatMap(
          (n) => (JSON.parse(n.data) as { features: string[] }).features,
        ),
    );

    return Object.entries(grid)
      .filter(([id, _]) => sharedIds.has(id))
      .map(([id, item]) => ({ id, ...item }));
  };

  const handleShareClick = () => {
    setIsShareOrAssignFormOpen((prev) => !prev);
  };

  const handleToggleEditClick = () => {
    console.log('Toggle edit clicked:', {
      currentState: areGridsEditable,
      badgeGrid,
    });

    setAreGridsEditable((prev) => {
      if (!prev) {
        addNewGridItem('tiny');
        // addNewBadgeGridItem('tiny'); // FIXME: Should be in one place
      } else {
        removeNewGridItem();
        removeNewBadgeGridItem();
      }
      return !prev;
    });
  };

  const handleMergeGrids = () => {
    mergeGrids();
    setIsGridSplit(false);
    setEditedItemID(null);
  };

  const handleMergeBadgeGrids = () => {
    mergeBadgeGrids();
    setIsBadgeGridSplit(false);
    setEditedBadgeID(null);
  };

  const handleEditGridItemClick = (id: string) => {
    if (isGridSplit) {
      handleMergeGrids();
    }
    splitGridAtID(id);
    setIsGridSplit(true);
    setEditedItemID(id);
  };

  const handleDeleteGridItemClick = (id: string) => {
    removeGridItem(id);

    const publicKey = localStorage.getItem('publicKey');
    if (!publicKey) {
      throw new Error('Public key not found');
    }
    const privateKey = sessionStorage.getItem('privateKey');
    if (!privateKey) {
      throw new Error('Private key not found');
    }
    removeFeature([{ uuid: id }], privateKey, publicKey)
      .then(() => {
        console.log('Feature removed');
      })
      .catch((error) => {
        console.error('Error removing feature:', error);
      });
  };

  const handleEditBadgeGridItemClick = (id: string) => {
    if (isBadgeGridSplit) {
      handleMergeBadgeGrids();
    }
    splitBadgeGridAtID(id);
    setIsBadgeGridSplit(true);
    setEditedBadgeID(id);
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    console.log('Checking auth and user status');

    const localStoragePublicKey = localStorage.getItem('publicKey');
    const sessionStoragePrivateKey = sessionStorage.getItem('privateKey');
    console.log('localStoragePublicKey:', localStoragePublicKey);
    console.log('sessionStoragePrivateKey:', sessionStoragePrivateKey);
    console.log('routePublicKey:', router.query.publicKey);

    let userStatus: 'anon' | 'owner' | 'guest' = 'anon';
    let isLoggedIn = false; // FIXME
    if (!localStoragePublicKey) {
      userStatus = 'anon';
      isLoggedIn = false;
      console.log('anon, not logged in');
    } else if (localStoragePublicKey === router.query.publicKey) {
      userStatus = 'owner';
      isLoggedIn = sessionStoragePrivateKey !== null;
      console.log(isLoggedIn ? 'owner, logged in' : 'owner, not logged in');
    } else {
      userStatus = 'guest';
      isLoggedIn = sessionStoragePrivateKey !== null;
      console.log(isLoggedIn ? 'guest, logged in' : 'guest, not logged in');
    }

    const login = async () => {
      try {
        const response = await loginWithPasskey(
          Buffer.from(localStoragePublicKey!, 'hex'),
        );
        const webAuthnPublicKey = response.webAuthnPublicKey;
        if (!webAuthnPublicKey) {
          throw new Error('Did not get webAuthnPublicKey from server');
        }
        const { privateKey } = await loadMnemonic(webAuthnPublicKey);

        const jwt = await createJWT(
          // await toPrivateKeyObject(privateKey),
          privateKey,
          localStoragePublicKey!,
          {},
        );

        sessionStorage.setItem('jwt', jwt);

        sessionStorage.setItem('privateKey', privateKey.toString('hex'));

        isLoggedIn = true;
      } catch (error) {
        console.error(error);
      }
    };

    const createGrid = async () => {
      try {
        const layout = await getLayoutFromServer(
          router.query.publicKey as string,
        );
        console.log('Fetched layout:', layout);

        if (Object.keys(layout).length === 0 && !onboardingComplete) {
          setOnboardingComplete(true);
          return;
        }

        const data = await getDataFromServer(
          router.query.publicKey as string,
          localStoragePublicKey ?? undefined,
        );
        console.log('Fetched data:', data);
        const { grid, upperGridLayout } = await createGridFromLayoutAndData(
          layout,
          data,
          router.query.publicKey as string,
        );
        updateGrid(grid);
        updateUpperGridLayout(upperGridLayout);
        console.log('Created grid:', grid, upperGridLayout);
      } catch (error) {
        console.error(error);
      }
    };

    const onLoad = async () => {
      if (!isLoggedIn && userStatus !== 'anon') {
        console.log('Logging in');
        await login();
        setUserStatus(userStatus);
        setIsLoggedIn(isLoggedIn);
      }
      const userIdentity = await getUserIdentity(
        router.query.publicKey as string,
      );
      setIdentity(userIdentity.isAuthority ? 'authority' : 'personal');
      await createGrid();
      setDataFetched(true);
    };

    onLoad().catch((error) => {
      console.error(error);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (!areGridsEditable && dataFetched) {
      const localStoragePublicKey = localStorage.getItem('publicKey');
      if (localStoragePublicKey === router.query.publicKey) {
        updateLayout(grid, localStoragePublicKey);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, areGridsEditable, dataFetched]);

  useEffect(() => {
    if (badgeIDs) {
      const { badgeGrid, upperBadgeGridLayout } =
        createBadgeGridFromIDs(badgeIDs);

      updateBadgeGrid(badgeGrid);
      updateUpperBadgeLayout(upperBadgeGridLayout);
    }
  }, [badgeIDs, updateBadgeGrid, updateUpperBadgeLayout]);

  useEffect(() => {
    console.log('Edit mode effect triggered:', {
      areGridsEditable,
      hasBadgeGrid: Object.keys(badgeGrid).length > 0,
      hasNewItem: Object.values(badgeGrid).some((item) => item.type === 'new'),
      badgeGrid,
    });

    if (
      areGridsEditable &&
      !Object.values(badgeGrid).some((item) => item.type === 'new')
    ) {
      addNewBadgeGridItem('tiny');
    }
  }, [areGridsEditable, badgeGrid, addNewBadgeGridItem]);

  useEffect(() => {
    setSelectedItems([]);
  }, [isShareOrAssignFormOpen]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const fetchCollections = async () => {
      try {
        const response = await axios.get<string[]>(
          `https://${HOST}/get-collections`,
          {
            params: {
              publicKey: router.query.publicKey,
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
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Tabs
        defaultValue="all"
        className="relative flex flex-grow flex-col justify-between overflow-auto bg-gray-50"
      >
        <Header
          tabsType="primary"
          onToggleEditClick={handleToggleEditClick}
          onShareClick={handleShareClick}
        />
        <div className="flex-grow"></div>
        <TabsContent value="all">
          <div className="relative mx-auto w-[482px] bg-gray-100 lg:w-[924px]">
            {isShareOrAssignFormOpen && (
              <div className="relative left-1/2 flex w-screen -translate-x-1/2 transform justify-center bg-white py-[20px]">
                <div className="w-[840px]">
                  {identity === 'personal' ? (
                    <ShareForm
                      onCancel={handleShareClick}
                      selectedForSharing={selectedItems}
                    />
                  ) : (
                    <AssignForm
                      onCancel={handleShareClick}
                      selectedForAssignment={selectedItems}
                    />
                  )}
                </div>
              </div>
            )}
            {!(identity === 'authority' && isShareOrAssignFormOpen) && (
              <>
                <GridLayout
                  layouts={{
                    lg: upperGridLayout,
                    md: upperGridLayout,
                  }}
                  cols={{
                    lg: 4,
                    md: 2,
                  }}
                  breakpoints={{
                    lg: 923,
                    md: 0,
                  }}
                  margin={[40, 40]}
                  compactType={'horizontal'}
                  isResizable={false}
                  isDraggable={areGridsEditable}
                  isBounded={false}
                  rowHeight={181}
                  className="bg-gray-100"
                  onDragStart={(...args) => {
                    console.log(
                      'upperGridLayout onDragStart:',
                      upperGridLayout,
                    );
                    console.log(
                      'lowerGridLayout onDragStart:',
                      lowerGridLayout,
                    );
                    console.log('layout onDragStart:', args[0]);
                  }}
                  onLayoutChange={(layout) => {
                    console.log('layout onLayoutChange:', layout, grid);
                    // updateUpperGridLayout(layout);
                    updateLayoutPositions(layout);
                  }}
                >
                  {upperGridLayout.map((layout) => {
                    if (grid[layout.i].content === '') {
                      return (
                        <EncryptedWidget
                          key={layout.i}
                          size={grid[layout.i].size}
                        />
                      );
                    }
                    return (
                      <Widget
                        key={layout.i}
                        size={grid[layout.i].size}
                        type={grid[layout.i].type}
                        state={
                          isGridSplit && editedItemID === layout.i
                            ? 'edit'
                            : selectedItems.includes(layout.i) &&
                                !areGridsEditable &&
                                isShareOrAssignFormOpen
                              ? 'selected'
                              : 'default'
                        }
                        value={grid[layout.i].content}
                        isEditable={areGridsEditable}
                        onDeleteClick={
                          grid[layout.i].type !== 'new'
                            ? () => handleDeleteGridItemClick(layout.i)
                            : undefined
                        }
                        onEditClick={() => handleEditGridItemClick(layout.i)}
                        onClick={() =>
                          setSelectedItems((prev) => {
                            if (prev.includes(layout.i)) {
                              return prev.filter((item) => item !== layout.i);
                            }
                            return [...prev, layout.i];
                          })
                        }
                      />
                    );
                  })}
                </GridLayout>
                {isGridSplit && (
                  <div className="relative left-1/2 flex w-screen -translate-x-1/2 transform justify-center bg-white py-[20px]">
                    <div className="w-[840px]">
                      <EditItemForm
                        // editedItemID can't be null based on handleEditGridItemClick
                        editedItemID={editedItemID!}
                        onCancel={handleMergeGrids}
                        onSubmit={handleMergeGrids}
                      />
                    </div>
                  </div>
                )}
                {isGridSplit && (
                  <GridLayout
                    layouts={{
                      lg: lowerGridLayout,
                      md: lowerGridLayout,
                    }}
                    cols={{
                      lg: 4,
                      md: 2,
                    }}
                    breakpoints={{
                      lg: 923,
                      md: 0,
                    }}
                    margin={[40, 40]}
                    isResizable={false}
                    isBounded={false}
                    rowHeight={181}
                    compactType={null}
                    className="bg-gray-100"
                    onLayoutChange={(layout) => {
                      console.log('layout onLayoutChange:', layout);
                      updateLowerGridLayout(layout);
                    }}
                  >
                    {lowerGridLayout.map((layout) => {
                      return (
                        <Widget
                          key={layout.i}
                          size={grid[layout.i].size}
                          type={grid[layout.i].type}
                          value={grid[layout.i].content}
                          isEditable={areGridsEditable}
                          onDeleteClick={() =>
                            handleDeleteGridItemClick(layout.i)
                          }
                          onEditClick={() => handleEditGridItemClick(layout.i)}
                        />
                      );
                    })}
                  </GridLayout>
                )}
              </>
            )}
          </div>
        </TabsContent>
        <TabsContent value="synced">
          <div className="relative mx-auto flex w-[482px] flex-wrap gap-[40px] bg-gray-100 p-[40px] lg:w-[924px]">
            {getSyncedItems().map(({ id, ...item }) => (
              <Widget
                key={id}
                size="tiny"
                type={item.type}
                value={item.content}
                isEditable={false}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="validated">
          <div className="relative mx-auto flex w-[482px] flex-wrap gap-[40px] bg-gray-100 p-[40px] lg:w-[924px]">
            {getValidatedItems().map(({ id, ...item }) => (
              <Widget
                key={id}
                size="tiny"
                type={item.type}
                value={item.content}
                isEditable={false}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="shared">
          <div className="relative mx-auto flex w-[482px] flex-wrap gap-[40px] bg-gray-100 p-[40px] lg:w-[924px]">
            {getSharedItems().map(({ id, ...item }) => (
              <Widget
                key={id}
                size={item.size}
                type={item.type}
                value={item.content}
                isEditable={false}
              />
            ))}
          </div>
        </TabsContent>
        <div className="flex-grow"></div>
      </Tabs>
      {identity === 'authority' &&
        (areGridsEditable || (badgeIDs && badgeIDs.length > 0)) && (
          <Tabs
            defaultValue="badges"
            className="relative flex flex-grow flex-col justify-between overflow-auto bg-gray-50"
          >
            <div className="flex justify-center self-stretch px-[300px] py-[20px]">
              <TabsList>
                <TabsTrigger value="badges">Badges</TabsTrigger>
                <TabsTrigger value="collections">Collections</TabsTrigger>
              </TabsList>
            </div>
            <div className="flex-grow"></div>
            <TabsContent value="badges">
              <div className="relative mx-auto w-[482px] bg-gray-100 lg:w-[924px]">
                <GridLayout
                  layouts={{
                    lg: upperBadgeLayout,
                    md: upperBadgeLayout,
                  }}
                  cols={{
                    lg: 4,
                    md: 2,
                  }}
                  breakpoints={{
                    lg: 923,
                    md: 0,
                  }}
                  margin={[40, 40]}
                  compactType={'horizontal'}
                  isResizable={false}
                  isDraggable={areGridsEditable}
                  isBounded={false}
                  rowHeight={181}
                  className="bg-gray-100"
                  onDragStart={(...args) => {
                    console.log(
                      'upperGridLayout onDragStart:',
                      upperBadgeLayout,
                    );
                    console.log(
                      'lowerGridLayout onDragStart:',
                      lowerBadgeLayout,
                    );
                    console.log('layout onDragStart:', args[0]);
                  }}
                  onLayoutChange={(layout) => {
                    console.log('layout onLayoutChange:', layout);
                    updateUpperBadgeLayout(layout);
                  }}
                >
                  {upperBadgeLayout.map((layout) => {
                    return (
                      <Widget
                        key={layout.i}
                        size={badgeGrid[layout.i].size}
                        type={badgeGrid[layout.i].type}
                        state={
                          isBadgeGridSplit && editedBadgeID === layout.i
                            ? 'edit'
                            : selectedItems.includes(layout.i) &&
                                !areGridsEditable &&
                                isShareOrAssignFormOpen
                              ? 'selected'
                              : 'default'
                        }
                        value={badgeGrid[layout.i].content}
                        isEditable={areGridsEditable}
                        onDeleteClick={
                          badgeGrid[layout.i].type !== 'new'
                            ? () => removeBadgeGridItem(layout.i)
                            : undefined
                        }
                        onEditClick={() =>
                          handleEditBadgeGridItemClick(layout.i)
                        }
                        onClick={() =>
                          setSelectedItems((prev) => {
                            if (prev.includes(layout.i)) {
                              return prev.filter((item) => item !== layout.i);
                            }
                            return [...prev, layout.i];
                          })
                        }
                      />
                    );
                  })}
                </GridLayout>
                {isBadgeGridSplit && (
                  <div className="relative left-1/2 flex w-screen -translate-x-1/2 transform justify-center bg-white py-[20px]">
                    <div className="w-[840px]">
                      <EditBadgeForm
                        // editedBadgeID can't be null based on handleEditBadgeGridItemClick
                        editedBadgeID={editedBadgeID!}
                        onCancel={handleMergeBadgeGrids}
                        onSubmit={handleMergeBadgeGrids}
                        refetch={refetchBadgeIDs}
                      />
                    </div>
                  </div>
                )}
                {isBadgeGridSplit && (
                  <GridLayout
                    layouts={{
                      lg: lowerBadgeLayout,
                      md: lowerBadgeLayout,
                    }}
                    cols={{
                      lg: 4,
                      md: 2,
                    }}
                    breakpoints={{
                      lg: 923,
                      md: 0,
                    }}
                    margin={[40, 40]}
                    isResizable={false}
                    isBounded={false}
                    rowHeight={181}
                    compactType={null}
                    className="bg-gray-100"
                    onLayoutChange={(layout) => {
                      console.log('layout onLayoutChange:', layout);
                      updateLowerBadgeLayout(layout);
                    }}
                  >
                    {lowerBadgeLayout.map((layout) => {
                      return (
                        <Widget
                          key={layout.i}
                          size={badgeGrid[layout.i].size}
                          type={badgeGrid[layout.i].type}
                          value={badgeGrid[layout.i].content}
                          isEditable={areGridsEditable}
                          onDeleteClick={() => removeBadgeGridItem(layout.i)}
                          onEditClick={() =>
                            handleEditBadgeGridItemClick(layout.i)
                          }
                        />
                      );
                    })}
                  </GridLayout>
                )}
              </div>
            </TabsContent>
            <TabsContent value="collections">
              <div className="relative mx-auto flex w-[482px] flex-wrap gap-[40px] bg-gray-100 p-[40px] lg:w-[924px]">
                {collections.map((collection) => (
                  <Widget
                    key={collection}
                    size="tiny"
                    type="other"
                    value={collection}
                    isEditable={false}
                  />
                ))}
              </div>
            </TabsContent>
            <div className="flex-grow"></div>
          </Tabs>
        )}
      <Footer />
    </div>
  );
}
