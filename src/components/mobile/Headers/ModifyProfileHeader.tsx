'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import XIcon from "../../../../public/svg/mobile/XIcon.svg"

function ModifyProfileHeader({ handleSaveClick }: { handleSaveClick: () => void }) {
    const router = useRouter();
  return (
    <div className='flex px-[10px] py-[20px] h-[32px] items-center mobile-layout sticky top-0 z-[40] justify-between'>
      <Image
        src={XIcon}
        alt='X-Icon'
        width={32}
        height={32}
        className='cursor-pointer'
        onClick={() => {
          router.back();
        }}
      />
      <div className='text-[#8A1F21] font-bold text-[22px]'>프로필 수정</div>
      <div className='text-[#8A1F21] font-semibold text-[18px] cursor-pointer' onClick={handleSaveClick}>완료</div>
    </div>
  );
}

export default ModifyProfileHeader