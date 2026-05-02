'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useConvertHTML from '@/hooks/useConvertHTML';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import PostDeadLineMobile from './PostDeadLineMobile';
import useProfileTierIcon from '@/hooks/sidebar/useProfileTierIcon';
import useTimeDifferenceFromNow from '@/hooks/useTimeDifferenceFromNow';
import ChampionVoteBoxMobile from './ChampionVoteBoxMobile';

export default function PostItemMobile({
  post,
  voteInfos,
}: {
  post: IGetPostDTOType;
  voteInfos: IGetInGameInfoType[];
}) {
  const router = useRouter();
  const { getIcon } = useProfileTierIcon({ size: 16 });
  const timeAgo = useTimeDifferenceFromNow(post.createdAt);
  const contentsArr = useConvertHTML(post.content);
  const { user } = useAuthStore();
  const [isImageClick, setIsImageClick] = useState<boolean>(false);
  const videoStyle = 'rounded-[14px] aspect-video w-[full] h-fit block visible';

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
    setIsImageClick(true);
  };

  const getYoutubeId = (url: string) => {
    const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  return (
    <div
      className='h-fit w-full bg-[#ffffff] cursor-pointer flex flex-col mb-[4px] px-[18px] py-[12px] gap-[15px]'
      onClick={() => {
        router.push(`/post/${post.id}`);
      }}
    >
      <div className='flex w-full justify-between'>
        <div className='flex items-center'>
          <img
            src={
              !post.memberDTO.profileImage
                ? 'https://ssl.pstatic.net/static/pwe/address/img_profile.png'
                : post.memberDTO.profileImage
            }
            className='mr-[0.625rem] h-[30px] w-[30px] rounded-full text-[#D9D9D9]'
          />
          <div className='flex gap-[5px] text-[12px]'>
            {getIcon(post.memberDTO.tier)}
            <p>{post.memberDTO.nickname}</p>
            <p className='text-[#C8C8C8] ml-[px]'>{timeAgo}</p>
          </div>
        </div>
        <PostDeadLineMobile deadLine={post.daysUntilEnd} />
      </div>
      <div className='flex flex-col gap-[10px]'>
        <p className='text-black text-[16px] whitespace-wrap'>{post.title}</p>
        <p className='text-[16px] w-full whitespace-nowrap overflow-hidden truncate'>
          {contentsArr.pTags[0]}
        </p>
      </div>
      <div>
        {isImageClick ? (
          <video
            muted
            controls
            autoPlay
            poster={post.thumbnailURL}
            className={`block visible ${videoStyle}`}
            onClick={(e) => e.stopPropagation}
          >
            <source src={post.video.url} type='video/mp4' />
            <source src={post.video.url} type='video/webm' />
          </video>
        ) : post.thumbnailURL ? (
          <img
            className={videoStyle}
            src={post.thumbnailURL}
            onClick={handleImageClick}
            alt={'thumbnail'}
          />
        ) : post.video.type === 'FILE' ? (
          <video
            muted
            controls
            playsInline
            poster={post.thumbnailURL}
            className={`block visible ${videoStyle}`}
          >
            <source src={post.video.url} type='video/mp4' />
            <source src={post.video.url} type='video/webm' />
          </video>
        ) : (
          //외부영상 첨부할 때 사용
          <iframe
            src={`https://www.youtube.com/embed/${getYoutubeId(post.video.url)}`}
            width='340'
            height='191'
            allowFullScreen
            className='rounded-[10px] block visible'
          />
        )}
      </div>
      <div className='relative flex h-[253px] items-center justify-center rounded-[20px] '>
        <ChampionVoteBoxMobile
          voteData={voteInfos}
          voteCount={post.voteCount}
          daysUntilEnd={post.daysUntilEnd}
          isOwner={post.memberDTO.nickname === user?.nickname}
          isVote={post.isVote}
          isHome={true}
        />
      </div>
    </div>
  );
}
