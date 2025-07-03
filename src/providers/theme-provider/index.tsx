'use client';

import * as React from 'react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

const theme = createTheme();

export function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
