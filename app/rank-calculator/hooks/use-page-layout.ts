'use client';

import { useEffect, useRef, useState } from 'react';

export function usePageLayout() {
  const navRef = useRef<HTMLElement>(null);
  const [navHeight, setNavHeight] = useState<number>(54);
  const mainHeightCss = navHeight ? `calc(100vh - ${navHeight}px)` : '100vh';

  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }
  }, [navRef]);

  return {
    navRef,
    mainHeightCss,
    navHeight,
  };
}
