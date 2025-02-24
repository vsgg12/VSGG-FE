'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import moment from 'moment';
import useConvertHTML from '@/hooks/useConvertHTML';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { formatNumberWithCommas } from '@/utils/formatNumberWithCommas';
import HomeVotedMobile from './HomeVotedMobile';
import HomeNotVotedMobile from './HomeNotVotedMobile';
import PostTagMobile from './PostTagMobile';
import PostDeadLineMobile from './PostDeadLineMobile';

export default function PostItemMobile({
  post,
  voteInfos,
}: {
  post: IGetPostDTOType;
  voteInfos: IGetInGameInfoType[];
}) {
  const router = useRouter();
  const [formattedDate, setFormattedDate] = useState<string>();
  const contentsArr = useConvertHTML(post.content);
  const { user } = useAuthStore();
  const [isImageClick, setIsImageClick] = useState<boolean>(false);
  const [noHashTag, setNoHashTag] = useState<IHashTagListType[]>([]);
  const videoStyle = 'p-content-rounded p-content-s-mb aspect-video h-[60%] w-full';

  useEffect(() => {
    setFormattedDate(moment(post.createdAt).format('YYYY.MM.DD. HH:mm'));
    if (post) {
      const inGameInfo = post.inGameInfoList[0] || { championName: 'Unknown', tier: 'Unknown' };

      if (post.hashtagList.length === 0) {
        setNoHashTag([
          {
            id: 0,
            name: inGameInfo.championName,
          },
          {
            id: 1,
            name: inGameInfo.tier,
          },
        ]);
      }
    }
  }, [post]);

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
    setIsImageClick(true);
  };

  return (
    <div
      className='h-fit w-full rounded-[30px] bg-[#ffffff] cursor-pointer flex flex-col mb-[35px] p-[30px] gap-[15px]'
      onClick={() => {
        router.push(`/post/${post.id}`);
      }}
    >
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
      <div className='flex'>
        <p className='text-black text-[15px] whitespace-wrap'>
          {post.title}
          <span className='text-[#C8C8C8] text-[12px] ml-[10px]'>
            | 조회수 {formatNumberWithCommas(post.viewCount)}
          </span>
        </p>
      </div>
      <div className='flex flex-col'>
        {isImageClick ? (
          <video muted controls autoPlay className={videoStyle}>
            <source src={post.video.url} type='video/webm' />
          </video>
        ) : post.thumbnailURL ? (
          <img className={videoStyle} src={post.thumbnailURL} onClick={handleImageClick} />
        ) : post.video.type === 'FILE' ? (
          <video muted controls className={videoStyle}>
            <source src={post.video.url} type='video/webm' />
          </video>
        ) : (
          //외부영상 첨부할 때 사용
          <iframe
            className={videoStyle}
            src={post.video.url}
            title={post.title}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerPolicy='strict-origin-when-cross-origin'
            allowFullScreen
          ></iframe>
        )}
        <div className='flex flex-col w-full gap-[20px]'>
          <div className='line-clamp-[8] h-[70px] overflow-hidden text-ellipsis decoration-solid'>
            {contentsArr.pTags.map((content, idx) => {
              const displayContent =
                content.length > 150 ? `${content.slice(0, 144)}...더보기` : content;
              return <p key={idx}>{displayContent}</p>;
            })}
          </div>
          <PostTagMobile hashtags={post.hashtagList.length !== 0 ? post.hashtagList : noHashTag} />
          <div className='flex w-full min-h-[150px] rounded-[10px] items-center'>
            {post.isVote || user?.email === post.memberDTO.email || post.status === 'FINISHED' ? (
              <HomeVotedMobile voteInfos={voteInfos} isFinished={post.status === 'FINISHED'} />
            ) : (
              <HomeNotVotedMobile voteInfos={voteInfos} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
