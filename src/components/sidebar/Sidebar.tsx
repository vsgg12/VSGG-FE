'use client';

import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Logo from '../Logo';
import HorizontalBannerSwiper from './banner/HorizontalBannerSwiper';
import SidebarList from './list/SidebarList';
import ModalLayout from '../modals/ModalLayout';
import AlertLoginModal from '../modals/AlertLoginModal';
import ProfileInfo from './footer/ProfileInfo';
import DarkMode from './footer/DarkMode';
import AdditionalOption from './footer/AdditionalOption';

function Sidebar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  if (isMobile) {
    return null;
  }
  return (
    <div className='min-w-[260px] h-full bg-white flex flex-col justify-between fixed z-[100] py-[41px]'>
      <div className='w-full flex justify-center'>
        <Logo />
      </div>
      <div className='flex flex-col gap-[50px]'>
        <div className='flex flex-col gap-[10px]'>
          <SidebarList setIsLoginModalOpen={setIsLoginModalOpen} />
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
          <AdditionalOption />
        </div>
      </div>
      {isLoginModalOpen && (
        <ModalLayout setIsModalOpen={setIsLoginModalOpen}>
          <AlertLoginModal />
        </ModalLayout>
      )}
    </div>
  );
}

export default Sidebar;
