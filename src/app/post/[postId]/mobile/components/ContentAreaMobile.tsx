import MoreModal from '@/components/modals/MoreModal';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Icon_more from '../../../../../../public/svg/Icon_more.svg';
import { formatNumberWithCommas } from '@/utils/formatNumberWithCommas';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import moment from 'moment';
import DOMPurify from 'dompurify';
import usePostIdStore from '../../store/usePostIdStore';
import PostTagMobile from '@/app/home/mobile/component/PostTagMobile';
import PostDeadLineMobile from '@/app/home/mobile/component/PostDeadLineMobile';

interface IContentArea {
  isOwner: boolean;
  post: IGetPostItemType;
}

function ContentAreaMobile({ isOwner, post }: IContentArea) {
  const { user } = useAuthStore();
  const { voteResult, setPostVoteResult } = usePostIdStore();
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [sanitizedHtml, setSanitizedHtml] = useState<string>('');
  const [noHashTag, setNoHashTag] = useState<IHashTagListType[]>([]);
  const [isMoreModalOpen, setIsMoreModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (post) {
      const inGameInfo = post.postDTO.inGameInfoList[0] || {
        championName: 'Unknown',
        tier: 'Unknown',
      };

      if (post.postDTO.hashtagList.length === 0) {
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

  useEffect(() => {
    if (post && user) {
      setFormattedDate(moment(post.postDTO.createdAt).format('YYYY-MM-DD'));
      const sanitize = DOMPurify.sanitize(post.postDTO.content);
      setSanitizedHtml(sanitize);

      const newPostVoteResult = post.postDTO.inGameInfoList.map(
        (ingameInfo: IGetInGameInfoType, idx: number) => ({
          inGameInfoId: ingameInfo.inGameInfoId,
          ratio: voteResult[idx] || 0,
        }),
      );
      setPostVoteResult(newPostVoteResult);
    }
  }, [post, voteResult, setPostVoteResult, user]);

  const handleMoreIconClick = () => {
    setIsMoreModalOpen(!isMoreModalOpen);
  };

  return (
    <div>
      {post && (
        <div className='h-fit w-full rounded-[30px] bg-[#ffffff] flex flex-col mb-[35px] p-[30px] gap-[15px]'>
          <div className='flex w-full justify-between'>
            <div className='flex gap-[10px]'>
              <img
                className='h-[32px] w-[32px] rounded-full'
                src={
                  post.postDTO.memberDTO.profileImage === null
                    ? 'https://ssl.pstatic.net/static/pwe/address/img_profile.png'
                    : post.postDTO.memberDTO.profileImage
                }
              />
              <div className='flex flex-col'>
                <div className='flex gap-[8px]'>
                  <p className='text-[12px] text-[#333333]'>{post.postDTO.memberDTO.nickname}</p>
                  <p className='text-[12px] text-[#909090]'>{post.postDTO.memberDTO.tier}</p>
                </div>
                <p className='text-[12px] text-[#C8C8C8]'>{formattedDate}</p>
              </div>
              <PostDeadLineMobile deadLine={post.postDTO.daysUntilEnd} />
            </div>
            <div className='flex'>
              {isMoreModalOpen && (
                <div className='absolute right-[75px] translate-y-[5px]'>
                  {isOwner ? (
                    <MoreModal type='owner' where='post' postId={post.postDTO.id} />
                  ) : (
                    <MoreModal type='user' where='post' />
                  )}
                </div>
              )}
              <Image
                className='cursor-pointer'
                alt='moreIcon'
                width={20}
                height={20}
                src={Icon_more}
                onClick={handleMoreIconClick}
              />
            </div>
          </div>
          <div className='flex'>
            <p className='text-black text-[15px] whitespace-nowrap'>
              {post.postDTO.title}
              <span className='text-[#C8C8C8] text-[12px] ml-[10px]'>
                | 조회수 {formatNumberWithCommas(post.postDTO.viewCount)}
              </span>
            </p>
          </div>
          <div className='flex flex-col'>
            <video
              controls
              className='p-content-rounded p-content-s-mb p-content-mr aspect-video h-[60%] w-full'
            >
              <source src={post.postDTO.video.url} type='video/webm' />
            </video>
            <div className='flex flex-col w-full gap-[20px]'>
              <div
                className='w-full mt-[10px] p-1 break-words line-clamp-[8] h-fit text-ellipsis decoration-solid'
                dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
              ></div>
              <PostTagMobile
                hashtags={
                  post.postDTO.hashtagList.length !== 0 ? post.postDTO.hashtagList : noHashTag
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContentAreaMobile;
