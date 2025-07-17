'use client';

import { useAuthStore } from '@/app/login/store/useAuthStore';
import { AdditionalOptionItemType } from '@/components/sidebar/modal/additionalOption/AdditionalOptionList';
import { useSidebarStore } from '@/store/useSidebarStore';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const useAdditionalOptionItem = (item: AdditionalOptionItemType) => {
  const router = useRouter();
  const { setIsAdditionalOptionOpen, setIsNotificationOpen } = useSidebarStore();
  const handlePatchNoteClick = useCallback(() => {
    // 패치노트 클릭 로직
    window.location.href =
      'https://likeable-dinner-42b.notion.site/VS-GG-105ffcb9fd6980b3affec521f933c619?source=copy_link';
  }, []);

  const handlePersonalInfoTermClick = useCallback(() => {
    // 개인정보처리방침 클릭 로직
    window.location.href =
      'https://likeable-dinner-42b.notion.site/233ffcb9fd69806bb9d7f7512628e5f9?source=copy_link';
  }, []);

  const handleServiceTermClick = useCallback(() => {
    // 서비스 약관 클릭 로직
    window.location.href =
      'https://likeable-dinner-42b.notion.site/232ffcb9fd698059909cf11b844bdcd4?source=copy_link';
  }, []);

  const handleGuideClick = useCallback(() => {
    // 이용가이드 클릭 로직
  }, []);

  const handleGoLogin = useCallback(() => {
    router.replace('/login');
  }, [router]);

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
        return <img src='/svg/sidebar/patchNoteIcon.svg' width={16} height={16} />;
      case '서비스 약관':
        return <img src='/svg/sidebar/serviceTermIcon.svg' width={16} height={16} />;
      case '개인정보처리방침':
        return <img src='/svg/sidebar/personalInfoIcon.svg' width={16} height={16} />;
      case '이용가이드':
        return <img src='/svg/sidebar/guideIcon.svg' width={16} height={16} />;
      case '로그아웃':
        return <img src='/svg/sidebar/logoutIcon.svg' width={16} height={16} />;
      case '로그인':
        return <img src='/svg/sidebar/logoutIcon.svg' width={16} height={16} />;
      default:
        return <></>;
    }
  }, [item]);

  const handleClick = useCallback(() => {
    switch (item) {
      case 'VS.GG 패치노트':
        handlePatchNoteClick();
        break;
      case '개인정보처리방침':
        handlePersonalInfoTermClick();
        break;
      case '로그아웃':
        handleLogoutBtnClick();
        break;
      case '서비스 약관':
        handleServiceTermClick();
        break;
      case '이용가이드':
        handleGuideClick();
        break;
      case '로그인':
        handleGoLogin();
        break;
      default:
        break;
    }
  }, [
    handlePatchNoteClick,
    handlePersonalInfoTermClick,
    handleServiceTermClick,
    handleGuideClick,
    handleLogoutBtnClick,
    handleGoLogin,
    item,
  ]);

  return {
    getIcon,
    handleClick,
  };
};
