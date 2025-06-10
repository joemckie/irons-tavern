import { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import Providers from '@/app/providers';

function AllTheProviders({ children }: { children: ReactNode }) {
  return <Providers>{children}</Providers>;
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
