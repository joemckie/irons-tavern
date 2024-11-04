'use client';

import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

export function usePageLayout() {
  const navRef = useRef<HTMLElement>(null);
  const [navHeight, setNavHeight] = useState<number>(54);
  const mainHeightCss = navHeight ? `calc(100vh - ${navHeight}px)` : '100vh';
  const isMediumViewport = useMediaQuery('min-width: 768px');

  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }
  }, [navRef]);

  return {
    navRef,
    mainHeightCss: isMediumViewport ? mainHeightCss : undefined,
    navHeight: isMediumViewport ? navHeight : 54,
  };
}
