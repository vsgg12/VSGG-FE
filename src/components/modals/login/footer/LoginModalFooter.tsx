import LoginTypeButton from '@/components/modals/login/footer/LoginTypeButton';

interface Props {
  onClickNaverLogin: () => void;
  onClickGoogleLogin: () => void;
  onClickKakaoLogin: () => void;
}

const LoginModalFooter = ({ onClickNaverLogin, onClickKakaoLogin, onClickGoogleLogin }: Props) => {
  const loginButtonType: { type: 'naver' | 'google' | 'kakao'; onClick: () => void }[] = [
    {
      type: 'naver',
      onClick: onClickNaverLogin,
    },
    {
      type: 'google',
      onClick: onClickGoogleLogin,
    },
    {
      type: 'kakao',
      onClick: onClickKakaoLogin,
    },
  ];

  return (
    <div className={'flex flex-col gap-[16px]'}>
      {loginButtonType.map((item) => (
        <LoginTypeButton type={item.type} onClick={item.onClick} />
      ))}
    </div>
  );
};

export default LoginModalFooter;
