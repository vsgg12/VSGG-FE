'use client';
import PostTag from '@/app/post/_component/PostTag';
import HomeNotVoted from './HomeNotVoted';
import { useRouter } from 'next/navigation';
import HomeVoted from './HomeVoted';
import { useEffect, useState } from 'react';
import moment from 'moment';
import useConvertHTML from '@/hooks/useConvertHTML';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import PostDeadLine from '@/components/PostDeadLine';
import { formatNumberWithCommas } from '@/utils/formatNumberWithCommas';

export default function HomePostItems({
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

  useEffect(() => {
    setFormattedDate(moment(post.createdAt).format('YYYY-MM-DD'));
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
    <div className='min-h-[calc(100vh-504px)] flex flex-col'>
      <div>
        {post && (
          <div
            className='px-[55px] pt-[40px] pb-[30px] h-fit w-full mb-[50px] rounded-[1.875rem] bg-[#ffffff] cursor-pointer flex flex-col gap-[10px]'
            onClick={() => {
              router.push(`/post/${post.id}/`);
            }}
          >
            <div className='flex w-full font-medium justify-center items-center gap-[8px]'>
              <div className='max-w-[70%] text-black text-[1.563rem] '>{post.title}</div>
              <p className='text-[#C8C8C8] flex-grow text-[0.75rem]'>
                | 조회수 {formatNumberWithCommas(post.viewCount)}
              </p>
              <PostDeadLine deadLine={post.daysUntilEnd} />
            </div>
            <div className='justify-start font-medium'>
              <div className='flex'>
                <img
                  src={
                    post.memberDTO.profileImage === null
                      ? 'https://ssl.pstatic.net/static/pwe/address/img_profile.png'
                      : post.memberDTO.profileImage
                  }
                  className='mr-[0.625rem] h-[2.5rem] w-[2.5rem] rounded-full  text-[#D9D9D9]'
                />
                <div className='flex flex-col'>
                  <div className='flex'>
                    <div className='mr-[0.625rem] text-[0.75rem] text-[#333333]'>
                      {post.memberDTO.nickname}
                    </div>
                    <div className='text-[0.75rem] text-[#909090]'>{post.memberDTO.tier}</div>
                  </div>
                  <div className='text-[0.75rem] text-[#C8C8C8]'>{formattedDate}</div>
                </div>
              </div>
            </div>
            <div className='flex h-fit flex-row'>
              {isImageClick ? (
                <video
                  muted
                  controls
                  autoPlay
                  poster={post.thumbnailURL}
                  className='block visible p-content-rounded p-content-s-mb p-content-mr h-fit aspect-video w-[50%]'
                  onClick={(e) => e.stopPropagation}
                >
                  <source src={post.video.url} type='video/mp4' />
                  <source src={post.video.url} type='video/webm' />
                </video>
              ) : post.thumbnailURL ? (
                <img
                  className='p-content-rounded p-content-s-mb p-content-mr aspect-video h-fit w-[50%]'
                  src={post.thumbnailURL}
                  onClick={handleImageClick}
                />
              ) : post.video.type === 'FILE' ? (
                <video
                  muted
                  controls
                  playsInline
                  poster={post.thumbnailURL}
                  className='block visible p-content-rounded p-content-s-mb p-content-mr h-fit aspect-video w-[50%]'
                >
                  <source src={post.video.url} type='video/mp4' />
                  <source src={post.video.url} type='video/webm' />
                </video>
              ) : (
                //외부영상 첨부할 때 사용
                <iframe
                  className='p-content-rounded p-content-s-mb p-content-mr aspect-video w-[50%]'
                  src={post.video.url}
                  title={post.title}
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  referrerPolicy='strict-origin-when-cross-origin'
                  allowFullScreen
                ></iframe>
              )}
              <div className='flex flex-col overflow-hidden w-[50%] mb-5'>
                <div className='mb-3 line-clamp-[8] h-[140px] overflow-hidden text-ellipsis decoration-solid'>
                  {contentsArr.pTags.map((content, idx) => {
                    const displayContent =
                      content.length > 150 ? `${content.slice(0, 144)}...더보기` : content;
                    return <p key={idx}>{displayContent}</p>;
                  })}
                </div>
                <div className='relative flex h-[167px] items-center justify-center rounded-[1.875rem] bg-gradient-to-b from-[#ADADAD]/30 to-[#DCDCDC]/30'>
                  {post.isVote ||
                  user?.email === post.memberDTO.email ||
                  post.status === 'FINISHED' ? (
                    <HomeVoted voteInfos={voteInfos} isFinished={post.status === 'FINISHED'} />
                  ) : (
                    <HomeNotVoted voteInfos={voteInfos} />
                  )}
                </div>
              </div>
            </div>
            <PostTag hashtags={post.hashtagList.length !== 0 ? post.hashtagList : noHashTag} />
          </div>
        )}
      </div>
    </div>
  );
}
