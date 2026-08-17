'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import getMyProfileDTO from '@/api/profile/getMyProfileDTO';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import getAlarms from '@/api/alarm/getAlarms';
import HomeHeaderActions from '@/components/mobile/Headers/HomeHeaderActions';

const MainHeader = () => {
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
    if (!isLogin) {
      router.push('/login');
      return;
    }

    router.push('/alert/mobile');
  };

  const handleSearchBtnClick = (): void => {
    router.push('/search/mobile');
  };

  const handleMenuBtnClick = (): void => {
    router.push('/setting/mobile');
  };

  return (
    <div className='flex h-[44px] items-center justify-between gap-[10px] px-[20px] mobile-layout sticky top-0 z-[40] !bg-semantic-background-page'>
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
      <HomeHeaderActions
        hasUnreadAlarm={noReadAlarms > 0}
        onAlarmClick={handleAlarmBtnClick}
        onSearchClick={handleSearchBtnClick}
        onMenuClick={handleMenuBtnClick}
      />
    </div>
  );
};

export default MainHeader;
