import DoughnutChart from '@/components/DoughnutChart';
import PostVotingChampList from '@/app/post/_component/PostVotingChampList';

export default function HomeVoted({ voteInfos }: { voteInfos: IGetInGameInfoType[] }) {
  return (
    <div className='flex h-[156px] w-[586px] rounded-[20px] bg-[#FFFFFF] items-center justify-center'>
      <div className='flex gap-[50px]'>
        <div className='flex items-center justify-center gap-[90px]'>
          <PostVotingChampList voteInfos={voteInfos} />
          <DoughnutChart voteInfos={voteInfos} size='home' />
        </div>
      </div>
    </div>
  );
}
