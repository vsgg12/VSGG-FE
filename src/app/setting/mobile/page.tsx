'use client';

import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useQuery } from '@tanstack/react-query';
import getMyProfileDTO from '@/api/profile/getMyProfileDTO';
import ProfileInfoMobile from '@/app/setting/mobile/components/header/ProfileInfoMobile';
import { truncateText } from '@/utils/truncateText';
import XIconButton from '@/app/setting/mobile/components/header/XIconButton';

const SettingMobile = () => {
  const { isLogin, user, accessToken } = useAuthStore(
    useShallow((s) => ({
      isLogin: s.isLogin,
      user: s.user,
      accessToken: s.accessToken,
    })),
  );

  const { nickname, email, profile_image, tier } = user!;

  const router = useRouter();

  const { data: userProfileData } = useQuery({
    queryKey: ['MY_PROFILE_INFO'],
    queryFn: () => getMyProfileDTO(accessToken),
    enabled: isLogin,
  });

  const onClose = () => {
    router.back();
  };

  useEffect(() => {
    if (!isLogin) {
      router.replace('/');
    }
  }, [isLogin, router]);

  if (!isLogin || !userProfileData || !user) {
    return null;
  }

  return (
    <div className={'flex flex-col mobile-layout px-[20px] pt-[53px] relative'}>
      <ProfileInfoMobile
        isLogin={isLogin}
        userProfileData={userProfileData}
        userEmail={truncateText(user.email, 22)}
      />
      <XIconButton width={12} height={12} onClick={onClose} />

      {/*TODO: content 추가 */}
    </div>
  );
};

export default SettingMobile;
