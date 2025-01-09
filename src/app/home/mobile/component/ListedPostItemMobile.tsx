import { formatNumberWithCommas } from '@/utils/formatNumberWithCommas';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import PostDeadLineMobile from './PostDeadLineMobile';
import { useEffect, useState } from 'react';

interface IListedItem {
  post: IGetPostDTOType;
}

export default function ListedPostItemMobile({ post }: IListedItem) {
  const [formattedDate, setFormattedDate] = useState<string>();

  useEffect(() => {
    setFormattedDate(moment(post.createdAt).format('YYYY.MM.DD. HH:mm'));
  }, [post]);
  const router = useRouter();
  return (
    <div
      className='flex flex-col w-full h-[135px] bg-white mb-[20px] rounded-[30px] p-[30px] gap-[10px] cursor-pointer'
      onClick={() => {
        router.push(`/post/${post.id}/`);
      }}
    >
      {/* <div className='flex'>
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
      </div> */}
      <div className='flex w-full justify-between'>
        <div className='flex gap-[8px]'>
          <img
            className='h-[32px] w-[32px] rounded-full'
            src={
              post.memberDTO.profileImage === null
                ? 'https://ssl.pstatic.net/static/pwe/address/img_profile.png'
                : post.memberDTO.profileImage
            }
          />
          <div className='flex flex-col'>
            <div className='flex gap-[8px]'>
              <p className='text-[12px] text-[#333333]'>{post.memberDTO.nickname}</p>
              <p className='text-[12px] text-[#909090]'>{post.memberDTO.tier}</p>
            </div>
            <p className='text-[12px] text-[#C8C8C8]'>{formattedDate}</p>
          </div>
        </div>
        <PostDeadLineMobile deadLine={post.daysUntilEnd} />
      </div>
      <div>
        <p className='text-black text-[15px]'>
          {post.title}
          <span className='text-[#C8C8C8] text-[12px] ml-[10px]'>
            | 조회수 {formatNumberWithCommas(post.viewCount)}
          </span>
        </p>
      </div>
    </div>
  );
}
