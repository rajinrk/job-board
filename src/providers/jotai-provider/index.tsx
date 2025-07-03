'use client';

import { Provider as JotaiProvider } from 'jotai';

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  return <JotaiProvider>{children}</JotaiProvider>;
}