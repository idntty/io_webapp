import { uuidv4 } from '../../../lib/utils';

export const ITEM_SIZES = ['tiny', 'long', 'tall', 'large'] as const;
export type GridItemSize = (typeof ITEM_SIZES)[number];
export interface ItemLayout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
}
export interface GridItemContent {
  size: GridItemSize;
  layout: ItemLayout;
}

export const defaultGridContent: GridItemContent[] = [
  {
    size: 'large',
    layout: { x: 0, y: 0, w: 2, h: 2, i: uuidv4() },
  },
  {
    size: 'tiny',
    layout: { x: 2, y: 0, w: 1, h: 1, i: uuidv4() },
  },
  {
    size: 'tall',
    layout: { x: 3, y: 0, w: 1, h: 2, i: uuidv4() },
  },
  {
    size: 'tiny',
    layout: { x: 2, y: 1, w: 1, h: 1, i: uuidv4() },
  },
  {
    size: 'long',
    layout: { x: 0, y: 2, w: 2, h: 1, i: uuidv4() },
  },
  {
    size: 'tiny',
    layout: { x: 2, y: 2, w: 1, h: 1, i: uuidv4() },
  },
];
