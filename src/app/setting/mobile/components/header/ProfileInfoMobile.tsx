'use client';

import React from 'react';
import { defaultImage } from '@/constants/defaultImage';
import { truncateText } from '@/utils/truncateText';
import useProfileTierIcon from '@/hooks/sidebar/useProfileTierIcon';

interface IProps {
  isLogin: boolean;
  userProfileData: IGetMyPageType;
  userEmail: string;
}

const ProfileInfoMobile = ({ isLogin, userProfileData, userEmail }: IProps) => {
  const { getIcon } = useProfileTierIcon({ size: 14 });

  return (
    <div className={'w-full h-[169px] flex flex-col items-center justify-center gap-[20px]'}>
      <img
        src={
          isLogin
            ? userProfileData?.memberProfileDTO.profileUrl === ''
              ? defaultImage
              : userProfileData?.memberProfileDTO.profileUrl
            : defaultImage
        }
        className='rounded-full block w-[56px] h-[56px] object-cover'
        alt={'프로필 이미지'}
      />
      <div className='flex flex-col gap-[5px] justify-center items-center font-semibold'>
        <div className='text-[14px] text-[#333333]'>
          {truncateText(userProfileData.memberProfileDTO.nickName, 8)}
        </div>

        <div className={'flex gap-[3px] text-[12px]'}>
          {getIcon(userProfileData.memberProfileDTO.tier)}
          {userProfileData.memberProfileDTO.tier}
        </div>

        <div className='text-[12px] text-[#888888] font-[400]'>{userEmail}</div>
      </div>
    </div>
  );
};

export default ProfileInfoMobile;
