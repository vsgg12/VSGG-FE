import React from 'react';
import logoutIcon from '../../../../public/svg/gologout.svg';
import myJudgeIcon from '../../../../public/svg/gomyjudge.svg';
import myPostIcon from '../../../../public/svg/gomypost.svg';
import myPageIcon from '../../../../public/svg/gomypage.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface IProfileModalProps {
  handleLogoutClick: () => void;
  nickname: string;
  profileImage: string | undefined;
  email: string;
}

export default function ProfileModal({
  handleLogoutClick,
  nickname,
  email,
  profileImage,
}: IProfileModalProps) {
  const router = useRouter();

  const handleMyPageBtnClick = (): void => {
    router.push('/myPage');
  };

  const handleMyJudgeBtnClick = (): void => {
    router.push('/myPage/judgeRecord');
  };

  const handleMyPostBtnClick = (): void => {
    router.push('/myPage/myPosts');
  };

  return (
    <>
      <div
        className='w-[250px] h-[205px] border border-[#8A1F21] rounded-[18px] p-[13px] bg-[#FFFFFF] z-50'
        style={{ position: 'absolute', transform: 'translate(-90px,130px)' }}
      >
        <div className='flex flex-col gap-[8.5px]'>
          <div className='flex flex-row gap-[10px] mb-[9px]'>
            <img
              src={profileImage}
              alt='profileImage'
              className='h-[2.2rem] w-[2.2rem] rounded-full'
            />
            <div className='flex-col gap-[15px]'>
              <p className='text-[14px] font-semibold text-[#000000]'>{nickname}</p>
              <p className='text-[12px] font-medium text-[#555555]'>@ {email}</p>
            </div>
          </div>

          <div className='flex flex-row gap-[10px] pl-[11.5px]'>
            <Image alt='myPageIcon' src={myPageIcon} width={16} height={16} />
            <span
              className='text-[14px] text-[#828282] cursor-pointer'
              onClick={handleMyPageBtnClick}
            >
              마이페이지
            </span>
          </div>
          <hr />
          <div className='flex flex-row gap-[10px] pl-[11.5px]'>
            <Image alt='myPostIcon' src={myPostIcon} width={16} height={16} />
            <span
              className='text-[12px] text-[#828282] cursor-pointer'
              onClick={handleMyPostBtnClick}
            >
              내가 쓴 글
            </span>
          </div>
          <div className='flex flex-row gap-[10px] pl-[11.5px]'>
            <Image alt='myJudgeIcon' src={myJudgeIcon} width={16} height={16} />
            <span
              className='text-[12px] text-[#828282] cursor-pointer'
              onClick={handleMyJudgeBtnClick}
            >
              내가 내린 판결
            </span>
          </div>
          <hr />
          <div className='flex flex-row gap-[10px] pl-[11.5px]'>
            <Image alt='logoutIcon' src={logoutIcon} width={16} height={16} />
            <span className='text-[14px] text-[#828282] cursor-pointer' onClick={handleLogoutClick}>
              로그아웃
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
