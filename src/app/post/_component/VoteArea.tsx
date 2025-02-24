import React, { Dispatch, SetStateAction } from 'react';
import VoteForm from './VoteForm';
import VoteResult from './VoteResult';
import PostVote from '@/api/postVote';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import usePostIdStore from '../[postId]/store/usePostIdStore';
import { useParams } from 'next/navigation';
import { useAuthStore } from '@/app/login/store/useAuthStore';

interface IVoteArea {
  voteData: IGetInGameInfoType[];
  isOwner: boolean;
  post: IGetPostItemType;
  setIsLoginModalOpen: Dispatch<SetStateAction<boolean>>;
}

function VoteArea({ voteData, isOwner, post, setIsLoginModalOpen }: IVoteArea) {
  const queryClient = useQueryClient();
  const { postVoteResult } = usePostIdStore();
  const { postId } = useParams();
  const id: string = postId as string;
  const { accessToken, isLogin } = useAuthStore();

  const { mutate: postVote } = useMutation({
    mutationFn: () => PostVote(id, { voteList: postVoteResult }, accessToken),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['POST_ITEM', id] });
      await queryClient.invalidateQueries({ queryKey: ['VOTE_RESULT', id] });
    },
    onError: (err) => alert(err.message),
  });

  const handleVoteSubmit = () => {
    if (!isLogin) {
      setIsLoginModalOpen(true);
      return;
    }
    postVote();
  };

  return (
    <div className='p-content-pd p-content-rounded p-last-mb flex h-fit w-[1310px] flex-col bg-white'>
      {(voteData && isOwner) || post?.postDTO.isVote || post?.postDTO.status === 'FINISHED' ? (
        <VoteResult
          voteInfos={voteData}
          isOwner={isOwner}
          isFinished={post?.postDTO.status === 'FINISHED'}
        />
      ) : (
        post &&
        !isOwner &&
        post.postDTO.status === 'PROGRESS' && (
          <VoteForm voteInfo={voteData} handleVoteSubmit={handleVoteSubmit} />
        )
      )}
    </div>
  );
}

export default VoteArea;
