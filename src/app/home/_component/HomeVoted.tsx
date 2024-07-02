import PostVotingChampList from '@/app/post/_component/PostVotingChampList';
import DoughnutChart from '@/components/DoughnutChart';

export default function HomeVoted({ voteInfos }: { voteInfos: IGetVoteType[] }) {
  return (
    <>
      <div className='flex h-full rounded-[1.875em] items-center'>
        <div className='flex items-center justify-center p-[1rem] text-[0.625em] gap-[90px]'>
          <PostVotingChampList />
          <DoughnutChart voteInfos={voteInfos} size='home' />
        </div>
      </div>
    </>
  );
}
