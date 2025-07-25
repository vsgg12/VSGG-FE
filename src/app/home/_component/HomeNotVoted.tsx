import PostVotingChampList from '@/app/post/_component/PostVotingChampList';
import DoughnutChart from '@/components/DoughnutChart';

interface Props {
  voteInfos: IGetInGameInfoType[];
}

export default function HomeNotVoted({ voteInfos }: Props) {
  return (
    <div className='bg-gradient-to-b from-[#ADADAD]/30 to-[#DCDCDC]/30 flex h-[156px] w-[526px] rounded-[20px] items-center justify-center'>
      <div className='flex items-center justify-center gap-[80px]'>
        <PostVotingChampList voteInfos={voteInfos} />
        <DoughnutChart voteInfos={voteInfos} size='home' />
      </div>
      <div
        className='flex h-[137px] w-[268px] flex-col items-center justify-center rounded-[5px] bg-[#ffffff] p-2 shadow-md'
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
    </div>
  );
}
