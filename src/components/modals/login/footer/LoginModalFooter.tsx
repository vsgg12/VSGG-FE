'use client';

import LoginTypeButton from '@/components/modals/login/footer/LoginTypeButton';
import LinkUtils from '@/utils/link/linkUtils';

interface Props {
  onClickNaverLogin: () => void;
  onClickGoogleLogin: () => void;
  onClickKakaoLogin: () => void;
}

const LoginModalFooter = ({ onClickNaverLogin, onClickKakaoLogin, onClickGoogleLogin }: Props) => {
  const loginButtonType: { type: 'naver' | 'google' | 'kakao'; onClick: () => void }[] = [
    {
      type: 'google',
      onClick: onClickGoogleLogin,
    },
    {
      type: 'kakao',
      onClick: onClickKakaoLogin,
    },
    {
      type: 'naver',
      onClick: onClickNaverLogin,
    },
  ];

  return (
    <div className={'flex flex-col w-full h-[202px] justify-between'}>
      <div className={'gap-[16px] flex flex-col'}>
        {loginButtonType.map((item) => (
          <LoginTypeButton type={item.type} onClick={item.onClick} />
        ))}
      </div>
      <div className={'text-[12px] text-[#555555] text-center'}>
        VS.GG의{' '}
        <span
          className={'font-semibold underline cursor-pointer'}
          onClick={LinkUtils.handleServiceTermClick}
        >
          서비스 이용 약관
        </span>
        과{' '}
        <span
          className={'font-semibold underline cursor-pointer'}
          onClick={LinkUtils.handlePersonalInfoTermClick}
        >
          개인정보처리방침
        </span>
        에 동의할게요.
      </div>
    </div>
  );
};

export default LoginModalFooter;
