import React from 'react';
import { useQuery } from '@tanstack/react-query';
import getAlarms from '@/api/alarm/getAlarms';
import { useMediaQuery } from 'react-responsive';
import { useLoginStore } from '@/store/login/useLoginStore';
import { useSidebarStore } from '@/store/sidebar/useSidebarStore';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { SidebarModalLayout } from '../modals/SidebarModalLayout';
import SearchModal from './modal/search/SearchModal';
import AlarmModal from './modal/alarm/AlarmModal';
import SidebarListMini from './list/SidebarListMini';
import Image from 'next/image';
import LogoMini from '../../../public/svg/sidebar/LogoMini.svg';

function SidebarMini() {
  const { isLogin, accessToken } = useAuthStore();
  const { isNotificationOpen, setIsNotificationOpen, isSearchOpen, setIsSearchOpen } =
    useSidebarStore();
  const { setIsLoginModalOpen } = useLoginStore();

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
    <div className='flex flex-col w-[50px] h-full bg-white fixed top-0 left-0 z-[100] pt-[20px]'>
      <div className='flex flex-col gap-[10px] items-center '>
        <Image src={LogoMini} width={30} height={30} alt='logo' />
        <SidebarListMini setIsLoginModalOpen={setIsLoginModalOpen} />
      </div>
      {isNotificationOpen && (
        <SidebarModalLayout
          isOpen={isNotificationOpen}
          onClose={setIsNotificationOpen}
          isMini={true}
        >
          <AlarmModal alarms={alarmData?.alarmList} />
        </SidebarModalLayout>
      )}
      {isSearchOpen && (
        <SidebarModalLayout isOpen={isSearchOpen} onClose={setIsSearchOpen} isMini={true}>
          <SearchModal />
        </SidebarModalLayout>
      )}
    </div>
  );
}

export default SidebarMini;
