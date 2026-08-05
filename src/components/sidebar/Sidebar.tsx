'use client';

import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Logo from '../Logo';
import HorizontalBannerSwiper from './banner/HorizontalBannerSwiper';
import SidebarList from './list/SidebarList';
import ProfileInfo from './footer/ProfileInfo';
import DarkMode from './footer/DarkMode';
import AdditionalOption from './footer/AdditionalOption';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import getAlarms from '@/api/alarm/getAlarms';
import AlarmModal from './modal/alarm/AlarmModal';
import AdditionalOptionModal from './modal/additionalOption/AdditionalOptionModal';
import { useSidebarStore } from '@/store/sidebar/useSidebarStore';
import { SidebarModalLayout } from '../modals/SidebarModalLayout';
import SearchModal from './modal/search/SearchModal';

function Sidebar() {
  const [isAdditionalModalOpen, setIsAdditionalModalOpen] = useState<boolean>(false);
  const { isLogin, accessToken } = useAuthStore();
  const { isNotificationOpen, setIsNotificationOpen, isSearchOpen, setIsSearchOpen } =
    useSidebarStore();

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const { data: alarmData } = useQuery({
    queryKey: ['alarms'],
    queryFn: () => getAlarms(accessToken),
    enabled: isLogin,
  });

  if (isMobile) {
    return null;
  }

  return (
    <div className='fixed left-0 top-0 z-[100] flex h-screen min-w-[260px] flex-col justify-between bg-semantic-background-surface py-[41px] text-semantic-text-secondary'>
      <div className='w-full flex justify-center'>
        <Logo />
      </div>
      <div className='flex flex-col gap-[50px]'>
        <div className='flex flex-col gap-[10px]'>
          <SidebarList />
        </div>
        <div className='flex w-full justify-center'>
          <div className='w-[206px]'>
            <HorizontalBannerSwiper />
          </div>
        </div>
      </div>
      <div className='flex flex-col w-full items-center justify-center gap-[20px]'>
        <ProfileInfo />
        <div className='flex gap-[5px]'>
          <DarkMode />
          <AdditionalOption
            setIsAdditionalModalOpen={setIsAdditionalModalOpen}
            isAddtionalModalOpen={isAdditionalModalOpen}
          />
        </div>
      </div>
      {isNotificationOpen && (
        <SidebarModalLayout isOpen={isNotificationOpen} onClose={setIsNotificationOpen}>
          <AlarmModal alarms={alarmData?.alarmList} />
        </SidebarModalLayout>
      )}
      {isAdditionalModalOpen && (
        <div className='absolute translate-x-[270px] bottom-0 -translate-y-[40px]'>
          <AdditionalOptionModal />
        </div>
      )}
      {isSearchOpen && (
        <SidebarModalLayout isOpen={isSearchOpen} onClose={setIsSearchOpen}>
          <SearchModal />
        </SidebarModalLayout>
      )}
    </div>
  );
}

export default Sidebar;
