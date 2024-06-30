export default function Comment({
  comment,
}: {
  comment: IGetCommentItemType;
  deleteComment: () => void;
}) {
  return (
    <>
      <div>
        <div className='flex flex-row relative font-medium'>
          <div className=' mr-[6px] text-[10px] text-[#333333]'>{comment.member.nickname}</div>
          <div className='text-[10px] text-[#666666]'>{comment.member.tier}</div>
          {/* <p
            className='absolute end-0 text-[10px] text-[#d34747] cursor-pointer'
            onClick={deleteComment}
          >
            삭제
          </p> */}
        </div>

        <div>
          {/* {  <p className='text=[8A1F21]'>{comment.member.nickname}</p>} */}
          {comment.content}
        </div>
      </div>
    </>
  );
}
