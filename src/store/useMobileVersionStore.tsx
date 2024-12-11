'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type MobileVersionState = {
  isMobileVersion: boolean;
  setIsMobileVersion: (isMobileVersion: boolean) => void;
};

export const useMobileVersionStore = create<MobileVersionState>(
  persist(
    (set) => ({
      isMobileVersion: false,
      setIsMobileVersion: (isMobileVersion) =>
        set({
          isMobileVersion,
        }),
    }),
    {
      name: 'is_mobile_version',
    },
  ) as (set: (fn: (state: MobileVersionState) => MobileVersionState) => void) => MobileVersionState,
);
