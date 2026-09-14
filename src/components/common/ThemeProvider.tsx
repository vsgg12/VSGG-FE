'use client';

import { PropsWithChildren, useEffect } from 'react';
import { useSidebarStore } from '@/store/sidebar/useSidebarStore';

function ThemeProvider({ children }: PropsWithChildren) {
  const isDarkMode = useSidebarStore((state) => state.isDarkMode);

  useEffect(() => {
    document.documentElement.dataset.theme = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  return children;
}

export default ThemeProvider;
