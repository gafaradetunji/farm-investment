'use client';

import { theme } from '@/ui/assets/styles/theme';
import { ThemeProvider } from '@mui/material';
import { PropsWithChildren } from 'react';

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};
