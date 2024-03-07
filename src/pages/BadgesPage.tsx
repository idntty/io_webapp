import { useState } from 'react';
import { useBadgeGridStore } from '../stores/badgeGridStore';

import Header from '../components/app/Header';
import Footer from '../components/app/Footer';
import ImageBadge from '../components/app/grid/ImageBadge';
import EditItemForm from '../components/app/forms/EditItemForm';

export default function BadgesPage() {
  const [isGridSplit, setIsGridSplit] = useState(false);
  const imageBadges = useBadgeGridStore((state) => state.imageBadges);
  const upperGridBadgeIDs = useBadgeGridStore(
    (state) => state.upperGridBadgeIDs,
  );
  const lowerGridBadgeIDs = useBadgeGridStore(
    (state) => state.lowerGridBadgeIDs,
  );
  const splitGridAtID = useBadgeGridStore((state) => state.splitGridAtID);
  const mergeGrids = useBadgeGridStore((state) => state.mergeGrids);

  const handleSplitGrid = (id: string) => {
    splitGridAtID(id);
    setIsGridSplit(true);
    console.log('Splitting grid at:', id);
  };

  const handleMergeGrids = () => {
    mergeGrids();
    setIsGridSplit(false);
    console.log('Merging grids');
  };

  return (
    <div className="relative flex h-screen flex-col justify-between overflow-auto bg-gray-50">
      <Header type="badges" />
      <div className="relative mx-auto w-[482px] lg:w-[924px]">
        <div className="grid grid-cols-2 gap-[40px] py-[20px] lg:grid-cols-4">
          {upperGridBadgeIDs.map((id) => (
            <ImageBadge
              key={id}
              onInfoClick={() => handleSplitGrid(id)}
              {...imageBadges[id]}
            />
          ))}
        </div>
        {isGridSplit && (
          <div className="relative left-1/2 flex w-screen -translate-x-1/2 transform justify-center bg-white py-[20px]">
            <div className="w-[840px]">
              <EditItemForm
                // FIXME: Temporarily hardcoding the editedItemID
                editedItemID="temp"
                onCancel={handleMergeGrids}
                onSubmit={handleMergeGrids}
              />
            </div>
          </div>
        )}
        {isGridSplit && (
          <div className="grid grid-cols-2 gap-[40px] py-[20px] lg:grid-cols-4">
            {lowerGridBadgeIDs.map((id) => (
              <ImageBadge key={id} {...imageBadges[id]} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
