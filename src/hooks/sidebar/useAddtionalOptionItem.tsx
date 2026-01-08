'use client';

import { useAuthStore } from '@/app/login/store/useAuthStore';
import { AdditionalOptionItemType } from '@/components/sidebar/modal/additionalOption/AdditionalOptionList';
import { useSidebarStore } from '@/store/sidebar/useSidebarStore';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import LinkUtils from '@/utils/link/linkUtils';
import patchNoteIcon from '../../../public/svg/sidebar/patchNoteIcon.svg';
import serviceTermIcon from '../../../public/svg/sidebar/serviceTermIcon.svg';
import personalInfoIcon from '../../../public/svg/sidebar/personalInfoIcon.svg';
import guideIcon from '../../../public/svg/sidebar/guideIcon.svg';
import logoutIcon from '../../../public/svg/sidebar/logoutIcon.svg';
import Image from 'next/image';

export const useAdditionalOptionItem = (item: AdditionalOptionItemType) => {
  const router = useRouter();
  const { setIsAdditionalOptionOpen, setIsNotificationOpen } = useSidebarStore();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const handleLoginClick = useCallback(() => {
    setIsLoginModalOpen(true);
  }, []);

  const handleLogoutBtnClick = useCallback(() => {
    // 로그아웃 처리 로직
    useAuthStore.setState({ isLogin: false, accessToken: '', refreshToken: '' });
    setIsAdditionalOptionOpen(false);
    setIsNotificationOpen(false);
    localStorage.clear();
    router.push('/');
  }, [router, setIsAdditionalOptionOpen, setIsNotificationOpen]);

  const getIcon = useCallback((): JSX.Element => {
    switch (item) {
      case 'VS.GG 패치노트':
        return <Image src={patchNoteIcon} width={16} height={16} alt={'patchNoteIcon'} />;
      case '서비스 약관':
        return <Image src={serviceTermIcon} width={16} height={16} alt={'serviceTermIcon'} />;
      case '개인정보처리방침':
        return <Image src={personalInfoIcon} width={16} height={16} alt={'personalInfoIcon'} />;
      case '이용가이드':
        return <Image src={guideIcon} width={16} height={16} alt={'guideIcon'} />;
      case '로그아웃':
        return <Image src={logoutIcon} width={16} height={16} alt={'logoutIcon'} />;
      case '로그인':
        return <Image src={logoutIcon} width={16} height={16} alt={'loginIcon'} />;
      default:
        return <></>;
    }
  }, [item]);

  const handleClick = useCallback(() => {
    switch (item) {
      case 'VS.GG 패치노트':
        LinkUtils.handlePatchNoteClick();
        break;
      case '개인정보처리방침':
        LinkUtils.handlePersonalInfoTermClick();
        break;
      case '로그아웃':
        handleLogoutBtnClick();
        break;
      case '서비스 약관':
        LinkUtils.handleServiceTermClick();
        break;
      case '이용가이드':
        LinkUtils.handleGuideClick();
        break;
      case '로그인':
        handleLoginClick();
        break;
      default:
        break;
    }
  }, [handleLoginClick, handleLogoutBtnClick, item]);

  return {
    getIcon,
    handleClick,
    isLoginModalOpen,
    setIsLoginModalOpen,
  };
};
