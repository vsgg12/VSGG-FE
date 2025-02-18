'use client';

import React, { useEffect, useState } from 'react';
import BackArrowIcon from '../../../../public/svg/mobile/backArrowIcon.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import getMyProfileDTO from '@/api/getMyProfileDTO';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import getAlarms from '@/api/getAlarms';
import { IoMdNotificationsOutline } from 'react-icons/io';
import LogoMobile from '../LogoMobile';

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
      const currentState = useAuthStore.getState();
      const newUser = {
        nickname: userProfileData.memberProfileDTO.nickName,
        profile_image: userProfileData.memberProfileDTO.profileUrl,
        email: userInfo.email,
      };

      if (
        currentState.user?.nickname !== newUser.nickname ||
        currentState.user?.profile_image !== newUser.profile_image
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
    router.push('/alert');
  };

  const handleProfileBtnClick = (): void => {
    router.push('/myPage');
  };

  const handleLoginBtnClick = (): void => {
    router.push('/login');
  };

  return (
    <div className='flex px-[10px] py-[25px] h-[32px] items-center justify-between mobile-layout sticky top-0 z-[40]'>
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
      <div className='pl-[25px]'>
        <LogoMobile size='small' />
      </div>
      {isLoading ? (
        <div></div>
      ) : isLogin ? (
        <div className='flex gap-[8px]'>
          <button
            className={`relative group/alarm hd-items cursor-pointer `}
            onClick={() => {
              handleAlarmBtnClick;
            }}
          >
            <IoMdNotificationsOutline />
            <span
              className={`text-[#8A1F21] text-[12px] font-bold flex flex-col relative items-center justify-center  w-[20px] h-[12px] p-0 m-0  ${(noReadAlarms === undefined || noReadAlarms === 0) && 'invisible'}`}
              style={{
                position: 'absolute',
                transform: 'translate(5.5px,-22px)',
              }}
            >
              {data && noReadAlarms > 99 ? '99+' : `${noReadAlarms}`}
              <span
                className={`text-[#8A1F21] text-[12px] font-bold flex flex-col items-center justify-center w-[20px] h-[12px] p-0 m-0 text-stroke ${(noReadAlarms === undefined || noReadAlarms === 0) && 'invisible'}`}
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
            <span className='absolute top-[50px] flex justify-center items-center h-[23px] text-[12px] font-medium bg-white text-[#828282] rounded-[5px] p-[4px] whitespace-nowrap invisible group-hover/alarm:visible'>
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
              className='h-[24px] w-[24px] rounded-full border-[#8A1F21] border-[2px]'
            />
            <span className='absolute top-[50px] left-[-3px] flex justify-center items-center h-[23px] text-[12px] font-medium bg-white text-[#828282] rounded-[5px] p-[4px] whitespace-nowrap invisible group-hover/profile:visible'>
              프로필
            </span>
          </button>
        </div>
      ) : (
        <button
          className='mr-[1rem] rounded-[150px] border-2 border-[#8A1F21] px-[30px] py-[5px] text-[#8A1F21]'
          onClick={handleLoginBtnClick}
        >
          로그인
        </button>
      )}
    </div>
  );
}

export default MobileLogoHeader;
