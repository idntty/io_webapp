'use client';

import { Responsive, WidthProvider } from 'react-grid-layout';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { loginWithPasskey } from '../lib/passkeys';
import { loadMnemonic, createJWT } from '../lib/crypto';
import { removeFeature } from '../lib/apiClient';
import {
  extractLayout,
  sendLayoutToServer,
  getLayoutFromServer,
  getDataFromServer,
  createGridFromLayoutAndData,
  getUserIdentity,
} from '../lib/utils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/tabs';
import Header from '../components/app/Header';
import Footer from '../components/app/Footer';
import Widget from '../components/app/grid/Widget';
import EncryptedWidget from '../components/app/grid/EncryptedWidget';
import { useGridStore, useBadgeStore } from '../stores/gridStores';
import EditItemForm from '../components/app/forms/EditItemForm';
import EditBadgeForm from '../components/app/forms/EditBadgeForm';
import ShareForm from '../components/app/forms/ShareForm';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
// import '../components/app/grid/placeholder.css';

const GridLayout = WidthProvider(Responsive);
export default function IdentityPage() {
  const router = useRouter();

  const [_userStatus, setUserStatus] = useState<'anon' | 'owner' | 'guest'>(
    'anon',
  );
  const [_isLoggedIn, setIsLoggedIn] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  const [identity, setIdentity] = useState<'personal' | 'authority'>(
    'personal',
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
  const mergeBadgeGrids = useBadgeStore((state) => state.mergeGrids);

  const [isShareFormOpen, setIsShareFormOpen] = useState(false);
  const [selectedForSharing, setSelectedForSharing] = useState<string[]>([]);

  const [areGridsEditable, setAreGridsEditable] = useState(false);

  const [isGridSplit, setIsGridSplit] = useState(false);
  const [editedItemID, setEditedItemID] = useState<string | null>(null);

  const [isBadgeGridSplit, setIsBadgeGridSplit] = useState(false);
  const [editedBadgeID, setEditedBadgeID] = useState<string | null>(null);

  const handleShareClick = () => {
    setIsShareFormOpen((prev) => !prev);
  };

  const handleToggleEditClick = () => {
    setAreGridsEditable((prev) => {
      if (!prev) {
        addNewGridItem('tiny');
        addNewBadgeGridItem('tiny');
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
    let isLoggedIn = false;
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
    if (!areGridsEditable && dataFetched) {
      const filteredGrid = Object.fromEntries(
        Object.entries(grid).filter(([_, value]) => value.type !== 'new'),
      );

      const layout = extractLayout(filteredGrid);

      const publicKey = localStorage.getItem('publicKey');
      if (publicKey) {
        sendLayoutToServer(publicKey, layout)
          .then(() => {
            console.log('Layout sent to server:', layout);
          })
          .catch((error) => {
            console.error('Error sending layout to server:', error);
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [areGridsEditable, dataFetched]);

  useEffect(() => {
    setSelectedForSharing([]);
  }, [isShareFormOpen]);

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
            {isShareFormOpen && (
              <div className="relative left-1/2 flex w-screen -translate-x-1/2 transform justify-center bg-white py-[20px]">
                <div className="w-[840px]">
                  <ShareForm
                    onCancel={handleShareClick}
                    selectedForSharing={selectedForSharing}
                  />
                </div>
              </div>
            )}
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
                console.log('upperGridLayout onDragStart:', upperGridLayout);
                console.log('lowerGridLayout onDragStart:', lowerGridLayout);
                console.log('layout onDragStart:', args[0]);
              }}
              onLayoutChange={(layout) => {
                console.log('layout onLayoutChange:', layout, grid);
                updateUpperGridLayout(layout);
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
                        : selectedForSharing.includes(layout.i) &&
                            !areGridsEditable &&
                            isShareFormOpen
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
                      setSelectedForSharing((prev) => {
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
                      onDeleteClick={() => handleDeleteGridItemClick(layout.i)}
                      onEditClick={() => handleEditGridItemClick(layout.i)}
                    />
                  );
                })}
              </GridLayout>
            )}
          </div>
        </TabsContent>
        <div className="flex-grow"></div>
      </Tabs>
      {identity === 'authority' && (
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
                  console.log('upperGridLayout onDragStart:', upperBadgeLayout);
                  console.log('lowerGridLayout onDragStart:', lowerBadgeLayout);
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
                          : 'default'
                      }
                      value={badgeGrid[layout.i].content}
                      isEditable={areGridsEditable}
                      onDeleteClick={
                        badgeGrid[layout.i].type !== 'new'
                          ? () => removeBadgeGridItem(layout.i)
                          : undefined
                      }
                      onEditClick={() => handleEditBadgeGridItemClick(layout.i)}
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
          <div className="flex-grow"></div>
        </Tabs>
      )}
      <Footer />
    </div>
  );
}
