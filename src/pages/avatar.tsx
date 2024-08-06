'use client';

import { generateSVGAvatar } from '../lib/avatar';

export default function Avatar() {
  return (
    <div className="mx-auto py-10">
      <img
        src={generateSVGAvatar(
          '19b3e079eca717018f5844b25ca7435fb5bf10d2197ab941ea89cd1d25705c1a',
        )}
        alt="Avatar"
      />
    </div>
  );
}
