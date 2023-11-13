import React from 'react';
import { TailSpin } from 'react-loading-icons';

export default function Loader(): JSX.Element {
  return (
    <div className="loader">
      <div className="icons">
        <TailSpin strokeOpacity={1} speed={2.5} />
      </div>
    </div>
  );
}
