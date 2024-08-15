'use client';

import Header from '../../components/onboarding/Header';
import Footer from '../../components/onboarding/Footer';
import TextAndSupportingText from '../../components/onboarding/TextAndSupportingText';
import UserRegistrationForm from '../../components/onboarding/UserRegistrationForm';
import Widget from '../../components/app/grid/Widget';

import GridLayout from 'react-grid-layout';
import { useOnboardingStore } from '../../stores/onboardingStore';
import { useGridStore } from '../../stores/gridStores';

export default function PrivateData() {
  const privateData = useOnboardingStore((state) => state.privateData);

  const grid = useGridStore((state) => state.grid);
  const upperGridLayout = useGridStore((state) => state.upperGridLayout);

  console.log('privateData', Object.entries(privateData ?? {}));

  return (
    <div className="box-border flex h-screen w-screen flex-row overflow-hidden bg-white text-base">
      <div className="flex shrink-0 grow basis-0 flex-col items-center justify-between self-stretch">
        <Header />
        <main className="flex flex-col items-start self-stretch px-[32px]">
          <div className="flex w-[360px] flex-col items-center gap-[32px]">
            <TextAndSupportingText
              text="Add personal touch"
              supportingText="Infuse life into your digital identity by adding personal data. Your unique information completes the canvas, creating a true reflection of you in the digital world."
            />
            <UserRegistrationForm withErrors />
          </div>
        </main>
        <Footer />
      </div>
      <div className="relative flex flex-grow flex-col justify-between overflow-auto bg-gray-50">
        <div className="relative mx-auto w-[482px] bg-gray-100 lg:w-[924px]">
          <GridLayout
            layout={upperGridLayout}
            cols={4}
            margin={[40, 40]}
            compactType={'horizontal'}
            isResizable={false}
            isDraggable={false}
            isBounded={false}
            rowHeight={181}
            className="bg-gray-100"
          >
            {upperGridLayout.map((layout) => {
              return (
                <Widget
                  key={layout.i}
                  size={grid[layout.i].size}
                  type={grid[layout.i].type}
                  value={grid[layout.i].content}
                />
              );
            })}
          </GridLayout>
        </div>
      </div>
    </div>
  );
}
