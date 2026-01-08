import getMyProfileDTO from '@/api/getMyProfileDTO';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import useProfileTierIcon from '@/hooks/sidebar/useProfileTierIcon';
import { truncateText } from '@/utils/truncateText';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

function ProfileInfo() {
  const { isLogin, accessToken, user } = useAuthStore();
  const { getIcon } = useProfileTierIcon({ size: 16 });

  const defaultImage = 'https://ssl.pstatic.net/static/pwe/address/img_profile.png';
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const { data: userProfileData } = useQuery({
    queryKey: ['MY_PROFILE_INFO'],
    queryFn: () => getMyProfileDTO(accessToken),
    enabled: isLogin,
  });

  const onClickLogin = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <div
      className={`flex w-[204px] h-[48px] gap-[10px] items-center ${!isLogin && 'cursor-pointer'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={isLogin ? undefined : onClickLogin}
    >
      <img
        src={
          isLogin && userProfileData ? userProfileData.memberProfileDTO.profileUrl : defaultImage
        }
        className="rounded-full block w-[48px] h-[48px] object-cover"
      />
      {isLogin && userProfileData && user ? (
        <div className="flex flex-col gap-[3px]">
          <div className="flex gap-[3px]">
            {getIcon(userProfileData.memberProfileDTO.tier)}
            <div className="text-[16px] text-[#333333]">
              {truncateText(userProfileData.memberProfileDTO.nickName, 8)}
            </div>
          </div>

          <div className="text-[12px] text-[#888888]">{truncateText(user.email, 22)}</div>
        </div>
      ) : (
        <div className="text-[16px] text-[#333333] relative h-[20px] overflow-hidden w-full flex items-center">
          <span
            className="absolute top-0 left-0 w-full transition-opacity duration-300 ease-in-out text-[16px] text-[#333333] text-left"
            style={{
              opacity: isHovered ? 0 : 1,
              transition: 'opacity 0.3s ease-in-out',
            }}
          >
            게스트
          </span>
          <span
            className="absolute top-0 left-0 w-full transition-opacity duration-300 ease-in-out text-[16px] text-[#333333] text-left"
            style={{
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out',
            }}
          >
            간편 로그인 하기
          </span>
        </div>
      )}
    </div>
  );
}

export default ProfileInfo;
