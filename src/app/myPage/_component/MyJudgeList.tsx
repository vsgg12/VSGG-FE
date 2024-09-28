import React from 'react'
import MyJudgeItem from './MyJudgeItem';

interface IMyJudgeListProps {
    myJudgeList: IVotedPostItem[];
}

function MyJudgeList({myJudgeList}: IMyJudgeListProps) {
  return (
    <div className='flex flex-col gap-[10px]'>
      {myJudgeList.map((myJudgeItem: IVotedPostItem) => (
        <MyJudgeItem myJudgeItem={myJudgeItem} />
      ))}
    </div>
  );
}

export default MyJudgeList