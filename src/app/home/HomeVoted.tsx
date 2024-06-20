import DoughnutChart from '@/components/DoughnutChart';
import PostVotingChampList from '../post/PostVotingChampList';
import { inGameInfo } from '../post/VoteResult';

export default function HomeVoted() {
  return (
    <>
      <div className='flex h-full rounded-[1.875em] items-center'>
        <div className='flex items-center justify-center p-[1rem] text-[0.625em] gap-[30px]'>
          <PostVotingChampList />
          <DoughnutChart ingameInfos={inGameInfo} />
        </div>
      </div>
    </>
  );
}
