import PostVotingChampList from '@/app/post/_component/PostVotingChampList';
import DoughnutChartMobile from './DoughnutChartMobile';

export default function HomeNotVotedMobile({ voteInfos }: { voteInfos: IGetInGameInfoType[] }) {
  return (
    <div className='flex w-full h-full items-center rounded-[10px] justify-center bg-gradient-to-b from-[#D9D9D9]/30 to-[#FFFFFF]/30'>
      <PostVotingChampList voteInfos={voteInfos} />
      <DoughnutChartMobile voteInfos={voteInfos} size='home' />
      <div
        className='flex min-w-[261px] h-[120px] flex-col items-center justify-center rounded-[10px] bg-[#ffffff] p-2 shadow-md'
        style={{
          position: 'absolute',
          transform: 'translate(0%,10%)',
        }}
      >
        <div className='mb-2 text-center text-[12px]'>
          판결이 궁금하시다구요? <br />
          판결에 참여하고, 결과를 확인하세요
        </div>
        <button className='min-w-[160px] rounded-[30px] bg-[#8A1F21] px-[10px] py-[5px] text-[14px] text-white text-nowrap'>
          지금 바로 판결하기
        </button>
      </div>
    </div>
  );
}
