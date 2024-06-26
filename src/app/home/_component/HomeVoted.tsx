import PostVotingChampList from '@/app/post/_component/PostVotingChampList';
import { inGameInfo } from '@/app/post/_component/VoteResult';
import DoughnutChart from '@/components/DoughnutChart';

export default function HomeVoted() {
  return (
    <>
      <div className='flex h-full rounded-[1.875em] items-center'>
        <div className='flex items-center justify-center p-[1rem] text-[0.625em] gap-[90px]'>
          <PostVotingChampList />
          <DoughnutChart voteAVGInfos={inGameInfo} size='home'/>
        </div>
      </div>
    </>
  );
}
