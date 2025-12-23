import Image from 'next/image';
import judgeIcon from '../../../../../public/svg/postWrite/judgeIcon.svg';

interface Props {
  onClickJudgeChampion: () => void;
  onClickJudgeClaim: () => void;
}

export const SelectJudgeType = ({ onClickJudgeChampion, onClickJudgeClaim }: Props) => {
  return (
    <>
      <div className='w-full h-[202px] flex flex-col gap-[40px] justify-center items-center'>
        <Image width={138} height={138} alt={'videoIcon'} src={judgeIcon} />
        <div className='text-[32px] font-bold text-[#222222]'>
          원하는 판결 등록 방식을 선택해주세요
        </div>
      </div>
      <div className='w-[684px] h-[256px] flex gap-[20px] bg-white'>
        <div
          className='w-[332px] h-full rounded-[10px] border-[#C8C8C8] border-[0.5px] flex flex-col items-center justify-between p-[15px] cursor-pointer hover:border-[#8A1F21]'
          onClick={onClickJudgeChampion}
        >
          <div className={'font-bold text-[20px] text-[#222222]'}>챔피언 판결</div>
          <img
            src={'/images/postWrite/championJudgeImage.png'}
            alt={'챔피언 판결 이미지'}
            width={272}
            height={131}
          />
          <div className={'text-[#000000] text-[20px]'}>챔피언 별 과실을 선택하는 방식</div>
        </div>
        <div
          className='w-[332px] h-full rounded-[10px] border-[#C8C8C8] border-[0.5px] flex flex-col items-center justify-between p-[15px] cursor-pointer hover:border-[#8A1F21]'
          onClick={onClickJudgeClaim}
        >
          <div className={'font-bold text-[20px] text-[#222222]'}>주장 판결</div>
          <img
            src={'/images/postWrite/claimJudgeImage.png'}
            alt={'주장 판결 이미지'}
            width={272}
            height={93}
          />
          <div className={'text-[#000000] text-[20px]'}>두 소환사의 주장 중 선택하는 방식</div>
        </div>
      </div>
    </>
  );
};
