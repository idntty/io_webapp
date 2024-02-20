import { uuidv4 } from '../../../lib/utils';

import { ImageBadgeType } from './ImageBadge';

export const defaultBadges: Record<string, ImageBadgeType> = Array.from({
  length: 10,
}).reduce(
  (acc: Record<string, ImageBadgeType>, _, i) => {
    return {
      ...acc,
      [uuidv4()]: {
        imgURL: `badges/${i + 1}.png`,
      },
    };
  },
  {} as Record<string, ImageBadgeType>,
);
