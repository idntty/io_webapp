import { Responsive, WidthProvider } from 'react-grid-layout';
import { useState } from 'react';

import { uuidv4 } from '../lib/utils';
import Header from '../components/app/Header';
import Footer from '../components/app/Footer';
import Widget from '../components/app/grid/Widget';
import {
  type GridItemContent,
  type GridItemSize,
  ITEM_SIZES,
  defaultGridContent,
  convertTo2ColumnLayout,
} from '../components/app/grid/gridLayout';
import EditItemForm from '../components/app/forms/EditItemForm';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import '../components/app/grid/placeholder.css';

const GridLayout = WidthProvider(Responsive);

export default function IdentityPage() {
  const [gridContent, setGridContent] =
    useState<GridItemContent[]>(defaultGridContent);
  const [lowerGridContent, setLowerGridContent] = useState<GridItemContent[]>(
    [],
  );
  const [isGridSplit, setIsGridSplit] = useState(false);

  function addGridItem(size: GridItemSize): void {
    const w = ['large', 'long'].includes(size) ? 2 : 1;
    const h = ['large', 'tall'].includes(size) ? 2 : 1;

    const position = findAvailablePosition(w, h);
    const newGridItem: GridItemContent = {
      size,
      layout: {
        i: uuidv4(),
        x: position.x,
        y: position.y,
        w,
        h,
      },
    };

    setGridContent((prev) => [...prev, newGridItem]);
  }

  function findAvailablePosition(
    w: number,
    h: number,
  ): {
    x: number;
    y: number;
  } {
    for (let y = 0; ; y++) {
      for (let x = 0; x <= 4 - w; x++) {
        if (canPlaceItem(x, y, w, h)) {
          return { x, y };
        }
      }
    }
  }

  function canPlaceItem(x: number, y: number, w: number, h: number): boolean {
    for (const item of gridContent) {
      if (
        !(
          x + w <= item.layout.x ||
          x >= item.layout.x + item.layout.w ||
          y + h <= item.layout.y ||
          y >= item.layout.y + item.layout.h
        )
      ) {
        return false;
      }
    }
    return true;
  }

  function splitGrid(widgetId: string): void {
    const widget = gridContent.find((item) => item.layout.i === widgetId);
    if (!widget) return;

    const widgetRow = widget.layout.y + widget.layout.h;

    const topGrid = gridContent.filter(
      (item) =>
        item.layout.y < widgetRow ||
        (item.layout.y === widget.layout.y && item.layout.x <= widget.layout.x),
    );
    const bottomGrid = gridContent.filter((item) => item.layout.y >= widgetRow);

    setGridContent(topGrid);
    setLowerGridContent(bottomGrid);
    setIsGridSplit(true);
  }

  function mergeGrids(): void {
    setGridContent([...gridContent, ...lowerGridContent]);
    setLowerGridContent([]);
    setIsGridSplit(false);
  }

  // FIXME: Layout is only being re-rendered after a drag when adding a new item after deleting one
  const handleAddGridItemClick = () => {
    const randomSize =
      ITEM_SIZES[Math.floor(Math.random() * ITEM_SIZES.length)];
    addGridItem(randomSize);
  };

  const handleDeleteGridItemClick = (
    id: string,
    gridPosition: 'upper' | 'lower',
  ) => {
    if (gridPosition === 'upper') {
      setGridContent((prev) => prev.filter((item) => item.layout.i !== id));
    } else {
      setLowerGridContent((prev) =>
        prev.filter((item) => item.layout.i !== id),
      );
    }
  };

  return (
    <div className="relative flex h-screen flex-col justify-between overflow-auto bg-gray-50">
      <Header type="primary" onAddClick={handleAddGridItemClick} />
      <div className="relative mx-auto w-[482px] bg-gray-100 lg:w-[924px]">
        <GridLayout
          layouts={{
            lg: gridContent.map((item) => item.layout),
            md: convertTo2ColumnLayout(gridContent).map((item) => item.layout),
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
          onDragStart={(...args) => {
            const [, oldItem, , , event] = args;
            if (
              event.target instanceof Element &&
              event.target.classList.contains('delete-handle')
            )
              handleDeleteGridItemClick(oldItem.i, 'upper');
            if (
              event.target instanceof Element &&
              event.target.classList.contains('edit-handle')
            )
              splitGrid(oldItem.i);
          }}
          onLayoutChange={(layout) => {
            setGridContent((prev) =>
              prev.map((item, index) => {
                return {
                  ...item,
                  layout: {
                    ...item.layout,
                    ...layout[index],
                  },
                };
              }),
            );
          }}
        >
          {gridContent.map((item: GridItemContent) => {
            return (
              <Widget
                key={item.layout.i}
                size={item.size}
                variant="placeholder"
              />
            );
          })}
        </GridLayout>
        {isGridSplit && (
          <div className="relative left-1/2 flex w-screen -translate-x-1/2 transform justify-center bg-white py-[20px]">
            <div className="w-[840px]">
              <EditItemForm onCancel={mergeGrids} onSubmit={mergeGrids} />
            </div>
          </div>
        )}
        {isGridSplit && (
          <GridLayout
            layouts={{
              lg: lowerGridContent.map((item) => item.layout),
              md: convertTo2ColumnLayout(lowerGridContent).map(
                (item) => item.layout,
              ),
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
            onDragStart={(...args) => {
              const [, oldItem, , , event] = args;
              if (
                event.target instanceof Element &&
                event.target.classList.contains('delete-handle')
              )
                handleDeleteGridItemClick(oldItem.i, 'lower');
            }}
            onLayoutChange={(layout) => {
              setLowerGridContent((prev) =>
                prev.map((item, index) => {
                  return {
                    ...item,
                    layout: {
                      ...item.layout,
                      ...layout[index],
                    },
                  };
                }),
              );
            }}
          >
            {lowerGridContent.map((item: GridItemContent) => {
              return (
                <Widget
                  key={item.layout.i}
                  size={item.size}
                  variant="placeholder"
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
