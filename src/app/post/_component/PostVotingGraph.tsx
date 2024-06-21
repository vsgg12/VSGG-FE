// 막대 그래프(투표 결과)
export default function PostVotingGraph() {
  return (
    <>
      <div className='flex  flex-col items-center'>
        <div className='p-content-s-mb flex flex-row'>
          <div className='p-voting-number-element text-[#000000] '>2 </div>
          <div className='p-voting-number-element '> : </div>
          <div className='p-voting-number-element text-[#9D2A2C]'>2 </div>
          <div className='p-voting-number-element '> : </div>
          <div className='p-voting-number-element text-[#CACACA]'>2 </div>
          <div className='p-voting-number-element '> : </div>
          <div className='p-voting-number-element text-[#656565] '>2 </div>
          <div className='p-voting-number-element '> : </div>
          <div className='p-voting-number-element text-[#6C0000] '>2 </div>
        </div>
        <div className='p-content-s-mb flex flex-row'>
          <div className='p-voing-bar-element rounded-l-[30px] bg-[#000000]'></div>
          <div className='p-voing-bar-element bg-[#000000]'></div>
          <div className='p-voing-bar-element'></div>
          <div className='p-voing-bar-element'></div>
          <div className='p-voing-bar-element'></div>
          <div className='p-voing-bar-element'></div>
          <div className='p-voing-bar-element'></div>
          <div className='p-voing-bar-element'></div>
          <div className='p-voing-bar-element'></div>
          <div className='p-voing-bar-element rounded-r-[30px]'></div>
        </div>
      </div>
    </>
  );
}
