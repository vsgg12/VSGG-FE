import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { sidebarListType } from './SidebarList';
import HomeIcon from './iconComponent/HomeIcon';
import SearchIcon from './iconComponent/SearchIcon';
import PostWriteIcon from './iconComponent/PostWriteIcon';
import ProfileIcon from './iconComponent/ProfileIcon';
import NotificationIcon from './iconComponent/NotificationIcon';
import { useRouter } from 'next/navigation';
import { useSidebarStore } from '@/store/useSidebarStore';
import { useAuthStore } from '@/app/login/store/useAuthStore';

interface Props {
  item: sidebarListType;
  setIsLoginModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsAlarmModalOpen: Dispatch<SetStateAction<boolean>>;
}

function SidebarItem({ item, setIsLoginModalOpen, setIsAlarmModalOpen }: Props) {
  const {
    setRouteState,
    setIsNotificationOpen,
    setIsSearchOpen,
    route: routeName,
    isNotificationOpen,
    isSearchOpen,
  } = useSidebarStore();
  const route = useRouter();
  const { isLogin } = useAuthStore();
  const [disabled, setDisabled] = useState<boolean>(true);

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
  }, [isNotificationOpen, isSearchOpen, item, routeName]);

  const getIcon = (item: sidebarListType): JSX.Element => {
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
  const handleHomeClick = () => {
    setRouteState('HOME');
    route.replace('/home');
  };

  const handleSearchClick = () => {
    isSearchOpen ? setIsSearchOpen(false) : setIsSearchOpen(true);
  };

  const handleWriteClick = () => {
    if (!isLogin) {
      return setIsLoginModalOpen(true);
    }
    setRouteState('WRITE');
    route.replace('/post/write');
  };

  const handleProfileClick = () => {
    if (!isLogin) {
      return setIsLoginModalOpen(true);
    }
    setRouteState('PROFILE');
    route.replace('/myPage');
  };

  const handleNotificationClick = () => {
    if (!isLogin) {
      return setIsLoginModalOpen(true);
    }
    isNotificationOpen ? setIsNotificationOpen(false) : setIsNotificationOpen(true);
    setIsAlarmModalOpen((prev) => !prev);
  };

  const handleClick = () => {
    switch (item) {
      case '홈':
        handleHomeClick();
        break;
      case '검색':
        handleSearchClick();
        break;
      case '글 작성':
        handleWriteClick();
        break;
      case '마이페이지':
        handleProfileClick();
        break;
      case '알림':
        handleNotificationClick();
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`
      flex gap-[40px] items-center pl-[40px] w-[80%] h-[50px] cursor-pointer
      transition-transform duration-200 ease-in-out
      
      ${!disabled ? 'border-l-[4px] border-l-[#8A1F21]' : 'hover:translate-x-[15px]'}
    `}
      onClick={handleClick}
    >
      {getIcon(item)}
      <span style={{ color: disabled ? '#888888' : '#8A1F21' }}>{item}</span>
    </div>
  );
}

export default SidebarItem;
