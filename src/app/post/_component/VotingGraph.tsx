import { useState } from "react";

// 막대 그래프(투표 결과)
interface IVotingGraphProps {

}
export default function VotingGraph() {
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
      if (arr[index]) {
        return index; 
      }
    }
    return -1; 
  };

  return (
    <>
    {votingGraph.map((voting, index)=>{
      const colorClass = voting && 'bg-[#000000]' ;
      const roundedClass = index === 0 ? 'rounded-l-[30px]' : (index === 9 ? 'rounded-r-[30px]' : ''); // 첫 번째와 마지막 요소에 둥근 모서리 클래스 추가

      return(
      <div key={index} className={`p-voing-bar-element ${roundedClass} ${colorClass}`} onClick={()=>{handleClick(index)}}></div>
      )
      })}
    </>
  );
}
