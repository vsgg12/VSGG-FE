import React from 'react';
import PostInfoBox from './components/PostInfoBox';
import ContentArea from './components/ContentArea';
import VoteArea from './components/VoteArea';
import CommentArea from './components/CommentArea';

interface Props {
  post: IGetPostItemType;
  setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PostDetailPC({ post, setIsLoginModalOpen }: Props) {
  return (
    <div className='w-[1200px] flex flex-col justify-center items-center my-[30px] gap-[20px]'>
      <PostInfoBox post={post} />
      <div className='flex gap-[30px]'>
        <div className='flex flex-col gap-[30px]'>
          <ContentArea post={post.postDTO} setIsLoginModalOpen={setIsLoginModalOpen} />
          <VoteArea />
        </div>
        <div>
          <CommentArea id={post.postDTO.id} setIsLoginModalOpen={setIsLoginModalOpen} />
        </div>
      </div>
    </div>
  );
}
