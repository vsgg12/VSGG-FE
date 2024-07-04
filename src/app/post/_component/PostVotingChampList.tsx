export default function PostVotingChampList({
  voteInfos,
}: {
  voteInfos: IGetInGameInfoListType[];
}) {
  return (
    <>
      {voteInfos && voteInfos.length === 0 ? (
        <></>
      ) : (
        <div className='flex flex-col'>
          {voteInfos.map((champion, index) => (
            <div key={index} className='mb-1 flex flex-row items-center'>
              <div className={`p-voting-champ-dot`}></div>
              <div className='whitespace-nowrap'>{champion.championName}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
