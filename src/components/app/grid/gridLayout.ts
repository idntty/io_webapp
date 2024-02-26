import { uuidv4 } from '../../../lib/utils';

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

export const createGridItem = (size: GridItemSize): GridItem => {
  const w = ['large', 'long'].includes(size) ? 2 : 1;
  const h = ['large', 'tall'].includes(size) ? 2 : 1;

  return {
    size,
    layout: {
      i: uuidv4(),
      x: 0,
      y: 0,
      w,
      h,
    },
    content: `${w}x${h}`,
  };
};

const defaultGridItemSizes: GridItemSize[] = [
  'large',
  'tiny',
  'tall',
  'tiny',
  'long',
  'tiny',
];
export const defaultGridContent: Record<string, GridItem> =
  defaultGridItemSizes.reduce((acc, size: GridItemSize) => {
    const gridItem = createGridItem(size);
    return { ...acc, [gridItem.layout.i]: gridItem };
  }, {});

// // this function should take a 4 column layout (as in defaultGridContent)
// // and convert it to a 2 column layout by splitting each row into 1 or 2 rows
// // based on the contents of the row
// // this should be done in the following way:
// // 1. if the first item in a row is 'large' or 'long', it should be placed in the
// // first row and the rest of the items should be placed in the second row
// // 2. then if first two items in a row take in total 2 columns or less, they
// // should be placed in the first row and the rest of the items should be
// // placed in the second row
// // 3. if the first two items in a row take more than 2 columns (can only happen
// // if the first item is 'tiny or 'tall' and the second item is 'large' or 'long'),
// // the first item and the last item should be placed in the first row and the
// // second item should be placed in the second row
// export function convertTo2ColumnLayout(
//   layout: GridItemContent[],
// ): GridItemContent[] {
//   const newLayout: GridItemContent[] = [];
//   let currentY = 0; // Track the current row in the new layout

//   for (let i = 0; i < layout.length; i++) {
//     const item = layout[i];
//     const nextItem = layout[i + 1];

//     // Adjust item dimensions for 2-column layout
//     const newItem = { ...item, layout: { ...item.layout, x: 0, y: currentY } };

//     switch (item.size) {
//       case 'large':
//       case 'long':
//         // Rule 1: 'large' or 'long' items take the entire row
//         newLayout.push(newItem);
//         currentY += newItem.layout.h; // Move to the next row
//         break;
//       case 'tiny':
//       case 'tall':
//         if (nextItem) {
//           const combinedWidth = item.layout.w + nextItem.layout.w;
//           if (combinedWidth <= 2) {
//             // Rule 2: Both items fit in the first row
//             newLayout.push(newItem);
//             newLayout.push({
//               ...nextItem,
//               layout: { ...nextItem.layout, x: item.layout.w, y: currentY },
//             });
//             i++; // Skip the next item since it's already processed
//           } else {
//             // Rule 3: Place the first item and possibly the last item in the first row
//             newLayout.push(newItem);
//             // Check if there's a "last" item in the context of the original 4-column layout
//             if (layout.length > i + 2) {
//               // Place last item of the original row next to the first item in the new layout
//               const lastItem = layout[i + 2];
//               newLayout.push({
//                 ...lastItem,
//                 layout: { ...lastItem.layout, x: 1, y: currentY },
//               });
//               // Place the second item in the new row on its own
//               newLayout.push({
//                 ...nextItem,
//                 layout: { ...nextItem.layout, x: 0, y: currentY + 1 },
//               });
//               i += 2; // Skip the next two items since they're already processed
//             } else {
//               // If there's no "last" item, just prepare to place the second item in the new row
//               newLayout.push({
//                 ...nextItem,
//                 layout: { ...nextItem.layout, x: 0, y: currentY + 1 },
//               });
//               i++; // Skip the next item since it's already processed
//             }
//             currentY += 2; // Account for both rows filled by this rule
//           }
//         } else {
//           // If there's no next item, just add the current item
//           newLayout.push(newItem);
//           currentY += newItem.layout.h; // Move to the next row
//         }
//         break;
//     }
//   }

//   // Adjust the layout for 2-column display
//   return newLayout.map((item) => ({
//     ...item,
//     layout: {
//       ...item.layout,
//       w: item.size === 'large' ? 2 : 1, // Ensure width is adjusted for large items
//       h: item.layout.h, // Height remains the same
//     },
//   }));
// }
