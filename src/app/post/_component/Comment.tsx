export default function Comment() {
  return (
    <>
      <div>
        <div className='flex flex-row font-medium'>
          <div className=' mr-[6px] text-[10px] text-[#333333]'>댓글 작성자 닉네임</div>
          <div className='text-[10px] text-[#666666]'>댓글 작성자 티어</div>
        </div>
        <div>댓글 내용</div>
      </div>
    </>
  );
}
