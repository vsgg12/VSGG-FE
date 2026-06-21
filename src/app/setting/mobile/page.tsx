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
import SettingListMobile from '@/app/setting/mobile/components/content/SettingListMobile';
import myPageIcon from '../../../../public/svg/mobile/setting/myPageIcon.svg';
import myJudgeIcon from '../../../../public/svg/mobile/setting/myJudgeIcon.svg';
import myPostIcon from '../../../../public/svg/mobile/setting/myPostIcon.svg';
import darkThemeIcon from '../../../../public/svg/mobile/setting/darkThemeIcon.svg';
import guideIcon from '../../../../public/svg/mobile/setting/guideIcon.svg';
import patchNoteIcon from '../../../../public/svg/mobile/setting/patchNoteIcon.svg';
import LinkUtils from '@/utils/link/linkUtils';

const SettingMobile = () => {
  const { isLogin, user, accessToken } = useAuthStore(
    useShallow((s) => ({
      isLogin: s.isLogin,
      user: s.user,
      accessToken: s.accessToken,
    })),
  );

  const router = useRouter();

  const { data: userProfileData } = useQuery({
    queryKey: ['MY_PROFILE_INFO'],
    queryFn: () => getMyProfileDTO(accessToken),
    enabled: isLogin,
  });

  const onClose = () => {
    router.back();
  };

  const myVsggItems = [
    { icon: myPageIcon, title: '마이페이지', onClick: () => router.push('/myPage') },
    { icon: myJudgeIcon, title: '내 판결 전적', onClick: () => router.push('/myPage/judgeRecord') },
    { icon: myPostIcon, title: '내가 쓴 글', onClick: () => router.push('/myPage/myPosts') },
  ];

  const additionalOptionItems = [
    { icon: darkThemeIcon, title: '어두운 테마', onClick: () => {} },
    { icon: guideIcon, title: '이용가이드', onClick: LinkUtils.handleGuideClick },
    { icon: patchNoteIcon, title: 'VS.GG 패치노트', onClick: LinkUtils.handlePatchNoteClick },
  ];

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

      <div className='mt-[26px] flex w-full flex-col gap-[30px]'>
        <SettingListMobile title='MY VS.GG' items={myVsggItems} />
        <SettingListMobile title='추가 옵션' items={additionalOptionItems} />
      </div>

      {/*TODO: footer 추가*/}
    </div>
  );
};

export default SettingMobile;
