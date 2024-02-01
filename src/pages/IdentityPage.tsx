import GridLayout from 'react-grid-layout';

import Header from '../components/identity-page/Header';
import Footer from '../components/identity-page/Footer';
import Widget from '../components/identity-page/grid/Widget';
import {
  type GridItemContent,
  gridContent,
} from '../components/identity-page/grid/gridLayout';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import '../components/identity-page/grid/placeholder.css';

export default function IdentityPage() {
  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <Header />
      <div className="relative flex h-full w-full items-center justify-center">
        <GridLayout
          layout={gridContent.map((obj) => obj.layout)}
          cols={4}
          rowHeight={160}
          width={840}
          margin={[40, 40]}
          isResizable={false}
          className="relative left-[450px] h-full w-full self-center"
        >
          {gridContent.map((item: GridItemContent) => {
            return (
              <Widget
                key={item.layout.i}
                size={item.size}
                variant="placeholder"
              />
            );
          })}
        </GridLayout>
      </div>
      <Footer />
    </div>
  );
}
