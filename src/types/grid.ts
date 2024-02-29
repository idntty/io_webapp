export const ITEM_SIZES = ['tiny', 'long', 'tall', 'large'] as const;
export type GridItemSize = (typeof ITEM_SIZES)[number];
export interface GridItemLayout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}
export type GridItemContent = string;
export interface GridItem {
  size: GridItemSize;
  layout: GridItemLayout;
  content: GridItemContent;
}
