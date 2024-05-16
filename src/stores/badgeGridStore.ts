// TODO: Remove unused

import { create } from 'zustand';
import { ImageBadgeType } from '../components/app/grid/ImageBadge';
import { defaultBadges } from '../components/app/grid/badgeLayout';
import { uuidv4 } from '../lib/utils';

export interface BadgeGridState {
  imageBadges: Record<string, ImageBadgeType>;
  upperGridBadgeIDs: string[];
  lowerGridBadgeIDs: string[];

  addImageBadge: (imageBadge: ImageBadgeType) => void;
  removeImageBadge: (id: string) => void;
  splitGridAtID: (id: string) => void;
  mergeGrids: () => void;
}

export const useBadgeGridStore = create<BadgeGridState>()((set) => ({
  imageBadges: defaultBadges,
  upperGridBadgeIDs: Object.keys(defaultBadges),
  lowerGridBadgeIDs: [],

  addImageBadge: (imageBadge: ImageBadgeType) =>
    set((state) => {
      const id = uuidv4();
      return {
        ...state,
        imageBadges: { ...state.imageBadges, [id]: imageBadge },
        upperGridBadgeIDs: [...state.upperGridBadgeIDs, id],
      };
    }),

  removeImageBadge: (id: string) =>
    set((state) => {
      const { [id]: _, ...restOfBadges } = state.imageBadges;
      return {
        ...state,
        imageBadges: restOfBadges,
        upperGridBadgeIDs: state.upperGridBadgeIDs.filter(
          (badgeId) => badgeId !== id,
        ),
      };
    }),

  splitGridAtID: (id: string) =>
    set((state) => {
      const index = state.upperGridBadgeIDs.indexOf(id);
      if (index === -1) return state;

      return {
        ...state,
        upperGridBadgeIDs: state.upperGridBadgeIDs.slice(0, index + 1),
        lowerGridBadgeIDs: [
          ...state.lowerGridBadgeIDs,
          ...state.upperGridBadgeIDs.slice(index + 1),
        ],
      };
    }),

  mergeGrids: () =>
    set((state) => ({
      ...state,
      upperGridBadgeIDs: [
        ...state.upperGridBadgeIDs,
        ...state.lowerGridBadgeIDs,
      ],
      lowerGridBadgeIDs: [],
    })),
}));
