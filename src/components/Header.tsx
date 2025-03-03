'use client';

import Image from 'next/image';
import { IoMdNotificationsOutline } from 'react-icons/io';
import writeSVG from '../../public/svg/writing.svg';
import { useEffect, useState } from 'react';
import ProfileModal from '@/app/home/_component/ProfileModal';
import AlarmModal from '@/app/home/_component/AlarmModal';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/login/store/useAuthStore';

export default function Header({
  userProfileData,
  alarmData,
}: {
  userProfileData: IGetMyPageType |undefined;
  alarmData: IGetAlarmConfirmType | undefined;
}) {
  const router = useRouter();
  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const currentUrl = usePathname();
  const { user: userInfo, isLogin } = useAuthStore();
  const [noReadAlarms, setNoReadAlarms] = useState<number>(0);

  useEffect(() => {
    if (userProfileData && userInfo) {
      const newUser = {
        nickname: userProfileData.memberProfileDTO.nickName,
        profile_image: userProfileData.memberProfileDTO.profileUrl,
        email: userInfo.email,
      };

      if (
        userInfo.nickname !== newUser.nickname ||
        userInfo.profile_image !== newUser.profile_image
      ) {
        useAuthStore.setState({ user: newUser });
      }
    }
  }, [userProfileData, userInfo]);

  useEffect(() => {
    if (alarmData) {
      setNoReadAlarms(alarmData.alarmList.filter((alarm) => alarm.isRead === false).length);
    }
  }, [alarmData]);

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

  const handleLogoutBtnClick = (): void => {
    setIsProfileModalOpen(false);
    useAuthStore.setState({ isLogin: false, accessToken: '', refreshToken: '' });
    localStorage.clear();
    router.push('/');
  };

  const handleGoPostBtnClick = (): void => {
    if (!isLogin) {
      router.push('/login');
      return;
    }
    router.push('/post/write');
  };

  return (
    <div className='w-full min-w-[800px] pr-[50px] h-[100px] top-0 flex flex-row items-center justify-end bg-[#f3f3f3] z-100'>
      <div className='flex flex-row items-center gap-6'>
        {!isLogin ? (
          <button
            className='mr-[1rem] rounded-[150px] border-2 border-[#8A1F21] px-[30px] py-[5px] text-[#8A1F21]'
            onClick={() => {
              router.push('/login');
            }}
          >
            로그인
          </button>
        ) : (
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
                className={`text-[#8A1F21] text-[12px] font-bold flex flex-col relative items-center justify-center  w-[20px] h-[12px] p-0 m-0  ${(noReadAlarms === undefined || noReadAlarms === 0) && 'invisible'}`}
                style={{
                  position: 'absolute',
                  transform: 'translate(6.5px,-22px)',
                }}
              >
                {alarmData && noReadAlarms > 99 ? '99+' : `${noReadAlarms}`}
                <span
                  className={`text-[#8A1F21]  text-[12px] font-bold flex flex-col items-center justify-center w-[20px] h-[12px] p-0 m-0 text-stroke ${(noReadAlarms === undefined || noReadAlarms === 0) && 'invisible'}`}
                  style={{
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    zIndex: '-1',
                  }}
                >
                  {alarmData && noReadAlarms > 99 ? '99+' : `${noReadAlarms}`}
                </span>
              </span>
              <span className='absolute top-[50px]  flex justify-center items-center h-[23px] text-[12px] font-medium bg-white text-[#828282] rounded-[5px] p-[4px] whitespace-nowrap invisible group-hover/alarm:visible'>
                알림
              </span>
            </button>
            {isAlarmModalOpen && <AlarmModal alarms={alarmData?.alarmList} />}

            <button
              className={`relative group/profile hd-items flex items-center justify-center  rounded-full ${isProfileModalOpen && 'rounded-full bg-white'}`}
              onClick={handleProfileBtnClick}
            >
              <img
                src={userProfileData?.memberProfileDTO.profileUrl}
                alt='profileImage'
                className='h-[36px] w-[36px] rounded-full border-[#8A1F21] border-[2px]'
              />
              <span className='absolute top-[50px] left-[-3px] flex justify-center items-center h-[23px] text-[12px] font-medium bg-white text-[#828282] rounded-[5px] p-[4px] whitespace-nowrap invisible group-hover/profile:visible'>
                프로필
              </span>
            </button>
            {isProfileModalOpen && userProfileData && userInfo && (
              <div
                className='w-[250px] min-h-[205px] border border-[#8A1F21] rounded-[18px] p-[13px] bg-[#FFFFFF] z-50'
                style={{ position: 'absolute', transform: 'translate(-37%,63%)' }}
              >
                <ProfileModal
                  handleLogoutClick={handleLogoutBtnClick}
                  email={userInfo.email}
                  profileImage={
                    userProfileData?.memberProfileDTO.profileUrl === 'none'
                      ? 'https://ssl.pstatic.net/static/pwe/address/img_profile.png'
                      : userProfileData.memberProfileDTO.profileUrl
                  }
                  nickname={userProfileData.memberProfileDTO.nickName}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
