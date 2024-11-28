import React from 'react'
import MyPostItem from '@/app/myPage/_component/MyPostItem';

interface IMyPostListProps{
    myPostList: IGetMyPostItemsType[];
}

function MyPostList({myPostList}: IMyPostListProps) {
  return (
    <div className='flex flex-col'>
      {myPostList.map((myPostItem: IGetMyPostItemsType) => (
        <div key={myPostItem.id}>
          <MyPostItem myPostItem={myPostItem} />
        </div>
      ))}
    </div>
  );
}

export default MyPostList