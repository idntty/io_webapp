import RGL, { WidthProvider } from 'react-grid-layout';

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

const GridLayout = WidthProvider(RGL);

export default function RGLTest() {
  return (
    <div className="relative flex h-screen flex-col justify-between bg-gray-50">
      <Header />
      <div className="bg-brand-100 px-[300px]">
        <GridLayout
          layout={gridContent.map((obj) => obj.layout)}
          cols={4}
          margin={[40, 40]}
          isResizable={false}
          isBounded={false}
          rowHeight={181}
          className="bg-gray-100"
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
      <Footer className="sticky bottom-0" />
    </div>
  );
}
