'use client';

import React, { useEffect, useState } from 'react';
import BackArrowIcon from '../../../../public/svg/mobile/backArrowIcon.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import getMyProfileDTO from '@/api/profile/getMyProfileDTO';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import getAlarms from '@/api/alarm/getAlarms';
import HomeHeaderActions from './HomeHeaderActions';

function MobileLogoHeader() {
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

  const { data, isLoading } = useQuery({
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

  const handleLoginBtnClick = (): void => {
    router.push('/login');
  };

  const handleSearchBtnClick = (): void => {
    router.push('/search/mobile');
  };

  const handleMenuBtnClick = (): void => {
    router.push('/setting/mobile');
  };

  return (
    <div className='flex px-[10px] py-[25px] h-[32px] items-center justify-between sticky top-0 z-[40] bg-white'>
      <Image
        src={BackArrowIcon}
        alt='뒤로가기 아이콘'
        width={32}
        height={32}
        className='flex justify-start cursor-pointer'
        onClick={() => {
          router.push('/home');
        }}
      />
      {isLoading ? (
        <div></div>
      ) : isLogin ? (
        <div className='flex gap-[8px]'>
          <HomeHeaderActions
            hasUnreadAlarm={noReadAlarms > 0}
            onAlarmClick={handleAlarmBtnClick}
            onSearchClick={handleSearchBtnClick}
            onMenuClick={handleMenuBtnClick}
          />
        </div>
      ) : (
        <button
          className='mr-[1rem] rounded-[150px] border-2 border-[#E20A29] px-[30px] py-[5px] text-[#E20A29]'
          onClick={handleLoginBtnClick}
        >
          로그인
        </button>
      )}
    </div>
  );
}

export default MobileLogoHeader;
