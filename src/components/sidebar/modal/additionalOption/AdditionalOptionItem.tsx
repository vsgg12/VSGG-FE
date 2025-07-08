import React from 'react';
import { AdditionalOptionItemType } from './AdditionalOptionList';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useRouter } from 'next/navigation';

interface Props {
  item: AdditionalOptionItemType;
}

function AdditionalOptionItem({ item }: Props) {
  const router = useRouter();
  const handlePatchNoteClick = () => {
    return;
  };

  const handlePersonalInfoTermClick = () => {
    return;
  };

  const handleServiceTermClick = () => {
    return;
  };

  const handleGuideClick = () => {
    return;
  };

  const handleLogoutBtnClick = (): void => {
    useAuthStore.setState({ isLogin: false, accessToken: '', refreshToken: '' });
    localStorage.clear();
    router.push('/');
  };

  const getIcon = (item: AdditionalOptionItemType): JSX.Element => {
    switch (item) {
      case 'VS.GG 패치노트':
        return <img src={'/svg/sidebar/patchNoteIcon.svg'} width={16} height={16} />;
      case '서비스 약관':
        return <img src={'/svg/sidebar/serviceTermIcon.svg'} width={16} height={16} />;
      case '개인정보처리방침':
        return <img src={'/svg/sidebar/personalInfoIcon.svg'} width={16} height={16} />;
      case '이용가이드':
        return <img src={'/svg/sidebar/guideIcon.svg'} width={16} height={16} />;
      case '로그아웃':
        return <img src={'/svg/sidebar/logoutIcon.svg'} width={16} height={16} />;
      default:
        return <></>;
    }
  };

  const handleClick = () => {
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
      default:
        break;
    }
  };

  return (
    <div
      className='w-[160px] h-[37px] flex gap-[10px] items-center pl-[10px] cursor-pointer hover:bg-[#eeeeee] transition-colors duration-300 rounded-[8px]'
      onClick={handleClick}
    >
      {getIcon(item)}
      <div className='text-[14px] font-semibold text-[#555555]'>{item}</div>
    </div>
  );
}
export default AdditionalOptionItem;
