'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSidebarStore } from '@/store/sidebar/useSidebarStore';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { sidebarListType } from '@/components/sidebar/list/SidebarList';
import HomeIcon from '@/components/sidebar/list/iconComponent/HomeIcon';
import SearchIcon from '@/components/sidebar/list/iconComponent/SearchIcon';
import PostWriteIcon from '@/components/sidebar/list/iconComponent/PostWriteIcon';
import ProfileIcon from '@/components/sidebar/list/iconComponent/ProfileIcon';
import NotificationIcon from '@/components/sidebar/list/iconComponent/NotificationIcon';

interface UseSidebarItemProps {
  item: sidebarListType;
  setIsLoginModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const useSidebarItem = ({ item, setIsLoginModalOpen }: UseSidebarItemProps) => {
  const {
    setRouteState,
    setIsNotificationOpen,
    setIsSearchOpen,
    route: routeName,
    isNotificationOpen,
    isSearchOpen,
  } = useSidebarStore();
  const { isLogin } = useAuthStore();
  const route = useRouter();

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const result = (() => {
      switch (item) {
        case '홈':
          return routeName !== 'HOME';
        case '검색':
          return !isSearchOpen;
        case '글 작성':
          return routeName !== 'WRITE';
        case '마이페이지':
          return routeName !== 'PROFILE';
        case '알림':
          return !isNotificationOpen;
        default:
          return true;
      }
    })();
    setDisabled(result);
  }, [routeName, isSearchOpen, isNotificationOpen, item]);

  const getIcon = (): JSX.Element => {
    switch (item) {
      case '홈':
        return <HomeIcon disabled={disabled} />;
      case '검색':
        return <SearchIcon disabled={disabled} />;
      case '글 작성':
        return <PostWriteIcon disabled={disabled} />;
      case '마이페이지':
        return <ProfileIcon disabled={disabled} />;
      case '알림':
        return <NotificationIcon disabled={disabled} />;
      default:
        return <></>;
    }
  };

  const closeModal = () => {
    if (isNotificationOpen) setIsNotificationOpen(false);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const handleClick = () => {
    switch (item) {
      case '홈':
        setRouteState('HOME');
        route.push('/home');
        closeModal();
        break;
      case '검색':
        setIsSearchOpen(!isSearchOpen);
        setIsNotificationOpen(false);
        break;
      case '글 작성':
        if (!isLogin) return setIsLoginModalOpen(true);
        setRouteState('WRITE');
        route.push('/post/write');
        closeModal();
        break;
      case '마이페이지':
        if (!isLogin) return setIsLoginModalOpen(true);
        setRouteState('PROFILE');
        route.push('/myPage');
        closeModal();
        break;
      case '알림':
        if (!isLogin) return setIsLoginModalOpen(true);
        setIsNotificationOpen(!isNotificationOpen);
        setIsSearchOpen(false);
        break;
    }
  };

  return { getIcon, handleClick, disabled };
};
