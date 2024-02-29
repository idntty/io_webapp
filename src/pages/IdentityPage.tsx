import { Responsive, WidthProvider } from 'react-grid-layout';
import { useState } from 'react';

import Header from '../components/app/Header';
import Footer from '../components/app/Footer';
import Widget from '../components/app/grid/Widget';
import { ITEM_SIZES } from '../types/grid';
import { useGridStore } from '../stores/gridStore';
import EditItemForm from '../components/app/forms/EditItemForm';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import '../components/app/grid/placeholder.css';

const GridLayout = WidthProvider(Responsive);

export default function IdentityPage() {
  const grid = useGridStore((state) => state.grid);
  const upperGridLayout = useGridStore((state) => state.upperGridLayout);
  const lowerGridLayout = useGridStore((state) => state.lowerGridLayout);

  const addGridItem = useGridStore((state) => state.addGridItem);
  const removeGridItem = useGridStore((state) => state.removeGridItem);
  const splitGridAtID = useGridStore((state) => state.splitGridAtID);
  const updateUpperGridLayout = useGridStore(
    (state) => state.updateUpperGridLayout,
  );
  const updateLowerGridLayout = useGridStore(
    (state) => state.updateLowerGridLayout,
  );
  const mergeGrids = useGridStore((state) => state.mergeGrids);

  const [isGridSplit, setIsGridSplit] = useState(false);
  const [editedItemID, setEditedItemID] = useState<string | null>(null);

  const handleAddGridItemClick = () => {
    const randomSize =
      ITEM_SIZES[Math.floor(Math.random() * ITEM_SIZES.length)];
    addGridItem(randomSize);
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
    <div className="relative flex h-screen flex-col justify-between overflow-auto bg-gray-50">
      <Header type="primary" onAddClick={handleAddGridItemClick} />
      <div className="relative mx-auto w-[482px] bg-gray-100 lg:w-[924px]">
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
          isBounded={false}
          rowHeight={181}
          compactType={'horizontal'}
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
                variant="text"
                state={
                  isGridSplit && editedItemID === layout.i ? 'edit' : 'default'
                }
                text={layout.i}
                onDeleteClick={() => removeGridItem(layout.i)}
                onEditClick={() => handleEditGridItemClick(layout.i)}
              />
            );
          })}
        </GridLayout>
        {isGridSplit && (
          <div className="relative left-1/2 flex w-screen -translate-x-1/2 transform justify-center bg-white py-[20px]">
            <div className="w-[840px]">
              <EditItemForm
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
            compactType={'horizontal'}
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
                  variant="text"
                  text={layout.i}
                  onDeleteClick={() => removeGridItem(layout.i)}
                  onEditClick={() => handleEditGridItemClick(layout.i)}
                />
              );
            })}
          </GridLayout>
        )}
      </div>
      <Footer />
    </div>
  );
}
