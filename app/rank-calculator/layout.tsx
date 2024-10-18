'use client';

import '@radix-ui/themes/styles.css';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Flex, Grid, TabNav, Theme, ThemePanel } from '@radix-ui/themes';
import { AchievementDiaryMap } from '@/types/rank-calculator';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sidebar } from './components/sidebar';
import { Navigation } from './components/navigation';

interface FormData {
  achievementDiaries: AchievementDiaryMap;
  collectionLogCount: number;
  playerName: string;
  items: Record<string, boolean>;
}

export default function RankCalculatorLayout({ children }: PropsWithChildren) {
  const methods = useForm<FormData>({
    defaultValues: {
      achievementDiaries: {},
      collectionLogCount: 0,
      items: {},
    },
  });

  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [navHeight, setNavHeight] = useState<number>(54);
  const [tabsHeight, setTabsHeight] = useState<number>(38);
  const pageHeightCss = navHeight
    ? `calc(100vh - ${navHeight}px - ${tabsHeight}px)`
    : '100vh';

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

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <Theme
      accentColor="iris"
      appearance="dark"
      panelBackground="solid"
      scaling="95%"
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid
            areas="
              'nav nav'
              'sidebar tabs'
              '. main'
            "
            columns="[sidebar] minmax(200px, 1fr) [main] minmax(0, 3fr)"
            rows={`${navHeight}px ${tabsHeight}px 1fr`}
          >
            <Navigation ref={navRef} />
            <Sidebar />
            <Flex
              justify="center"
              gridArea="tabs"
              direction="column"
              ref={tabsRef}
            >
              <TabNav.Root>
                <TabNav.Link active={pathname === '/rank-calculator'} asChild>
                  <Link href="/rank-calculator">Overview</Link>
                </TabNav.Link>
                <TabNav.Link
                  active={pathname === '/rank-calculator/notable-items'}
                  asChild
                >
                  <Link href="/rank-calculator/notable-items">
                    Notable items
                  </Link>
                </TabNav.Link>
              </TabNav.Root>
            </Flex>
            <Flex gridArea="main" height={pageHeightCss}>
              {children}
            </Flex>
          </Grid>
        </form>
      </FormProvider>
      <ThemePanel defaultOpen={false} />
    </Theme>
  );
}
