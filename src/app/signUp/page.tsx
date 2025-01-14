'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import deleteIcon from '../../../public/svg/deleteIcon.svg';
import { useMutation } from '@tanstack/react-query';
import PostSignUp from '@/api/PostSignUp';
import { useAuthStore } from '../login/store/useAuthStore';
import getNicknameCheck, { IGetNickNameCheckType } from '@/api/getNicknameCheck';

export default function SignUp() {
  const router = useRouter();
  const { user } = useAuthStore.getState();
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
        },
      });
      localStorage.setItem('nickname', nickname);
      alert('회원가입이 완료되었습니다.');
      router.push('/home');
    },
  });

  const handleSignUpBtnClick = (): void => {
    if (!isAllValid || isNickNameCheck === false) {
      alert('닉네임 중복 확인이 필요합니다.')
      return;
    }
    signUp();
  };

  return (
    <div className='flex justify-center'>
      <div className='mt-12 w-[600px] flex h-full flex-col items-center justify-center gap-10'>
        <div className="font-['SBAggroB'] text-4xl text-[#8A1F21]">VS.GG</div>
        <div className='flex w-[560px] items-center justify-center'>
          <div className='flex w-full items-center'>
            <div className='h-0.5 grow bg-[#D9D9D9]'></div>
            <div className='mx-[30px] text-[#7B7B7B]'>간단 회원가입</div>
            <div className='h-0.5 grow bg-[#D9D9D9]'></div>
          </div>
        </div>

        <div className='flex flex-col gap-10 w-[530px]'>
          <div className='flex flex-col gap-2'>
            <p>이메일</p>
            <input type='text' readOnly value={user?.email} className='su-i-blocked' />
          </div>

          <div className='flex flex-col gap-2'>
            <p>닉네임</p>
            <div className='flex gap-2'>
              <div className='flex grow flex-col relative'>
                <input
                  type='text'
                  placeholder='닉네임을 입력해주세요.'
                  value={nickname}
                  onChange={handleChangeNickname}
                  className='su-i'
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
                  className='su-btn text-[#8A1F21] text-[16px]'
                >
                  중복확인
                </button>
              ) : (
                <button
                  type='button'
                  className='su-btn text-[#FFFFFF] bg-[#8A1F21] text-[16px]'
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
        <div className='flex flex-col gap-10'>
          <div className='flex items-center gap-5'>
            <input
              type='checkbox'
              className='size-6 accent-[#8A1F21]'
              name='agreeAge'
              checked={checkboxes.agreeAge}
              onChange={handleCheckboxChange}
              required
            />
            <div className='flex flex-col gap-1'>
              <p>만 14세 이상입니다. (필수)</p>
              <p className='text-xs text-[#8A1F21]'>만 14세 이상만 가입이 가능합니다.</p>
            </div>
          </div>
          <div className='flex items-center gap-5'>
            <input
              type='checkbox'
              className='size-6 accent-[#8A1F21]'
              name='agreeTerms'
              checked={checkboxes.agreeTerms}
              onChange={handleCheckboxChange}
              required
            />
            <p>
              <span className='font-bold text-[#8A1F21]'>이용약관</span>에 동의합니다. (필수)
            </p>
          </div>
          <div className='flex items-center gap-5'>
            <input
              type='checkbox'
              className='size-6 accent-[#8A1F21]'
              name='agreePrivacy'
              checked={checkboxes.agreePrivacy}
              onChange={handleCheckboxChange}
              required
            />
            <p>
              <span className='font-bold text-[#8A1F21]'>개인정보처리방침</span>에 동의합니다.
              (필수)
            </p>
          </div>
          <div className='flex items-center gap-5'>
            <input
              type='checkbox'
              className='size-6 accent-[#8A1F21]'
              name='agreePromotion'
              checked={checkboxes.agreePromotion}
              onChange={handleCheckboxChange}
            />
            <p>
              서비스 홍보 및 마케팅 목적의{' '}
              <span className='font-bold text-[#8A1F21]'>개인정보처리방침</span>에 동의합니다.
              (선택)
            </p>
          </div>
          <div className='h-0.5 w-full bg-[#D9D9D9]'></div>
          <div className='flex items-center gap-5'>
            <input
              type='checkbox'
              className='size-6 accent-[#8A1F21]'
              checked={Object.values(checkboxes).every(Boolean)}
              onChange={(e) => handleCheckAll(e.target.checked)}
            />
            <p>모두 동의합니다.</p>
          </div>
        </div>
        <button
          type='submit'
          className={`mb-10 rounded-full ${isAllValid ? 'bg-[#8A1F21]' : 'bg-[#B5B5B5]'}  p-2 text-white w-[450px]`}
          onClick={handleSignUpBtnClick}
        >
          가입하기
        </button>
      </div>
    </div>
  );
}
