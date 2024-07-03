import PostVotingChampList from '@/app/post/_component/PostVotingChampList';
import DoughnutChart from '@/components/DoughnutChart';

export default function HomeNotVoted({ voteInfos }: { voteInfos: IGetVoteType[] }) {
  return (
    <>
      <div className='flex h-full rounded-[1.875em] items-center'>
        <div className='flex items-center justify-center p-[1rem] text-[0.625em] gap-[90px] blur-sm'>
          <PostVotingChampList />
          <DoughnutChart voteInfos={voteInfos} size='home' />
        </div>
      </div>
      <div
        className='flex h-[70%] w-[16rem] flex-col items-center justify-center rounded-[5px] bg-[#ffffff] p-2 shadow-md'
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className='mb-2 text-center text-[10px]'>
          판결이 궁금하시다구요? <br />
          판결에 참여하고, 결과를 확인하세요
        </div>
        <button className='w-[10rem] rounded-[5px] bg-[#8A1F21] px-[10px] py-[5px] text-[10px] text-white'>
          지금 바로 판결하기
        </button>
      </div>
    </>
  );
}
