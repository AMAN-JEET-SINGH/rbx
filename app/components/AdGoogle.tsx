'use client';

import { useEffect, useRef } from 'react';

interface AdGoogleProps {
  slotId: string;
  size?: 'small' | 'medium' | 'large';
}

const sizeMaps = {
  small: { width: 250, height: 250 },
  medium: { width: 300, height: 300 },
  large: { width: 336, height: 280 },
};

export default function AdGoogle({ slotId, size = 'medium' }: AdGoogleProps) {
  const adPushed = useRef(false);
  const { width, height } = sizeMaps[size];

  useEffect(() => {
    if (adPushed.current) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      adPushed.current = true;
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div className="flex justify-center">
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width,
          height,
        }}
        data-ad-client="ca-pub-7607041782027842"
        data-ad-slot={slotId}
        data-ad-format="rectangle"
        data-ad-test="on"
        data-full-width-responsive="true"
      />
    </div>
  );
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}