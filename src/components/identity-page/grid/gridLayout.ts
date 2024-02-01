export type GridItemSize = 'tiny' | 'long' | 'tall' | 'large';
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

export const gridContent: GridItemContent[] = [
  {
    size: 'large',
    layout: { x: 0, y: 0, w: 2, h: 2, i: 'a' },
  },
  {
    size: 'tiny',
    layout: { x: 2, y: 0, w: 1, h: 1, i: 'b' },
  },
  {
    size: 'tall',
    layout: { x: 3, y: 0, w: 1, h: 2, i: 'c' },
  },
  {
    size: 'tiny',
    layout: { x: 2, y: 1, w: 1, h: 1, i: 'd' },
  },
  {
    size: 'long',
    layout: { x: 0, y: 1, w: 2, h: 1, i: 'f' },
  },
  {
    size: 'tiny',
    layout: { x: 2, y: 2, w: 1, h: 1, i: 'g' },
  },
  {
    size: 'tiny',
    layout: { x: 3, y: 2, w: 1, h: 1, i: 'h' },
  },
];
