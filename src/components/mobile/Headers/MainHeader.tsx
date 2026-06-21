'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useQuery } from '@tanstack/react-query';
import getMyProfileDTO from '@/api/profile/getMyProfileDTO';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import getAlarms from '@/api/alarm/getAlarms';

function MainHeader() {
  const router = useRouter();
  const { accessToken, user: userInfo, isLogin } = useAuthStore.getState();
  const [noReadAlarms, setNoReadAlarms] = useState<number>(0);

  const { data: userProfileData } = useQuery({
    queryKey: ['MY_PROFILE_INFO'],
    queryFn: () => getMyProfileDTO(accessToken),
    enabled: isLogin,
  });

  useEffect(() => {
    if (userProfileData && userInfo) {
      const newUser = {
        nickname: userProfileData.memberProfileDTO.nickName,
        profile_image: userProfileData.memberProfileDTO.profileUrl,
        email: userInfo.email,
        socialLoginType: userInfo.socialLoginType,
        tier: userProfileData.memberProfileDTO.tier,
      };

      if (
        userInfo.nickname !== newUser.nickname ||
        userInfo.profile_image !== newUser.profile_image ||
        userInfo.tier !== newUser.tier
      ) {
        useAuthStore.setState({ user: newUser });
      }
    }
  }, [userProfileData, userInfo]);

  const { data } = useQuery({
    queryKey: ['alarms'],
    queryFn: () => getAlarms(accessToken),
    enabled: isLogin,
  });

  useEffect(() => {
    if (data) {
      setNoReadAlarms(data.alarmList.filter((alarm) => alarm.isRead === false).length);
    }
  }, [data]);

  const handleAlarmBtnClick = (): void => {
    router.push('/alert/mobile');
  };

  const handleProfileBtnClick = (): void => {
    // router.push('/myPage');
    router.push('/setting/mobile');
  };

  const handleLoginBtnClick = (): void => {
    router.push('/login');
  };

  return (
    <div className='flex gap-[10px] h-[80px] px-[20px] items-center justify-between mobile-layout sticky top-0 z-[40] !bg-[#F8F9FA]'>
      {/* 라이트모드용 로고: 기본적으로 보이고, 다크모드(.dark)에서는 숨김 */}
      <img
        src='/logo/horizontal/logo-horizontal-red.svg'
        alt='VS.GG'
        className={`block w-auto h-[26px] dark:block mt-[2px]`}
      />
      {/* 다크모드용 로고: 기본적으로 숨기고, 다크모드(.dark)에서만 보임 */}
      <img
        src='/logo/horizontal/logo-horizontal-red.svg'
        alt='VS.GG'
        className={`hidden w-auto h-[26px] dark:hidden mt-[2px]`}
      />
      {isLogin ? (
        <div className='flex'>
          <button
            className={`relative group/alarm hd-items cursor-pointer `}
            onClick={handleAlarmBtnClick}
          >
            <IoMdNotificationsOutline />
            <span
              className={`text-[#E20A29] text-[12px] font-bold flex flex-col relative items-center justify-center  w-[20px] h-[12px] p-0 m-0  ${(noReadAlarms === undefined || noReadAlarms === 0) && 'invisible'}`}
              style={{
                position: 'absolute',
                transform: 'translate(5.5px,-22px)',
              }}
            >
              {data && noReadAlarms > 99 ? '99+' : `${noReadAlarms}`}
              <span
                className={`text-[#E20A29]  text-[12px] font-bold flex flex-col items-center justify-center w-[20px] h-[12px] p-0 m-0 text-stroke ${(noReadAlarms === undefined || noReadAlarms === 0) && 'invisible'}`}
                style={{
                  position: 'absolute',
                  left: '0',
                  top: '0',
                  zIndex: '-1',
                }}
              >
                {data && noReadAlarms > 99 ? '99+' : `${noReadAlarms}`}
              </span>
            </span>
            <span className='absolute top-[45px] flex justify-center items-center h-[23px] text-[12px] font-medium bg-white text-[#828282] rounded-[5px] p-[4px] whitespace-nowrap invisible group-hover/alarm:visible'>
              알림
            </span>
          </button>
          <button
            className={`relative group/profile hd-items flex items-center justify-center rounded-full `}
            onClick={handleProfileBtnClick}
          >
            <img
              src={userProfileData?.memberProfileDTO.profileUrl}
              alt='profileImage'
              className='h-[24px] w-[24px] rounded-full border-[#E20A29] border-[2px]'
            />
            <span className='absolute top-[40px] left-[-3px] flex justify-center items-center h-[23px] text-[12px] font-medium bg-white text-[#828282] rounded-[5px] p-[4px] whitespace-nowrap invisible group-hover/profile:visible'>
              프로필
            </span>
          </button>
        </div>
      ) : (
        <button
          className='rounded-[150px] border-2 border-[#E20A29] px-[30px] py-[4px] text-[#E20A29] text-[16px] font-medium'
          onClick={handleLoginBtnClick}
        >
          로그인
        </button>
      )}
    </div>
  );
}

export default MainHeader;
