import React from 'react'
import MyPostItem from '@/app/myPage/_component/MyPostItem';

interface IMyPostListProps{
    myPostList: IGetMyPostItemsType[];
}

function MyPostList({myPostList}: IMyPostListProps) {
  return (
    <div className="flex flex-col gap-[10px]">
      {myPostList.map((myPostItem: IGetMyPostItemsType) => (
        <MyPostItem myPostItem={myPostItem}/>
      ))}
    </div>
  );
}

export default MyPostList