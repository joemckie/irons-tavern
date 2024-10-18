import { useEffect, useRef, useState } from 'react';

export function usePageLayout() {
  const navRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [navHeight, setNavHeight] = useState<number>(54);
  const [tabsHeight, setTabsHeight] = useState<number>(38);
  const mainHeightCss =
    navHeight && tabsHeight
      ? `calc(100vh - ${navHeight}px - ${tabsHeight}px)`
      : '100vh';
  const sidebarHeightCss = navHeight ? `calc(100vh - ${navHeight}px` : '100vh';

  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }
  }, [navRef]);

  useEffect(() => {
    if (tabsRef.current) {
      setTabsHeight(tabsRef.current.offsetHeight);
    }
  }, [tabsRef]);

  return {
    navRef,
    tabsRef,
    mainHeightCss,
    sidebarHeightCss,
    navHeight,
    tabsHeight,
  };
}
