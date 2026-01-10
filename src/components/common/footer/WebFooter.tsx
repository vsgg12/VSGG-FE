'use client'

import Image from 'next/image';
import LinkUtils from '@/utils/link/linkUtils';

const WebFooter = () => {
  return (
    <div className={"w-screen h-[221px] pt-[50px] pb-[60px] px-[200px] flex justify-between items-center bg-[#F3F3F3] border-t-[2px]"}>
      {/*왼쪽 영역*/}
      <div className={"flex flex-col gap-[20px] h-[111px]"}>
        <Image src={'/svg/logo/vsgg.svg'} alt={"vsgg 로고 이미지"} width={131.99} height={30}/>
        <div className={"w-fit bg-[#555555] px-[4px] py-[2px] text-[20px] font-extrabold text-[#F3F3F3]"}>
          리그 오브 레전드(LOL) 과실 판결 커뮤니티
        </div>
        <div className={"text-[16px] font-semibold text[#333333]"}>
          "소환사라면 한 번쯤은 겪어보았을 문제 상황에 판결과 논쟁을 더하다"
        </div>
      </div>

      {/*오른쪽 영역*/}
      <div className={"flex flex-col h-[111px] gap-[20px] text[12px] text-[#333333]"}>

        <div className={"flex flex-col gap-[8px]"}>
          <div className={"font-bold"}>서비스</div>
          <div className={"flex gap-[12px]"}>
            <span>챔피언 과실 판결</span>
            <span>주장 판결(준비중)</span>
          </div>
        </div>

        <div className={"flex flex-col gap-[10px]"}>
          <div>©2024. VS.GG ALL RIGHTS RESERVED</div>
          <div className={"flex gap-[16px]"}>
            <span className={"underline cursor-pointer"} onClick={LinkUtils.handleServiceTermClick}>이용약관</span>
            <span className={"underline cursor-pointer"} onClick={LinkUtils.handlePersonalInfoTermClick}>개인정보처리방침</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WebFooter