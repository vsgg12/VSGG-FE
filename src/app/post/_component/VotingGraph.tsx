import { useEffect, useState } from "react";
import { voteColors } from '../../../data/championData'


interface IVotingGraphProps{
  selectedIndex: number;
}

export default function VotingGraph({selectedIndex}:IVotingGraphProps) {
  const [votingGraph, setVotingGraph] = useState<boolean[]>(Array(10).fill(false));

  const handleClick = (index: number) => {
    if(votingGraph[index] && index === findLastTrueIndex(votingGraph)){
      const newGraph = [...votingGraph]; // 배열 복사
      newGraph[index] = false;
      setVotingGraph(newGraph);   
    }else{
    const newGraph = Array(index+1).fill(true).concat(Array(10 - (index + 1)).fill(false));
    setVotingGraph(newGraph);
    }
  };

  const findLastTrueIndex = (arr: boolean[]) => {
    for (let index = arr.length - 1; index >= 0; index--) {
      if (arr[index]) return index; 
    } return -1; 
  };

  return (
    <>
    {votingGraph.map((voting, index)=>{
      const colorClass = voting && voteColors[selectedIndex].background;
      const roundedClass = index === 0 ? 'rounded-l-[30px]' : (index === 9 ? 'rounded-r-[30px]' : ''); // 첫 번째와 마지막 요소에 둥근 모서리 클래스 추가

      return(
      <div key={index} className={`p-voing-bar-element ${roundedClass} ${colorClass}`} onClick={()=>{handleClick(index)}}></div>
      )
      })}
    </>
  );
}
