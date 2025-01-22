import MoreModal from '@/components/modals/MoreModal';
import PostDeadLine from '@/components/PostDeadLine';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import PostTag from './PostTag';
import Icon_more from '../../../../public/svg/Icon_more.svg';
import { formatNumberWithCommas } from '@/utils/formatNumberWithCommas';
import usePostIdStore from '../[postId]/store/usePostIdStore';
import moment from 'moment';
import DOMPurify from 'dompurify';

interface IContentArea {
  isOwner: boolean;
  setVoteData: Dispatch<SetStateAction<IGetInGameInfoType[]>>;
  post: IGetPostItemType;
}

function ContentArea({ isOwner, setVoteData, post }: IContentArea) {
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
    if (post) {
      setFormattedDate(moment(post.postDTO.createdAt).format('YYYY-MM-DD'));
      const sanitize = DOMPurify.sanitize(post.postDTO.content);
      setSanitizedHtml(sanitize);
      setVoteData(post.postDTO.inGameInfoList);

      const newPostVoteResult = post.postDTO.inGameInfoList.map(
        (ingameInfo: IGetInGameInfoType, idx: number) => ({
          inGameInfoId: ingameInfo.inGameInfoId,
          ratio: voteResult[idx] || 0,
        }),
      );
      setPostVoteResult(newPostVoteResult);
    }
  }, [post, voteResult, setPostVoteResult]);

  const handleMoreIconClick = () => {
    setIsMoreModalOpen(!isMoreModalOpen);
  };

  return (
    <div>
      {post && (
        <div className='p-content-rounded scroll relative mb-11 h-[1000px] w-[900px] bg-white px-[30px] pb-[44px]'>
          <div className='sticky top-[-1px] bg-[#ffffff] pb-[30px] pt-[44px] z-10'>
            <div className='flex justify-between relative mb-[10px] h-[35px]'>
              <PostDeadLine deadLine={post.postDTO.daysUntilEnd} />
              <div className='flex'>
                {isMoreModalOpen && (
                  <div className='mt-[4px] mr-[5px]'>
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
            <div className='flex w-full flex-row place-items-start justify-between font-medium'>
              <div className='p-content-s-mb text-[25px]'>{post.postDTO.title}</div>
            </div>
            <div className='flex flex-row items-center justify-start font-medium '>
              <img
                src={
                  post.postDTO.memberDTO.profileImage === null
                    ? 'https://ssl.pstatic.net/static/pwe/address/img_profile.png'
                    : post.postDTO.memberDTO.profileImage
                }
                className='mr-[0.625rem] h-[2.5rem] w-[2.5rem] rounded-full  text-[#D9D9D9]'
              />
              <div className='flex-grow'>
                <div className='flex flex-row'>
                  <div className=' mr-[6px] text-[12px] text-[#333333]'>
                    {post.postDTO.memberDTO.nickname}
                  </div>
                  <div className='text-[12px] text-[#909090]'>{post.postDTO.memberDTO.tier}</div>
                </div>
                <div className='text-[12px] text-[#C8C8C8]'>{formattedDate}</div>
              </div>
              <p className='text-[12px] text-[#C8C8C8] mt-[20px]'>
                조회수 {formatNumberWithCommas(post.postDTO.viewCount)}
              </p>
            </div>
          </div>
          <video
            controls
            className='p-content-s-mb h-fit w-full max-h-[25rem] overflow-hidden rounded-[30px]'
          >
            <source src={post.postDTO.video.url} type='video/webm' />
          </video>
          <div className='w-full'>
            <PostTag
              hashtags={
                post.postDTO.hashtagList.length !== 0 ? post.postDTO.hashtagList : noHashTag
              }
            />
          </div>
          <div
            className='w-full mt-7 p-1 break-words'
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
          ></div>
        </div>
      )}
    </div>
  );
}

export default ContentArea;
