import React from 'react'
import MyJudgeItem from '@/app/myPage/_component/MyJudgeItem';

interface IMyJudgeListProps {
    myJudgeList: IVotedPostItem[];
}

function MyJudgeList({myJudgeList}: IMyJudgeListProps) {
  return (
    <div className='flex flex-col'>
      {myJudgeList.map((myJudgeItem: IVotedPostItem) => (
        <div key={myJudgeItem.id}>
          <MyJudgeItem myJudgeItem={myJudgeItem} />
        </div>
      ))}
    </div>
  );
}

export default MyJudgeList