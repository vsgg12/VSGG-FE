'use client';

import Image from 'next/image';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { IoPersonCircle } from 'react-icons/io5';
import writeSVG from '../../public/svg/writing.svg';
import { useState } from 'react';
import ProfileModal from '@/app/home/_component/ProfileModal';
import AlarmModal from '@/app/home/_component/AlarmModal';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import getAlarms from '@/api/getAlarms';

interface HeaderProps {
  isLogin: boolean;
}

export default function Header({ isLogin }: HeaderProps) {
  const router = useRouter();
  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const currentUrl = usePathname();
  const { accessToken, user } = useAuthStore.getState();

  const { data, isLoading } = useQuery({
    queryKey: ['alarms'],
    queryFn: () => getAlarms(accessToken),
  });

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
    router.push('/login');
  };

  const handleLogoutBtnClick = (): void => {
    // 로그아웃 기능 후 페이지는 제자리
    setIsProfileModalOpen(false);
    useAuthStore.setState({ isLogin: false, accessToken: '', refreshToken: '' });
    localStorage.clear();
    return;
  };

  const handleGoPostBtnClick = (): void => {
    if (!isLogin) {
      router.push('/login');
      return;
    }
    router.push('/post/write');
  };

  return (
    <>
      <div className='p-right-20 absolute right-10 top-10 flex flex-row items-center justify-end'>
        <div className='flex flex-row items-center gap-6'>
          {!isLoading && isLogin ? (
            <>
              <div className='hd-items cursor-pointer' onClick={handleGoPostBtnClick}>
                {currentUrl !== '/post/write' && (
                  <Image className='h-[32px] w-[32px]' src={writeSVG} alt='writeIcon' />
                )}
              </div>

              <button
                className={`hd-items cursor-pointer ${isAlarmModalOpen && 'rounded-full bg-white'}`}
                onClick={handleAlarmBtnClick}
              >
                <IoMdNotificationsOutline />
                <span
                  className={`text-[#8A1F21] text-[11px] font-medium w-[20px] h-[12px] p-0 m-0 bg-white ${(data?.alarmList.length === undefined || data?.alarmList.length === 0) && 'invisible'}`}
                  style={{ position: 'absolute', transform: 'translate(-50%,-190%)' }}
                >
                  {data && data.alarmList.length > 99 ? '99+' : `${data?.alarmList.length}`}
                </span>
              </button>
              {isAlarmModalOpen && <AlarmModal alarms={data?.alarmList} />}

              <button
                className={`hd-items flex items-center justify-center overflow-hidden rounded-full ${isProfileModalOpen && 'rounded-full bg-white'}`}
                onClick={handleProfileBtnClick}
              >
                <IoPersonCircle className='h-[2.2rem] w-[2.2rem]' />
              </button>
              {isProfileModalOpen && user && (
                <ProfileModal
                  handleLogoutClick={handleLogoutBtnClick}
                  email={user.email}
                  profileImage={user.profile_image}
                  nickname={user.nickname}
                />
              )}
            </>
          ) : (
            !isLoading && (
              <>
                <button
                  className='mr-[1rem] rounded-[150px] border-2 border-[#8A1F21] px-[30px] py-[5px] text-[#8A1F21]'
                  onClick={handleLoginBtnClick}
                >
                  로그인
                </button>
              </>
            )
          )}
        </div>
      </div>
    </>
  );
}
