import DoughnutChart from '@/components/DoughnutChart';
import { voteColors } from '@/data/championData';

export default function HomeVoted({ voteInfos }: { voteInfos: IGetInGameInfoListType[] }) {
  return (
    <>
      <div className='flex h-full rounded-[1.875em] items-center'>
        <div className='flex items-center justify-center p-[1rem] text-[0.625em] gap-[90px]'>
          <div className='flex flex-col'>
            {voteInfos.map((champion, index) => {
              // 여기서 voteColors 배열의 길이를 넘지 않는지 확인
              const voteColor = voteColors[index % voteColors.length];
              return (
                <div key={index} className='mb-1 flex flex-row items-center'>
                  <div className={`${voteColor.background} p-voting-champ-dot`}></div>
                  <div className='whitespace-nowrap'>{champion.championName}</div>
                </div>
              );
            })}
          </div>
          <DoughnutChart voteInfos={voteInfos} size='home' />
        </div>
      </div>
    </>
  );
}
