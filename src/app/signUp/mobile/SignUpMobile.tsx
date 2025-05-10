'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import deleteIcon from '../../../../public/svg/deleteIcon.svg';
import { useMutation } from '@tanstack/react-query';
import PostSignUp from '@/api/PostSignUp';
import { useAuthStore } from '../../login/store/useAuthStore';
import getNicknameCheck, { IGetNickNameCheckType } from '@/api/getNicknameCheck';

export default function SignUp_Mobile() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [nickname, setNickname] = useState<string>('');
  const [isSameNickname, setIsSameNickname] = useState<boolean>(true); // 닉네임 중복인지 아닌지
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isAllValid, setIsAllValid] = useState<boolean>(false);
  const [checkboxes, setCheckboxes] = useState({
    agreeAge: false,
    agreeTerms: false,
    agreePrivacy: false,
    agreePromotion: false,
  });
  const [isNickNameCheck, setIsNickNameCheck] = useState<boolean>(false);

  useEffect(() => {
    if (user?.nickname !== '') {
      router.replace('/home');
    }
  }, []);

  const handleCheckAll = (checked: boolean) => {
    setCheckboxes({
      agreeAge: checked,
      agreeTerms: checked,
      agreePrivacy: checked,
      agreePromotion: checked,
    });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCheckboxes({
      ...checkboxes,
      [name]: checked,
    });
  };

  const handleChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (inputValue !== nickname) {
      setIsSameNickname(true);
      setIsNickNameCheck(false);
    }
    setNickname(inputValue);
    inputValue.length > 1 && inputValue.length <= 20
      ? setErrorMessage('')
      : setErrorMessage('닉네임은 2글자 이상 20글자 이하이어야 합니다.');
  };
  const { mutate: nicknameCheck } = useMutation({
    mutationFn: () => getNicknameCheck(nickname),
    mutationKey: ['nickNameCheck', isSameNickname],
    onSuccess: (data: IGetNickNameCheckType) => {
      if (data.nicknameCheck) {
        setErrorMessage('중복된 닉네임입니다.');
      } else {
        setErrorMessage('사용 가능한 닉네임입니다.');
        setIsSameNickname(false);
        setIsNickNameCheck(true);
      }
    },
    onError: (error) => alert(error.message),
  });

  // 닉네임 중복 체크
  const handleCheckNickname = () => {
    if (nickname === '') {
      return;
    }
    if (errorMessage !== '') {
      return;
    }
    nicknameCheck();
  };

  const handleDeleteBtnClick = () => {
    setNickname('');
    setIsSameNickname(true);
    setErrorMessage('');
  };

  useEffect(() => {
    !isSameNickname && checkboxes.agreeAge && checkboxes.agreePrivacy && checkboxes.agreeTerms
      ? setIsAllValid(true)
      : setIsAllValid(false);
  }, [nickname, checkboxes, isSameNickname]);

  const { mutate: signUp } = useMutation({
    mutationFn: () =>
      PostSignUp({
        email: user?.email,
        profileImage: user?.profile_image,
        nickname,
        oAuthProvider: user?.socialLoginType,
        agrees: {
          agreeAge: checkboxes.agreeAge,
          agreeTerms: checkboxes.agreeTerms,
          agreePrivacy: checkboxes.agreePrivacy,
          agreePromotion: checkboxes.agreePromotion,
        },
      }),
    onError: (error) => {
      alert(error.message);
    },
    onSuccess: (data) => {
      useAuthStore.setState({
        isLogin: true,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        user: {
          email: user ? user.email : '',
          nickname,
          profile_image: user ? user.profile_image : '',
          socialLoginType: user ? user.socialLoginType : ''
        },
      });
      localStorage.setItem('nickname', nickname);
      alert('회원가입이 완료되었습니다.');
      router.push('/home');
    },
  });

  const handleSignUpBtnClick = (): void => {
    if (!isAllValid || isNickNameCheck === false) {
      alert('닉네임 중복 확인이 필요합니다.');
      return;
    }
    signUp();
  };

  return (
    <div className='flex justify-center mobile-layout p-[20px]'>
      <div className='mt-12 w-full flex h-full flex-col items-center justify-center gap-10'>
        <div className="font-['SBAggroB'] text-4xl text-[#8A1F21]">VS.GG</div>
        <div className='flex min-w-[348px] w-full items-center justify-center'>
          <div className='flex w-full items-center'>
            <div className='h-[1px] flex grow bg-[#828282]'></div>
            <div className='mx-[30px] text-[#7B7B7B] text-[20px] font-[400]'>간단 회원가입</div>
            <div className='h-[1px] flex grow bg-[#828282]'></div>
          </div>
        </div>

        <div className='flex flex-col gap-10 min-w-[350px] w-full'>
          <div className='flex flex-col gap-2'>
            <p>이메일</p>
            <input type='text' readOnly value={user?.email} className='su-i-blocked w-full' />
          </div>

          <div className='flex flex-col gap-2'>
            <p>닉네임</p>
            <div className='flex gap-2 min-w-[350px]'>
              <div className='flex relative h-[49px] w-full'>
                <input
                  type='text'
                  placeholder='닉네임을 입력해주세요.'
                  value={nickname}
                  maxLength={20}
                  onChange={handleChangeNickname}
                  className='rounded-full border-2 border-[#8A1F21] pl-[20px] py-3 focus:outline-none text-[18px] pr-[35px]  bg-white w-full h-full text-black'
                />
                <Image
                  alt='deleteIcon'
                  width={16}
                  height={16}
                  src={deleteIcon}
                  style={{
                    position: 'absolute',
                    right: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                  }}
                  onClick={handleDeleteBtnClick}
                />
              </div>
              {isSameNickname ? (
                <button
                  type='button'
                  onClick={handleCheckNickname}
                  className='rounded-full border-1 border-[#8A1F21] flex justify-center items-center font-bold text-white bg-[#8A1F21] text-[18px] min-w-[120px] h-[49px]'
                >
                  중복확인
                </button>
              ) : (
                <button
                  type='button'
                  className='rounded-full border-1 border-[#8A1F21] flex justify-center items-center font-bold text-white bg-[#8A1F21] text-[18px] w-[120px] h-[49px]'
                  disabled={true}
                >
                  확인완료
                </button>
              )}
            </div>
            <span
              className={`pl-5 text-[14px] h-[14px] flex flex-grow ${isSameNickname ? 'text-[#8A1F21]' : 'text-[#555555'}`}
            >
              {errorMessage}
            </span>
          </div>
        </div>
        <div className='h-0.5 bg-[#D9D9D9]'></div>
        <div className='flex flex-col gap-10 text-[16px] w-full'>
          <div className='flex items-center gap-5'>
            <input
              type='checkbox'
              className='min-w-[32px] min-h-[32px] accent-[#8A1F21]'
              checked={Object.values(checkboxes).every(Boolean)}
              onChange={(e) => handleCheckAll(e.target.checked)}
            />
            <p className='text-[16px]'>모두 동의합니다.</p>
          </div>
          <div className='h-[3px] w-full bg-[#D9D9D9]'></div>
          <div className='flex items-center gap-5'>
            <input
              type='checkbox'
              className='min-w-[32px] min-h-[32px] accent-[#8A1F21]'
              name='agreeAge'
              checked={checkboxes.agreeAge}
              onChange={handleCheckboxChange}
              required
            />
            <div className='flex flex-col'>
              <p>만 14세 이상입니다. (필수)</p>
              <p className='text-[12px] text-black'>만 14세 이상만 가입이 가능합니다.</p>
            </div>
          </div>
          <div className='flex items-center gap-5'>
            <input
              type='checkbox'
              className='min-w-[32px] min-h-[32px] accent-[#8A1F21]'
              name='agreeTerms'
              checked={checkboxes.agreeTerms}
              onChange={handleCheckboxChange}
              required
            />
            <p>
              <span className='text-[#8A1F21]'>이용약관</span>에 동의합니다. (필수)
            </p>
          </div>
          <div className='flex items-center gap-5'>
            <input
              type='checkbox'
              className='min-w-[32px] min-h-[32px] accent-[#8A1F21]'
              name='agreePrivacy'
              checked={checkboxes.agreePrivacy}
              onChange={handleCheckboxChange}
              required
            />
            <p>
              <span className='text-[#8A1F21]'>개인정보처리방침</span>에 동의합니다. (필수)
            </p>
          </div>
          <div className='flex items-center gap-5'>
            <input
              type='checkbox'
              className='min-w-[32px] min-h-[32px] accent-[#8A1F21]'
              name='agreePromotion'
              checked={checkboxes.agreePromotion}
              onChange={handleCheckboxChange}
            />
            <div className='flex flex-col'>
              <p>마케팅 정보 수신 (선택)</p>
              <p className='text-[12px] whitespace-nowrap'>
                서비스 홍보 및 마케팅 목적의 개인정보처리방침에 동의합니다. (선택)
              </p>
            </div>
          </div>
          <div className='h-[3px] w-full bg-[#D9D9D9]'></div>
        </div>
        <button
          type='submit'
          className={`rounded-[30px] ${isAllValid ? 'bg-[#8A1F21]' : 'bg-[#B5B5B5]'}  p-2 text-white flex justify-center items-center w-[185px] h-[49px] text-[20px]`}
          onClick={handleSignUpBtnClick}
        >
          가입하기
        </button>
      </div>
    </div>
  );
}
