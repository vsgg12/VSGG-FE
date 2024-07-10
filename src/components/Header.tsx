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

export default function Header() {
  const router = useRouter();
  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const currentUrl = usePathname();
  const { accessToken, user, isLogin } = useAuthStore.getState();

  const { data, isLoading } = useQuery({
    queryKey: ['alarms'],
    queryFn: () => {
      if (isLogin) {
        return getAlarms(accessToken);
      } else {
        return Promise.resolve(null);
      }
    },
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
              <div
                className='group/write hd-items cursor-pointer relative'
                onClick={handleGoPostBtnClick}
              >
                {currentUrl !== '/post/write' && (
                  <Image
                    className='h-[32px] w-[32px]'
                    src={writeSVG}
                    alt='writeIcon'
                    width={32}
                    height={32}
                  />
                )}
                <span className='absolute top-[50px] left-[-3px] flex justify-center items-center h-[23px] text-[12px] font-medium bg-white text-[#828282] rounded-[5px] p-[4px] whitespace-nowrap invisible group-hover/write:visible'>
                  글쓰기
                </span>
              </div>

              <button
                className={`relative group/alarm hd-items cursor-pointer ${isAlarmModalOpen && 'rounded-full bg-white'}`}
                onClick={handleAlarmBtnClick}
              >
                <IoMdNotificationsOutline />
                <span
                  className={`text-[#8A1F21] text-[11px] font-medium flex flex-col items-center justify-center w-[20px] h-[12px] p-0 m-0 bg-white ${(data?.alarmList.length === undefined || data?.alarmList.length === 0) && 'invisible'}`}
                  style={{ position: 'absolute', transform: 'translate(6.5px,-22px)' }}
                >
                  {data && data.alarmList.length > 99 ? '99+' : `${data?.alarmList.length}`}
                </span>
                <span className='absolute top-[50px]  flex justify-center items-center h-[23px] text-[12px] font-medium bg-white text-[#828282] rounded-[5px] p-[4px] whitespace-nowrap invisible group-hover/alarm:visible'>
                  알림
                </span>
              </button>
              {isAlarmModalOpen && <AlarmModal alarms={data?.alarmList} />}

              <button
                className={`relative group/profile hd-items flex items-center justify-center  rounded-full ${isProfileModalOpen && 'rounded-full bg-white'}`}
                onClick={handleProfileBtnClick}
              >
                <IoPersonCircle className='h-[2.2rem] w-[2.2rem]' />
                <span className='absolute top-[50px] left-[-3px] flex justify-center items-center h-[23px] text-[12px] font-medium bg-white text-[#828282] rounded-[5px] p-[4px] whitespace-nowrap invisible group-hover/profile:visible'>
                  프로필
                </span>
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
            !isLoading &&
            !isLogin && (
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
