'use client';
import PostTag from '@/app/post/_component/PostTag';
import HomeNotVoted from './HomeNotVoted';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import HomeVoted from './HomeVoted';
import { useEffect, useState } from 'react';
import moment from 'moment';
import useConvertHTML from '@/hooks/useConvertHTML';
import { useAuthStore } from '@/app/login/store/useAuthStore';

export default function HomePostItems({
  post,
  voteInfos,
}: {
  post: IGetPostDTOType;
  voteInfos: IGetVoteType[];
}) {
  const router = useRouter();
  const [formattedDate, setFormattedDate] = useState<string>();
  const contentsArr = useConvertHTML(post.content);
  const { user } = useAuthStore.getState();
  const [isImageClick, setIsImageClick] = useState<boolean>(false);


  useEffect(() => {
    setFormattedDate(moment(post.createdAt).format('YYYY-MM-DD'));
  }, [post]);

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
    setIsImageClick(true);
  };

  return (
    <div className='min-h-[calc(100vh-504px)] flex flex-col'>
      <div>
        {post && (
          <div
            className='px-[55px] pt-[40px] pb-[30px] h-fit w-full mb-[50px] rounded-[1.875rem] bg-[#ffffff] cursor-pointer'
            onClick={() => {
              router.push(`/post/${post.id}/`);
            }}
          >
            <div className='flex w-full flex-row justify-between font-medium'>
              <div className='p-content-s-mb text-[1.563rem]'>{post.title}</div>
              <div className='text-[0.75rem] text-[#C8C8C8]'>조회수 {post.viewCount}</div>
            </div>
            <div className='p-content-s-mb flex flex-row items-center justify-start font-medium'>
              <IoPersonCircleSharp className='mr-[0.625rem] h-[2.5rem] w-[2.5rem] rounded-full  text-[#D9D9D9]' />
              <div>
                <div className='flex flex-row'>
                  <div className='mr-[0.625rem] text-[0.75rem] text-[#333333]'>
                    {post.memberDTO.nickname}
                  </div>
                  <div className='text-[0.75rem] text-[#909090]'>{post.memberDTO.tier}</div>
                </div>
                <div className='text-[0.75rem] text-[#C8C8C8]'>{formattedDate}</div>
              </div>
            </div>
            <div className='flex h-fit flex-row'>
              {isImageClick ? (
                <video
                  muted
                  controls
                  autoPlay
                  className='p-content-rounded p-content-s-mb p-content-mr aspect-video h-full w-[50%]'
                >
                  <source src={post.video.url} type='video/webm' />
                </video>
              ) : post.thumbnailURL ? (
                <img
                  className='p-content-rounded p-content-s-mb p-content-mr aspect-video h-full w-[50%]'
                  src={post.thumbnailURL}
                  onClick={handleImageClick}
                />
              ) : post.video.type === 'FILE' ? (
                <video
                  muted
                  controls
                  className='p-content-rounded p-content-s-mb p-content-mr aspect-video h-full w-[50%]'
                >
                  <source src={post.video.url} type='video/webm' />
                </video>
              ) : (
                //외부영상 첨부할 때 사용
                <iframe
                  className='p-content-rounded p-content-s-mb p-content-mr aspect-video h-full w-[50%]'
                  src={post.video.url}
                  title={post.title}
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  referrerPolicy='strict-origin-when-cross-origin'
                  allowFullScreen
                ></iframe>
              )}
              <div className='flex flex-col overflow-hidden w-[50%] mb-5'>
                <div className='mb-1 line-clamp-[8] h-[50%] overflow-hidden text-ellipsis decoration-solid'>
                  {contentsArr.pTags.map((content, idx) => (
                    <p key={idx}>{content}</p>
                  ))}
                </div>
                <div className='relative flex h-[167px] items-center justify-center rounded-[1.875rem] bg-gradient-to-b from-[#ADADAD]/30 to-[#DCDCDC]/30'>
                  {post.isVote || post.memberDTO.nickname === user?.nickname ? (
                    <HomeVoted voteInfos={voteInfos} />
                  ) : (
                    <HomeNotVoted voteInfos={voteInfos} />
                  )}
                </div>
              </div>
            </div>
            <PostTag hashtags={post.hashtagList} />
          </div>
        )}
      </div>
    </div>
  );
}
