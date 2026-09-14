import { voteColors } from '@/data/championData';

interface Props {
  voteInfos: IGetInGameInfoType[];
}

export default function PostVotingChampList({ voteInfos }: Props) {
  return (
    <>
      {voteInfos && voteInfos.length === 0 ? (
        <></>
      ) : (
        <div className='flex flex-col gap-[14px]'>
          {voteInfos.map((champion, index) => {
            // voteColors 배열의 길이를 넘지 않는지 확인
            const voteColor = voteColors[index % voteColors.length];
            return (
              <div key={index} className='flex items-center gap-[10px]'>
                <div className={`${voteColor.background} p-voting-champ-dot`}></div>
                <p className='whitespace-nowrap text-[12px] text-gray-850'>
                  {champion.championName}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
