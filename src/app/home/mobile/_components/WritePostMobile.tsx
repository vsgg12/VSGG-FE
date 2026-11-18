import Default_Profile from '../../../../../public/svg/defaultProfile.svg';
import Image from 'next/image';

// interface Props {
//   handleWriteClick: () => void;
// }

function WritePostMobile() {
  return (
    <div
      className='w-full h-[100px] flex flex-row px-[18px] py-[12px] gap-[10px] bg-semantic-background-surface relative'
      style={{ boxShadow: '4px 4px 8px 0 var(--color-shadow-subtle)' }}
    >
      <Image src={Default_Profile} width={30} height={30} alt='profile' className='self-start' />
      <div className='flex flex-col flex-1 gap-[2px]'>
        <p className='text-[14px] text-semantic-text-secondary font-medium leading-[24px] tracking-[-0.28px]'>
          우리 팀 플레이의 과실이 궁금하다면?
        </p>
        <p className='text-[12px] text-semantic-text-disabled font-medium leading-[18px] tracking-[-0.24px]'>
          바텀 다이브 왜 안 함? 한타 구도가 이게 맞아? 진짜 너무 억울함
          <br />
          우리팀이 넘 밉다..........
        </p>
      </div>
      <button className='absolute bottom-[12px] right-[18px] px-[14px] h-[22px] rounded-[50px] bg-semantic-text-primary text-semantic-text-inverse text-[12px] font-semibold whitespace-nowrap flex items-center'>
        글 작성하기
      </button>
    </div>
  );
}

export default WritePostMobile;
