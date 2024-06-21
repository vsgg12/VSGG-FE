'use client';

import Image from 'next/image';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { IoPersonCircle } from 'react-icons/io5';
import writeSVG from '../../public/svg/writing.svg';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ProfileModal from '@/app/home/_component/ProfileModal';
import AlarmModal from '@/app/home/_component/AlarmModal';

export default function Header() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  const handleAlarmBtnClick = (): void => {
    if (isProfileModalOpen) {
      setIsProfileModalOpen(false);
    }
    setIsAlarmModalOpen(!isAlarmModalOpen);
  };

  const handleProfileBtnClick = (): void => {
    if (isAlarmModalOpen) {
      setIsAlarmModalOpen(false);
    }
    setIsProfileModalOpen(!isProfileModalOpen);
  };

  const handleLoginBtnClick = (): void => {
    setIsLogin(true);
  };

  const handleLogoutBtnClick = (): void => {
    // 로그아웃 기능 후 페이지는 제자리
    setIsProfileModalOpen(false);
    setIsLogin(false);
    return;
  };

  const handleGoPostBtnClick = (): void => {
    isLogin && router.push('/post/write');
  };

  return (
    <>
      <div className='p-right-20 absolute right-10 top-10 flex flex-row items-center justify-end'>
        <div className='flex flex-row items-center gap-6'>
          {isLogin ? (
            <>
              <div className='hd-items cursor-pointer'>
                <Image
                  className='h-[32px] w-[32px]'
                  src={writeSVG}
                  alt='writeIcon'
                  onClick={handleGoPostBtnClick}
                />
              </div>

              <button
                className={`hd-items cursor-pointer ${isAlarmModalOpen && 'rounded-full bg-white'}`}
                onClick={handleAlarmBtnClick}
              >
                <IoMdNotificationsOutline />
                <span
                  className='text-[#8A1F21] text-[11px] font-medium w-[20px] h-[12px] p-0 m-0 bg-white'
                  style={{ position: 'absolute', transform: 'translate(-50%,-190%)' }}
                >
                  99+
                </span>
              </button>
              {isAlarmModalOpen && <AlarmModal />}

              <button
                className={`hd-items flex items-center justify-center overflow-hidden rounded-full ${isProfileModalOpen && 'rounded-full bg-white'}`}
                onClick={handleProfileBtnClick}
              >
                <IoPersonCircle className='h-[2.2rem] w-[2.2rem]' />
              </button>
              {isProfileModalOpen && <ProfileModal handleLogoutClick={handleLogoutBtnClick} />}
            </>
          ) : (
            <>
              <button
                className='mr-[1rem] rounded-[150px] border-2 border-[#8A1F21] px-[30px] py-[5px] text-[#8A1F21]'
                onClick={handleLoginBtnClick}
              >
                로그인
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
