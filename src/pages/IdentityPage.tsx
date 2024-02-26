import { Responsive, WidthProvider } from 'react-grid-layout';
import { useState } from 'react';

import Header from '../components/app/Header';
import Footer from '../components/app/Footer';
import Widget from '../components/app/grid/Widget';
import { ITEM_SIZES, createGridItem } from '../components/app/grid/gridLayout';
import { useGridStore } from '../stores/gridStore';
import EditItemForm from '../components/app/forms/EditItemForm';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import '../components/app/grid/placeholder.css';

const GridLayout = WidthProvider(Responsive);

export default function IdentityPage() {
  const grid = useGridStore((state) => state.grid);
  const upperGridIDs = useGridStore((state) => state.upperGridIDs);
  const lowerGridIDs = useGridStore((state) => state.lowerGridIDs);
  const addGridItem = useGridStore((state) => state.addGridItem);
  const removeGridItem = useGridStore((state) => state.removeGridItem);
  const splitGridAtID = useGridStore((state) => state.splitGridAtID);
  const mergeGrids = useGridStore((state) => state.mergeGrids);

  const [isGridSplit, setIsGridSplit] = useState(false);

  // FIXME: Layout is only being re-rendered after a drag when adding a new item after deleting one
  const handleAddGridItemClick = () => {
    const randomSize =
      ITEM_SIZES[Math.floor(Math.random() * ITEM_SIZES.length)];
    const newItem = createGridItem(randomSize);
    console.log('createGridItem', newItem);
    addGridItem(newItem);
  };

  const handleMergeGrids = () => {
    mergeGrids();
    setIsGridSplit(false);
  };

  return (
    <div className="relative flex h-screen flex-col justify-between overflow-auto bg-gray-50">
      <Header type="primary" onAddClick={handleAddGridItemClick} />
      <div className="relative mx-auto w-[482px] bg-gray-100 lg:w-[924px]">
        <GridLayout
          layouts={{
            lg: upperGridIDs.map((id) => grid[id].layout),
            md: upperGridIDs.map((id) => grid[id].layout),
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
          compactType={'horizontal'}
          className="bg-gray-100"
          onDragStart={(...args) => {
            console.log('upperGridIDs:', upperGridIDs);
            console.log('lowerGridIDs:', lowerGridIDs);
            const [layout, oldItem, , , event] = args;
            console.log(layout);
            if (
              event.target instanceof Element &&
              event.target.classList.contains('delete-handle')
            )
              removeGridItem(oldItem.i);
            if (
              event.target instanceof Element &&
              event.target.classList.contains('edit-handle')
            ) {
              splitGridAtID(oldItem.i);
              setIsGridSplit(true);
            }
          }}
          // onLayoutChange={(layout) => {
          //   setGridContent((prev) =>
          //     prev.map((item, index) => {
          //       return {
          //         ...item,
          //         layout: {
          //           ...item.layout,
          //           ...layout[index],
          //         },
          //       };
          //     }),
          //   );
          // }}
        >
          {upperGridIDs.map((id) => {
            return (
              <Widget
                key={id}
                size={grid[id].size}
                variant="text"
                text={grid[id].layout.i}
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
              lg: lowerGridIDs.map((id) => grid[id].layout),
              md: lowerGridIDs.map((id) => grid[id].layout),
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
            className="bg-gray-100"
            // onLayoutChange={(layout) => {
            //   setLowerGridContent((prev) =>
            //     prev.map((item, index) => {
            //       return {
            //         ...item,
            //         layout: {
            //           ...item.layout,
            //           ...layout[index],
            //         },
            //       };
            //     }),
            //   );
            // }}
          >
            {lowerGridIDs.map((id) => {
              return (
                <Widget
                  key={id}
                  size={grid[id].size}
                  variant="text"
                  text={grid[id].layout.i}
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
