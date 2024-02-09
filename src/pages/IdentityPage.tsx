import RGL, { WidthProvider } from 'react-grid-layout';
import { useEffect, useState } from 'react';

import { uuidv4 } from '../lib/utils';
import Header from '../components/identity-page/Header';
import Footer from '../components/identity-page/Footer';
import Widget from '../components/identity-page/grid/Widget';
import {
  type GridItemContent,
  type GridItemSize,
  ITEM_SIZES,
  defaultGridContent,
} from '../components/identity-page/grid/gridLayout';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import '../components/identity-page/grid/placeholder.css';

const GridLayout = WidthProvider(RGL);

export default function RGLTest() {
  const [gridContent, setGridContent] =
    useState<GridItemContent[]>(defaultGridContent);

  useEffect(() => {
    console.log(gridContent);
  });

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

  const handleAddGridItemClick = () => {
    const randomSize =
      ITEM_SIZES[Math.floor(Math.random() * ITEM_SIZES.length)];
    addGridItem(randomSize);
  };

  return (
    <div className="relative flex h-screen flex-col justify-between overflow-auto bg-gray-50">
      <Header onAddClick={handleAddGridItemClick} />
      <div className="mx-auto w-[924px] bg-gray-100">
        <GridLayout
          layout={gridContent.map((obj) => obj.layout)}
          cols={4}
          margin={[40, 40]}
          isResizable={false}
          isBounded={false}
          rowHeight={181}
          className="bg-gray-100"
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
      </div>
      <Footer />
    </div>
  );
}
