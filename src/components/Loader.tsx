import React from 'react';
import { TailSpin } from 'react-loading-icons';

interface Props {
  opacity?: boolean;
}

export default function Loader({ opacity }: Props): JSX.Element {
  return (
    <div className={`loader ${(opacity ?? true) && 'opacity'}`}>
      <div className="icons">
        <TailSpin strokeOpacity={1} speed={2.5} />
      </div>
    </div>
  );
}
