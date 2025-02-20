'use client';

import { SearchBox } from '@mapbox/search-js-react';
import { SearchBoxProps } from '@mapbox/search-js-react/dist/components/SearchBox';

const MapboxSearchBox = ({ ...props }: SearchBoxProps) => {
  /* @ts-expect-error Invalid component type */
  return <SearchBox {...props} />;
};

export default MapboxSearchBox;
