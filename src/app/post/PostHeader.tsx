export default function PostHeader(): JSX.Element {
  return (
    <>
      <div className='flex w-full flex-row place-items-start justify-between font-medium'>
        <div className='p-content-s-mb text-[25px]'>게시물 제목</div>
        <div className='text-[12px] text-[#C8C8C8]'>조회수</div>
      </div>
    </>
  );
}
