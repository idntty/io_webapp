import { create } from 'zustand';
import type {
  GridItem,
  GridItemLayout,
} from '../components/app/grid/gridLayout';

const compareLayoutsFn = (a: GridItemLayout, b: GridItemLayout) => {
  if (a.y === b.y) {
    return a.x - b.x;
  }
  return a.y - b.y;
};

export interface GridState {
  grid: Record<string, GridItem>;
  upperGridLayout: GridItemLayout[];
  lowerGridLayout: GridItemLayout[];
  savedYOffset: number;

  addGridItem: (item: GridItem) => void;
  removeGridItem: (id: string) => void;
  splitGridAtID: (id: string) => void;
  updateUpperGridLayout: (layout: GridItemLayout[]) => void;
  updateLowerGridLayout: (layout: GridItemLayout[]) => void;
  mergeGrids: () => void;
}

export const useGridStore = create<GridState>()((set) => ({
  grid: {},
  upperGridLayout: [],
  lowerGridLayout: [],
  savedYOffset: 0,

  addGridItem: (item: GridItem) =>
    set((state) => {
      return {
        ...state,
        grid: { ...state.grid, [item.layout.i]: item },
        upperGridLayout: [item.layout, ...state.upperGridLayout].sort(
          compareLayoutsFn,
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
}));
