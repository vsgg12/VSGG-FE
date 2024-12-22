import { voteColors } from '@/data/championData';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Doughnut from '../../../../../public/svg/Douhnut_small.svg';
import DoughnutChartMobile from './DoughnutChartMobile';

export default function HomeVotedMobile({
  voteInfos,
  isFinished,
}: {
  voteInfos: IGetInGameInfoType[];
  isFinished: boolean;
}) {
  const [isNoOneVoted, setIsNoOneVoted] = useState<boolean>(false);
  const [votes, setVotes] = useState<IGetInGameInfoType[]>();
  useEffect(() => {
    if (voteInfos) {
      const filterVotes = voteInfos.filter((voteInfo) => voteInfo.averageRatio === 0);
      setVotes(filterVotes);
    }
  }, [voteInfos, isNoOneVoted]);

  useEffect(() => {
    if (votes && voteInfos && voteInfos.length === votes.length) {
      setIsNoOneVoted(true);
    }
  }, [votes]);

  return (
    <div className='flex h-[150px] w-[350px] rounded-[1.875em] items-center'>
      <div className='flex flex-col'>
        {voteInfos.map((champion, index) => {
          // voteColors 배열의 길이를 넘지 않는지 확인
          const voteColor = voteColors[index % voteColors.length];
          if (!isNoOneVoted) {
            return (
              <div key={index} className='mb-1 flex flex-row items-center'>
                <div className={`${voteColor.background} p-voting-champ-dot`}></div>
                <div className='whitespace-nowrap'>{champion.championName}</div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
      {isNoOneVoted ? (
        <div className='flex relative w-[350px] justify-center'>
          <p className='flex justify-center items-center absolute text-[16px] inset-0 text-[#828282]'>
            {isFinished
              ? '투표한 사람이 없는 게시글입니다.'
              : '아직 투표한 사람이 없는 게시글입니다.'}
          </p>
          <Image src={Doughnut} width={146} height={146} alt='doughnut' />
        </div>
      ) : (
        <DoughnutChartMobile voteInfos={voteInfos} size='home' />
      )}
    </div>
  );
}
