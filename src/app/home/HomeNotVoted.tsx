export default function HomeNotVoted() {
  return (
    <>
      <div className='flex flex-row items-center  text-[0.625em]'>
        <div className='flex flex-col'>
          <div className='mb-1 flex flex-row items-center'>
            <div className='p-voting-champ-dot bg-[#000000]'></div>
            <div className='whitespace-nowrap'>트위스티드 페이트</div>
          </div>
          <div className='mb-1  flex flex-row items-center'>
            <div className='p-voting-champ-dot bg-[#9D2A2C]'></div>
            <div className='whitespace-nowrap'>블리츠크랭크</div>
          </div>
          <div className='mb-1 flex flex-row items-center'>
            <div className='p-voting-champ-dot bg-[#CACACA]'></div>
            <div className='whitespace-nowrap'>아우렐리온 솔</div>
          </div>
          <div className='mb-1 flex flex-row items-center'>
            <div className='p-voting-champ-dot bg-[#656565]'></div>
            <div className='whitespace-nowrap'>레나타 글라스크</div>
          </div>
          <div className='mb-1 flex flex-row items-center'>
            <div className='p-voting-champ-dot bg-[#6C0000]'></div>
            <div className='whitespace-nowrap'>누누와 윌럼프</div>
          </div>
        </div>
        <div className='flex flex-col items-center'>
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
            <div className='p-voing-bar-element bg-[#9D2A2C]'></div>
            <div className='p-voing-bar-element bg-[#9D2A2C]'></div>
            <div className='p-voing-bar-element bg-[#CACACA]'></div>
            <div className='p-voing-bar-element bg-[#CACACA]'></div>
            <div className='p-voing-bar-element bg-[#656565]'></div>
            <div className='p-voing-bar-element bg-[#656565]'></div>
            <div className='p-voing-bar-element bg-[#6C0000]'></div>
            <div className='p-voing-bar-element rounded-r-[30px] bg-[#6C0000]'></div>
          </div>
        </div>
      </div>
      <div className='absolute right-[35%] top-5 flex h-[6rem] flex-col items-center justify-center rounded-[5px] bg-[#ffffff] p-2 shadow-md'>
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
