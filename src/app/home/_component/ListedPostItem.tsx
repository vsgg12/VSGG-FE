import PostDeadLine from '@/components/PostDeadLine';
import { formatNumberWithCommas } from '@/utils/formatNumberWithCommas';
import moment from 'moment';
import { useRouter } from 'next/navigation';

interface IListedItem {
  post: IGetPostDTOType;
}

export default function ListedPostItem({ post }: IListedItem) {
  const router = useRouter();
  return (
    <div
      className='flex flex-col w-full h-[135px] bg-white mb-[20px] rounded-[30px] p-[30px] gap-[10px] cursor-pointer'
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
        <div className='text-black text-[25px]'>{post.title}</div>
        <div className='text-[#C8C8C8] flex-grow'>
          | 조회수 {formatNumberWithCommas(post.viewCount)}
        </div>
        <PostDeadLine deadLine={post.daysUntilEnd} />
      </div>
    </div>
  );
}
