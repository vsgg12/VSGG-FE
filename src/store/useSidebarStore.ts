'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type RouteType = 'HOME' | 'SEARCH' | 'WRITE' | 'PROFILE' | 'NOTIFICATION';

type SideBarStatusType = {
  route: RouteType;
  isSearchOpen: boolean;
  isNotificationOpen: boolean;
  isDarkMode: boolean;
  isAdditionalOptionOpen: boolean;
  setRouteState: (route: RouteType) => void;
  setIsSearchOpen: (isSearchOpen: boolean) => void;
  setIsNotificationOpen: (isNotificationOpen: boolean) => void;
  setIsDarkMode: (isDarkMode: boolean) => void;
  setIsAdditionalOptionOpen: (isAdditionalOptionOpen: boolean) => void;
};

export const useSidebarStore = create<SideBarStatusType>(
  persist(
    (set) => ({
      route: 'HOME',
      isSearchOpen: false,
      isNotificationOpen: false,
      isDarkMode: false,
      isAdditionalOptionOpen: false,
      setRouteState: (route) => set({ route }),
      setIsSearchOpen: (isSearchOpen) => set({ isSearchOpen }),
      setIsNotificationOpen: (isNotificationOpen) => set({ isNotificationOpen }),
      setIsDarkMode: (isDarkMode) => set({ isDarkMode }),
      setIsAdditionalOptionOpen: (isAdditionalOptionOpen) => set({ isAdditionalOptionOpen }),
    }),
    {
      name: 'sidebar-storage',
    },
  ) as (set: (fn: (state: SideBarStatusType) => SideBarStatusType) => void) => SideBarStatusType,
);
