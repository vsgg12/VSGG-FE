'use client';

import { DeleteMyProfileImage, PatchMyNickname, PatchMyProfileImage } from '@/api/changeProfile';
import getMyProfileDTO from '@/api/getMyProfileDTO';
import getNicknameCheck, { IGetNickNameCheckType } from '@/api/getNicknameCheck';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import CameraIcon from '../../../../../public/svg/mobile/cameraIcon.svg';
import ModifyProfileHeader from '@/components/mobile/Headers/ModifyProfileHeader';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

function ModifyProfile_Mobile() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [patchImage, setPatchImage] = useState<File | undefined>();
  const [isSameNickName, setIsSameNickName] = useState<boolean>(false);
  const [isNickNameCheck, setIsNickNameCheck] = useState<boolean>(true);
  const [profileImage, setProfileImage] = useState<string>();
  const [prevProfileImage, setPrevProfileImage] = useState<string>('');
  const [nickName, setNickName] = useState<string>();
  const [prevNickName, setPrevNickName] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { accessToken, isLogin } = useAuthStore();
  const queryClient = useQueryClient();
  const formData = new FormData();

  const { data: userProfileData } = useQuery({
    queryKey: ['MY_PROFILE_INFO'],
    queryFn: () => getMyProfileDTO(accessToken),
  });

  useEffect(() => {
    if (userProfileData) {
      setProfileImage(userProfileData.memberProfileDTO.profileUrl);
      setNickName(userProfileData.memberProfileDTO.nickName);
      setPrevNickName(userProfileData.memberProfileDTO.nickName);
      setPrevProfileImage(userProfileData.memberProfileDTO.profileUrl);
    }
  }, [userProfileData]);

  const handleChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (inputValue !== nickName) {
      setIsSameNickName(true);
      setIsNickNameCheck(false);
    }
    setNickName(inputValue);
    inputValue.length > 1 && inputValue.length <= 20
      ? setErrorMessage('')
      : setErrorMessage('공백 없이 2글자 이상, 20글자 이하로 입력하세요.');
  };

  const { mutate: nicknameCheck } = useMutation({
    mutationFn: () => getNicknameCheck(nickName!),
    mutationKey: ['nickNameCheck', isSameNickName],
    onSuccess: (data: IGetNickNameCheckType) => {
      if (data.nicknameCheck) {
        setErrorMessage('중복된 닉네임입니다.');
      } else {
        setErrorMessage('사용 가능한 닉네임입니다.');
        setIsSameNickName(false);
        setIsNickNameCheck(true);
      }
    },
    onError: (error) => alert(error.message),
  });

  const { mutate: deleteProfileImage } = useMutation({
    mutationFn: () => DeleteMyProfileImage(accessToken),
    onSuccess: () => changeProfileImage(),
  });

  const { mutate: changeProfileImage } = useMutation({
    mutationFn: () => PatchMyProfileImage({ token: accessToken, profile: formData }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['MY_PROFILE_INFO'],
      });

      if (isNickNameCheck && nickName !== prevNickName) {
        changeNickname();
      } else if (isNickNameCheck && nickName === prevNickName) {
        alert('프로필 이미지 변경에 성공하셨습니다.');
        router.back();
      }
    },
    onError: (error) => {
      console.error(error.message);
      alert('프로필 이미지 변경에 실패하셨습니다.');
    },
  });

  const { mutate: changeNickname } = useMutation({
    mutationFn: () =>
      PatchMyNickname({
        token: accessToken,
        nickName: nickName!,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['MY_PROFILE_INFO'],
      });
      alert('프로필 수정에 성공하셨습니다.');
      router.back();
    },
    onError: (error) => {
      alert(error.message);
    },
    onSettled: () => {
      router.back();
    },
  });

  const handleCheckNickname = () => {
    if (prevNickName === nickName) {
      return;
    }
    if (nickName === '') {
      return;
    }
    if (errorMessage !== '') {
      return;
    }
    nicknameCheck();
  };

  useEffect(() => {
    if (patchImage) {
      formData.append('profile', patchImage);
    }
  }, [patchImage, formData]);

  // 기본 프로필 이미지 url을 File 타입으로 바꾸는 함수
  const urlToFile = async (url: string, fileName: string, mimeType: string): Promise<File> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], fileName, { type: mimeType });
  };

  const handleDeleteImage = () => {
    if (
      profileImage === 'none' ||
      profileImage === 'https://ssl.pstatic.net/static/pwe/address/img_profile.png'
    ) {
      return;
    }
    setProfileImage('https://ssl.pstatic.net/static/pwe/address/img_profile.png');
    urlToFile(
      'https://ssl.pstatic.net/static/pwe/address/img_profile.png',
      'profile.png',
      'image/png',
    )
      .then((file) => {
        setPatchImage(file);
      })
      .catch((error) => {
        console.error('Error converting URL to file:', error);
      });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setPatchImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleChangeImage = () => {
    fileInputRef.current?.click();
  };

  const handleSave = () => {
    // 닉네임 변경이 없을 경우
    if (isNickNameCheck && nickName === prevNickName) {
      if (prevProfileImage === profileImage) {
        router.back();
        return;
      }
      if (prevProfileImage === 'none') {
        changeProfileImage(); // 문제
        return;
      }
      deleteProfileImage(); // 문제
    }

    // 닉네임 변경이 있을 경우
    if (isNickNameCheck && nickName !== prevNickName) {
      if (prevProfileImage !== profileImage) {
        deleteProfileImage();
        return;
      }
      changeNickname();
    }

    if (isSameNickName && prevNickName !== nickName) {
      alert('닉네임 중복확인이 필요합니다.');
      return;
    }
  };

  useEffect(() => {
    if (!isLogin) {
      router.push('/login');
    }
  }, [isLogin, router]);

  return (
    <div className='px-[10px] h-[100dvh]'>
      <ModifyProfileHeader handleSaveClick={handleSave} />
      <div className='mobile-layout flex flex-col flex-grow items-center px-[21px] py-[20px] gap-[100px] pt-[80px]'>
        <div className='w-full flex flex-col gap-[20px]'>
          {/* <div className='font-semibold text-[22px] text-[#333333]'>프로필 이미지</div> */}
          <div className='flex gap-[15px] justify-center'>
            <img
              src={profileImage}
              alt='profileImage'
              className='w-[145px] h-[145px] rounded-full object-fill'
            />
            <div className='flex gap-[10px] absolute translate-x-[95px] translate-y-[115px]'>
              <input
                type='file'
                accept='image/*'
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <div
                className='border border-gray rounded-[5px] text-[#333333] bg-white w-[33px] h-[32px] flex justify-center items-center cursor-pointer'
                onClick={handleChangeImage}
              >
                <Image src={CameraIcon} alt='Camera-Icon' width={16} height={16} />
              </div>

              <div
                className='border border-gray rounded-[5px] text-[#333333] bg-white w-[48px] h-[32px] cursor-pointer flex justify-center items-center'
                onClick={handleDeleteImage}
              >
                삭제
              </div>
            </div>
            {/* <div className='flex flex-col justify-between'> 
                   <div className='flex flex-col'>
                    <p className='text-[14px] font-medium text-[#909090]'>
                      파일 형식 : jpg, jpeg, png
                    </p>
                    <p className='text-[14px] font-medium text-[#909090]'>파일 크기 : 2MB 이내</p>
                  </div> 
                </div> */}
          </div>
        </div>

        <div className='flex flex-col gap-[10px] px-[25px]'>
          <div className='flex gap-[10px] items-center'>
            <p className='font-semibold text-[15px] text-[#333333]'>닉네임</p>
            <p className='font-medium text-[15px] text-[#909090]'>
              닉네임은 7일에 한번만 변경할 수 있습니다.
            </p>
          </div>
          <div className='flex gap-3 items-center justify-center'>
            <input
              type='text'
              className='min-w-[263.5px] h-[30px] px-[2px] font-medium text-[20px] bg-inherit text-[#333333] border-b-2 border-gray focus:outline-none'
              value={nickName}
              placeholder='닉네임을 입력하세요.'
              onChange={handleChangeNickname}
            />
            <button
              className='bg-white rounded-[5px] border border-gray justify-center items-center text-[16px] font-medium text-[#333333] w-[76px] h-[32px] whitespace-nowrap cursor-pointer'
              onClick={handleCheckNickname}
            >
              중복확인
            </button>
          </div>
          <div className='text-[14px] text-[#8A1F21] flex items-center'>{errorMessage}</div>
        </div>
      </div>
    </div>
  );
}

export default ModifyProfile_Mobile;
