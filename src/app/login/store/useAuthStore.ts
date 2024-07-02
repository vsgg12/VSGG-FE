'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type LoginState = {
  isLogin: boolean;
  accessToken: string;
  refreshToken: string;
  setLoginState: (isLogin: boolean, accessToken: string, refreshToken: string) => void;
};

export const useAuthStore = create<LoginState>(
  persist(
    (set) => ({
      isLogin: false,
      accessToken: '',
      refreshToken: '',
      setLoginState: (isLogin, accessToken, refreshToken) =>
        set({
          isLogin,
          accessToken,
          refreshToken,
        }),
    }),
    {
      name: 'login-storage',
    },
  ) as (set: (fn: (state: LoginState) => LoginState) => void) => LoginState,
);
