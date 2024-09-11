// import Image from 'next/image';
// import Icon_timer from '../../../../public/svg/timer.svg';
import moment from 'moment';
import { useRouter } from 'next/navigation';

interface IListedItem {
  post: IGetPostDTOType;
}

export default function ListedPostItem({ post }: IListedItem) {
  const router = useRouter();
  return (
    <div
      className='flex flex-col w-[1205px] h-[135px] bg-white mb-[20px] rounded-[30px] p-[30px] gap-[10px] cursor-pointer'
      onClick={() => {
        router.push(`/post/${post.id}/`);
      }}
    >
      <div className='flex'>
        <div className='flex flex-grow gap-[8px]'>
          <p className='text-[12px]'>{post.memberDTO.nickname}</p>
          <p className='text-[#909090] text-[12px]'>{post.memberDTO.tier}</p>
        </div>
        <p className='text-[#C8C8C8] text-[12px]'>{moment(post.createdAt).format('YYYY-MM-DD')}</p>
      </div>
      <div className='flex justify-center items-center gap-[5px]'>
        <p className='text-black text-[25px]'>{post.title}</p>
        <p className='text-[#C8C8C8] flex-grow'>| 조회수 {post.viewCount}</p>
        {/* <div className='flex items-center justify-center gap-[5px] text-[18px] text-white w-[182px] h-[28px] rounded-[20px] bg-[#8A1F21]'>
          <Image src={Icon_timer} width={20} height={20} alt='timer' />
          투표 마감까지 일
        </div> */}
      </div>
    </div>
  );
}
