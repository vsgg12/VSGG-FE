import moment from 'moment';
import React from 'react';
import DOMPurify from 'dompurify';
import { useRouter } from 'next/navigation';
import { useSidebarStore } from '@/store/useSidebarStore';

interface Props {
  postItem: IGetPostDTOType;
}

function SearchItem({ postItem }: Props) {
  const router = useRouter();
  const { setRouteState } = useSidebarStore();

  const handleClick = () => {
    setRouteState('HOME');
    router.push(`/post/${postItem.id}`);
  };

  const extractText = (htmlString: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = DOMPurify.sanitize(htmlString);
    return tempDiv.textContent || '';
  };

  const truncateNickname = (value: string) => {
    if (value.length > 8) {
      return value.slice(0, 8) + '...';
    }
    return value;
  };

  const formatDate = (value: string) => {
    return moment(value).format('YYYY-MM-DD');
  };

  return (
    <div
      className='w-full h-[150px] flex justify-center flex-col gap-[10px] cursor-pointer'
      onClick={handleClick}
    >
      <div className='flex w-full justify-between '>
        <div className='flex flex-col gap-[10px] w-[192px]'>
          <div className='flex text-[14px] text-[#AAAAAA] justify-between'>
            <div>{truncateNickname(postItem.memberDTO.nickname)}</div>
            <div className='font-medium'>{formatDate(postItem.createdAt)}</div>
          </div>
          <div className='text-[16px] font-medium text-[#333333] line-clamp-2'>
            {postItem.title}
          </div>
        </div>

        <div className='w-[117px] h-[66px] rounded-[5px]'>
          <img src={postItem.thumbnailURL} className='w-full h-full rounded-[5px]' />
        </div>
      </div>

      <div className='w-full text-[14px] text-[#777777] truncate whitespace-nowrap overflow-hidden'>
        {extractText(postItem.content)}
      </div>
    </div>
  );
}

export default SearchItem;
