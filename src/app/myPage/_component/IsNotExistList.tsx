import React from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  type: 'myPost' | 'myJudge';
}

function IsNotExistList({ type }: Props) {
  const router = useRouter();

  const handleBtnClick = () => {
    if (type === 'myPost') {
      router.push('/post/write');
    } else {
      router.push('/home');
    }
  };

  return (
    <div className='w-[202px] h-[101px] flex flex-col justify-center gap-[10px] bg-white items-center'>
      <div className='text-black text-[16px] font-medium flex flex-col justify-center items-center '>
        <p>{type === 'myPost' ? '아직 게시된 글이 없어요' : '아직 참여한 판결이 없어요'}</p>
        <p>{type === 'myPost' ? '내 플레이의 과실이 궁금하다면?' : '첫 판결을 진행해 보세요!'}</p>
      </div>
      <div className='rounded-[30px] text-white bg-[#8A1F21] w-[153px] h-[45px] flex justify-center text-[16px] font-extrabold items-center cursor-pointer'>
        <div onClick={handleBtnClick}>{type === 'myPost' ? '게시글 작성' : '판결하기'}</div>
      </div>
    </div>
  );
}

export default IsNotExistList;
