'use client';

import moment from 'moment';
import { useRouter } from 'next/navigation';
import DOMPurify from 'dompurify';
import { truncateText } from '@/utils/truncateText';
import { useSidebarStore } from '@/store/sidebar/useSidebarStore';

interface Props {
  postItem: IGetPostDTOType;
}

function SearchItem({ postItem }: Props) {
  const router = useRouter();
  const { setRouteState } = useSidebarStore();

  // 게시글 클릭 시 해당 게시글 페이지로 이동
  const handleClick = () => {
    setRouteState('HOME');
    router.push(`/post/${postItem.id}`);
  };

  // HTML 태그 제거하고 텍스트만 추출
  const extractText = (htmlString: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = DOMPurify.sanitize(htmlString);
    return tempDiv.textContent || '';
  };

  // 날짜 포맷 변환
  const formatDate = (value: string) => {
    return moment(value).format('YYYY.MM.DD');
  };

  return (
    <div
      className='w-full flex flex-col gap-[10px] px-[16px] py-[24px] cursor-pointer bg-white'
      onClick={handleClick}
    >
      {/* 상단: 닉네임/날짜 + 썸네일 */}
      <div className='flex w-full justify-between items-start'>
        <div className='flex flex-col gap-[6px] flex-1 pr-[10px]'>
          {/* 닉네임 + 날짜 */}
          <div className='flex text-[14px] text-[#AEB1B2] justify-between'>
            <span className='font-normal'>{truncateText(postItem.memberDTO.nickname, 8)}</span>
            <span className='font-bold'>{formatDate(postItem.createdAt)}</span>
          </div>
          {/* 제목 */}
          <p className='text-[16px] font-medium text-[#242526] leading-[22px] tracking-[-0.32px] line-clamp-2 h-[44px]'>
            {postItem.title}
          </p>
        </div>
        {/* 썸네일 이미지 */}
        <div className='w-[117px] h-[66px] flex-shrink-0'>
          <img
            src={postItem.thumbnailURL}
            className='w-full h-full rounded-[5px] object-cover'
            alt='썸네일 이미지'
          />
        </div>
      </div>
      {/* 내용 */}
      <p className='text-[14px] text-[#787C80] font-normal leading-[24px] tracking-[-0.28px] line-clamp-1'>
        {extractText(postItem.content)}
      </p>
    </div>
  );
}

export default SearchItem;