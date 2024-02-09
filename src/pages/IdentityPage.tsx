import RGL, { WidthProvider } from 'react-grid-layout';

import Header from '../components/identity-page/Header';
import Footer from '../components/identity-page/Footer';
import Widget from '../components/identity-page/grid/Widget';
import {
  type GridItemContent,
  defaultGridContent,
} from '../components/identity-page/grid/gridLayout';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import '../components/identity-page/grid/placeholder.css';

const GridLayout = WidthProvider(RGL);

export default function IdentityPage() {
  return (
    <div className="flex h-screen flex-col justify-between bg-gray-50">
      <Header onAddClick={() => {}} />
      <div className="relative flex h-[5px] w-full items-center justify-center">
        <GridLayout
          layout={defaultGridContent.map((obj) => obj.layout)}
          cols={4}
          rowHeight={160}
          width={840}
          margin={[40, 40]}
          isResizable={false}
          className="relative left-[450px] h-full w-full self-center"
        >
          {defaultGridContent.map((item: GridItemContent) => {
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
