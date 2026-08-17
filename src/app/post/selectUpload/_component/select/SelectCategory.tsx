import Image from 'next/image';
import judgeIcon from '../../../../../../public/svg/postWrite/judgeIcon.svg';

interface Props {
  onClickJudgeFault: () => void;
  onClickJudgeChampion: () => void;
}

export const SelectCategory = ({ onClickJudgeFault, onClickJudgeChampion }: Props) => {
  return (
    <>
      <div className='w-full h-[202px] flex flex-col gap-[40px] justify-center items-center'>
        <Image width={138} height={138} alt={'videoIcon'} src={judgeIcon} />
        <div className='text-[32px] font-bold text-semantic-text-primary'>
          원하는 판결 등록 방식을 선택해주세요
        </div>
      </div>
      <div className='flex h-[256px] w-[684px] gap-[20px]'>
        <div
          className='flex h-full w-[332px] cursor-pointer flex-col items-center justify-between rounded-[10px] border-[0.5px] border-semantic-border-default bg-semantic-background-surface p-[15px] hover:border-primary-500'
          onClick={onClickJudgeFault}
        >
          <div className='text-[20px] font-bold text-semantic-text-primary'>챔피언 판결</div>
          <img
            src={'/images/postWrite/championJudgeImage.png'}
            alt={'챔피언 판결 이미지'}
            width={272}
            height={131}
          />
          <div className='text-[20px] text-semantic-text-primary'>
            챔피언 별 과실을 선택하는 방식
          </div>
        </div>
        <div
          className='flex h-full w-[332px] cursor-pointer flex-col items-center justify-between rounded-[10px] border-[0.5px] border-semantic-border-default bg-semantic-background-surface p-[15px] hover:border-primary-500'
          onClick={onClickJudgeChampion}
        >
          <div className='text-[20px] font-bold text-semantic-text-primary'>주장 판결</div>
          <img
            src={'/images/postWrite/claimJudgeImage.png'}
            alt={'주장 판결 이미지'}
            width={272}
            height={93}
          />
          <div className='text-[20px] text-semantic-text-primary'>
            두 소환사의 주장 중 선택하는 방식
          </div>
        </div>
      </div>
    </>
  );
};
