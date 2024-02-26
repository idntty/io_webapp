import { create } from 'zustand';
import {
  defaultGridContent,
  type GridItem,
} from '../components/app/grid/gridLayout';

export interface GridState {
  grid: Record<string, GridItem>;
  upperGridIDs: string[];
  lowerGridIDs: string[];

  addGridItem: (item: GridItem) => void;
  removeGridItem: (id: string) => void;
  splitGridAtID: (id: string) => void;
  mergeGrids: () => void;
}

export const useGridStore = create<GridState>()((set) => ({
  grid: {},
  upperGridIDs: [],
  lowerGridIDs: [],

  addGridItem: (item: GridItem) =>
    set((state) => {
      return {
        ...state,
        grid: { ...state.grid, [item.layout.i]: item },
        upperGridIDs: [item.layout.i, ...state.upperGridIDs],
      };
    }),

  removeGridItem: (id: string) =>
    set((state) => {
      const { [id]: _, ...restOfGrid } = state.grid;
      return {
        ...state,
        grid: restOfGrid,
        upperGridIDs: state.upperGridIDs.filter((gridId) => gridId !== id),
      };
    }),

  splitGridAtID: (id: string) =>
    set((state) => {
      const index = state.upperGridIDs.indexOf(id);
      if (index === -1) return state;

      return {
        ...state,
        upperGridIDs: state.upperGridIDs.slice(0, index + 1),
        lowerGridIDs: [
          ...state.lowerGridIDs,
          ...state.upperGridIDs.slice(index + 1),
        ],
      };
    }),

  mergeGrids: () =>
    set((state) => {
      return {
        ...state,
        upperGridIDs: [...state.upperGridIDs, ...state.lowerGridIDs],
        lowerGridIDs: [],
      };
    }),
}));
