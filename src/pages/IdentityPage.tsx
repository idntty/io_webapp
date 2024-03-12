import { Responsive, WidthProvider } from 'react-grid-layout';
import { useState } from 'react';

import { Tabs, TabsContent } from '../components/tabs';
import Header from '../components/app/Header';
import Footer from '../components/app/Footer';
import Widget from '../components/app/grid/Widget';
import { useGridStore } from '../stores/gridStore';
import EditItemForm from '../components/app/forms/EditItemForm';
import ShareForm from '../components/app/forms/ShareForm';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import '../components/app/grid/placeholder.css';

const GridLayout = WidthProvider(Responsive);

export default function IdentityPage() {
  const grid = useGridStore((state) => state.grid);
  const upperGridLayout = useGridStore((state) => state.upperGridLayout);
  const lowerGridLayout = useGridStore((state) => state.lowerGridLayout);

  const addNewGridItem = useGridStore((state) => state.addNewGridItem);
  const removeNewGridItem = useGridStore((state) => state.removeNewGridItem);
  const removeGridItem = useGridStore((state) => state.removeGridItem);
  const splitGridAtID = useGridStore((state) => state.splitGridAtID);
  const updateUpperGridLayout = useGridStore(
    (state) => state.updateUpperGridLayout,
  );
  const updateLowerGridLayout = useGridStore(
    (state) => state.updateLowerGridLayout,
  );
  const mergeGrids = useGridStore((state) => state.mergeGrids);

  const [isShareFormOpen, setIsShareFormOpen] = useState(false);

  const [isGridEditable, setIsGridEditable] = useState(false);
  const [isGridSplit, setIsGridSplit] = useState(false);
  const [editedItemID, setEditedItemID] = useState<string | null>(null);

  const handleShareClick = () => {
    setIsShareFormOpen((prev) => !prev);
  };

  const handleToggleEditClick = () => {
    setIsGridEditable((prev) => {
      if (!prev) {
        addNewGridItem('tiny');
      } else {
        removeNewGridItem();
      }
      return !prev;
    });
  };

  const handleMergeGrids = () => {
    mergeGrids();
    setIsGridSplit(false);
    setEditedItemID(null);
  };

  const handleEditGridItemClick = (id: string) => {
    if (isGridSplit) {
      handleMergeGrids();
    }
    splitGridAtID(id);
    setIsGridSplit(true);
    setEditedItemID(id);
  };

  return (
    <Tabs
      defaultValue="all"
      className="relative flex h-screen flex-col justify-between overflow-auto bg-gray-50"
    >
      <Header
        type="primary"
        onToggleEditClick={handleToggleEditClick}
        onShareClick={handleShareClick}
      />
      <TabsContent value="all">
        <div className="relative mx-auto w-[482px] bg-gray-100 lg:w-[924px]">
          {isShareFormOpen && (
            <div className="relative left-1/2 flex w-screen -translate-x-1/2 transform justify-center bg-white py-[20px]">
              <div className="w-[840px]">
                <ShareForm />
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
            isDraggable={isGridEditable}
            isBounded={false}
            rowHeight={181}
            className="bg-gray-100"
            onDragStart={(...args) => {
              console.log('upperGridLayout onDragStart:', upperGridLayout);
              console.log('lowerGridLayout onDragStart:', lowerGridLayout);
              console.log('layout onDragStart:', args[0]);
            }}
            onLayoutChange={(layout) => {
              console.log('layout onLayoutChange:', layout);
              updateUpperGridLayout(layout);
            }}
          >
            {upperGridLayout.map((layout) => {
              return (
                <Widget
                  key={layout.i}
                  size={grid[layout.i].size}
                  type={grid[layout.i].type}
                  state={
                    isGridSplit && editedItemID === layout.i
                      ? 'edit'
                      : 'default'
                  }
                  value={grid[layout.i].content}
                  isEditable={isGridEditable}
                  onDeleteClick={
                    grid[layout.i].type !== 'new'
                      ? () => removeGridItem(layout.i)
                      : undefined
                  }
                  onEditClick={() => handleEditGridItemClick(layout.i)}
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
                    isEditable={isGridEditable}
                    onDeleteClick={() => removeGridItem(layout.i)}
                    onEditClick={() => handleEditGridItemClick(layout.i)}
                  />
                );
              })}
            </GridLayout>
          )}
        </div>
      </TabsContent>
      <Footer />
    </Tabs>
  );
}
