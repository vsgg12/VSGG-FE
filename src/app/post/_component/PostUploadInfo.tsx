export default function PostUploadInfo(): JSX.Element {
  return (
    <>
      <div className='p-content-s-mb flex flex-row items-center justify-start font-medium'>
        <div className='mr-[10px] h-[32px] w-[32px] rounded-full bg-[#D9D9D9]'></div>
        <div>
          <div className='flex flex-row'>
            <div className=' mr-[6px] text-[12px] text-[#333333]'>닉네임</div>
            <div className='text-[12px] text-[#909090]'>등급</div>
          </div>
          <div className='text-[12px] text-[#C8C8C8]'>작성 일자</div>
        </div>
      </div>
    </>
  );
}
