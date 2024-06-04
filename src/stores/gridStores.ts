import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { uuidv4 } from '../lib/utils';
import type { GridItem, GridItemSize, GridItemLayout } from '../types/grid';

const compareLayoutsFn = (a: GridItemLayout, b: GridItemLayout) => {
  if (a.y === b.y) {
    return a.x - b.x;
  }
  return a.y - b.y;
};

const findNewItemPosition = (
  grid: GridItemLayout[],
  itemW: number,
  itemH: number,
) => {
  let itemX = 0;
  let itemY = 0;

  let maxStartingY = 0;
  let maxY = 0;
  grid.forEach((layout) => {
    maxStartingY = Math.max(maxStartingY, layout.y);
    maxY = Math.max(maxY, layout.y + layout.h);
  });

  let spaceFound = false;
  for (let y = maxStartingY; y <= maxY && !spaceFound; y++) {
    for (let x = 0; x < 4; x++) {
      const isSpaceAvailable = grid.every(
        (layout) =>
          x + itemW <= 4 &&
          (layout.y >= y + itemH ||
            layout.y + layout.h <= y ||
            layout.x + layout.w <= x ||
            layout.x >= x + itemW),
      );
      if (isSpaceAvailable) {
        itemX = x;
        itemY = y;
        spaceFound = true;
        break;
      }
    }
  }

  if (!spaceFound) {
    itemX = 0;
    itemY = maxY;
  }

  return { itemX, itemY };
};

const sizeToDimensions = (size: GridItemSize) => {
  return {
    itemW: ['large', 'long'].includes(size) ? 2 : 1,
    itemH: ['large', 'tall'].includes(size) ? 2 : 1,
  };
};

export interface GridState {
  grid: Record<string, GridItem>;
  upperGridLayout: GridItemLayout[];
  lowerGridLayout: GridItemLayout[];
  savedYOffset: number;

  addNewGridItem: (size: GridItemSize) => void;
  removeNewGridItem: () => void;
  removeGridItem: (id: string) => void;
  splitGridAtID: (id: string) => void;
  updateGrid: (grid: Record<string, GridItem>) => void;
  updateUpperGridLayout: (layout: GridItemLayout[]) => void;
  updateLowerGridLayout: (layout: GridItemLayout[]) => void;
  mergeGrids: () => void;
  updateGridItem: (id: string, newItem: Omit<GridItem, 'layout'>) => void;
}

const createGridStore = () =>
  create<GridState>()(
    subscribeWithSelector((set) => ({
      grid: {},
      upperGridLayout: [],
      lowerGridLayout: [],
      savedYOffset: 0,

      addNewGridItem: (size: GridItemSize) =>
        set((state) => {
          const { itemW, itemH } = sizeToDimensions(size);

          const { itemX, itemY } = findNewItemPosition(
            state.upperGridLayout,
            itemW,
            itemH,
          );

          const id = uuidv4();

          const item: GridItem = {
            size,
            layout: {
              i: id,
              x: itemX,
              y: itemY,
              w: itemW,
              h: itemH,
            },
            content: id,
            type: 'new',
          };

          return {
            ...state,
            grid: { ...state.grid, [item.layout.i]: item },
            upperGridLayout: [...state.upperGridLayout, item.layout].sort(
              compareLayoutsFn,
            ),
          };
        }),

      removeNewGridItem: () =>
        set((state) => {
          return {
            ...state,
            grid: Object.fromEntries(
              Object.entries(state.grid).filter(
                ([_, item]) => item.type !== 'new',
              ),
            ),
            upperGridLayout: state.upperGridLayout.filter(
              (layout) => state.grid[layout.i].type !== 'new',
            ),
            lowerGridLayout: state.lowerGridLayout.filter(
              (layout) => state.grid[layout.i].type !== 'new',
            ),
          };
        }),

      removeGridItem: (id: string) =>
        set((state) => {
          const { [id]: _, ...restOfGrid } = state.grid;
          return {
            ...state,
            grid: restOfGrid,
            upperGridLayout: state.upperGridLayout.filter(
              (layout) => layout.i !== id,
            ),
            lowerGridLayout: state.lowerGridLayout.filter(
              (layout) => layout.i !== id,
            ),
          };
        }),

      splitGridAtID: (id: string) =>
        set((state) => {
          const index = state.upperGridLayout.findIndex(
            (layout) => layout.i === id,
          );
          const lowerGridLayoutMinY = state.upperGridLayout
            .slice(index + 1)
            .reduce((minY, layout) => {
              return Math.min(minY, layout.y);
            }, Infinity);
          return {
            ...state,
            upperGridLayout: state.upperGridLayout.slice(0, index + 1),
            lowerGridLayout: state.upperGridLayout
              .slice(index + 1)
              .map((layout) => {
                return {
                  ...layout,
                  y: layout.y - lowerGridLayoutMinY,
                };
              }),
            savedYOffset: lowerGridLayoutMinY,
          };
        }),

      updateGrid: (grid: Record<string, GridItem>) =>
        set((state) => {
          return {
            ...state,
            grid,
          };
        }),

      updateUpperGridLayout: (layout: GridItemLayout[]) =>
        set((state) => {
          return {
            ...state,
            upperGridLayout: layout.sort(compareLayoutsFn),
          };
        }),

      updateLowerGridLayout: (layout: GridItemLayout[]) =>
        set((state) => {
          return {
            ...state,
            lowerGridLayout: layout,
          };
        }),

      mergeGrids: () =>
        set((state) => {
          return {
            ...state,
            upperGridLayout: [
              ...state.upperGridLayout.sort(compareLayoutsFn),
              ...state.lowerGridLayout.sort(compareLayoutsFn).map((layout) => {
                return {
                  ...layout,
                  y: layout.y + state.savedYOffset,
                };
              }),
            ],
            lowerGridLayout: [],
          };
        }),

      updateGridItem: (id: string, newItem: Omit<GridItem, 'layout'>) =>
        set((state) => {
          const { itemW, itemH } = sizeToDimensions(newItem.size);
          return {
            ...state,
            grid: {
              ...state.grid,
              [id]: {
                ...state.grid[id],
                size: newItem.size,
                type: newItem.type,
                content: newItem.content,
              },
            },
            upperGridLayout: state.upperGridLayout.map((layout) => {
              if (layout.i === id) {
                return {
                  ...layout,
                  w: itemW,
                  h: itemH,
                };
              }
              return layout;
            }),
          };
        }),
    })),
  );
export const useGridStore = createGridStore();
export const useBadgeStore = createGridStore();
