import React, { useEffect, useState } from 'react';

interface LazyBackgroundProps {
  src: string;
  className: string;
}

function LazyBackground({ src, ...props }: LazyBackgroundProps) {
  const [source, setSource] = useState(src);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setSource(src);
    };
  }, [src]);

  return (
    <div
      className={props.className}
      style={{ backgroundImage: `url(${source})` }}
    ></div>
  );
}
export default LazyBackground;
