import { Dispatch, memo, SetStateAction } from 'react';
import { PostAddRequestType } from '@/store/write/useWriteStore';

interface Props{
  titleClass: string;
  setActiveBox: Dispatch<SetStateAction<null | 'video' | 'title' | 'content'>>
  title: string;
  setPostRequestData: <K extends keyof PostAddRequestType>(key: K, value: PostAddRequestType[K]) => void
  getBoxClass: (key: string) => string;
}

const InputTitleBox = ({titleClass, setActiveBox, title, setPostRequestData, getBoxClass}: Props) => {

  return (
    <div className={'flex flex-col gap-[20px]'}>
      <div className={titleClass}>제목</div>
      <input
        type="text"
        value={title ?? ""}
        maxLength={35}
        onFocus={() => setActiveBox("title")}
        onChange={(e) => {
          const value = e.target.value.trim();
          setPostRequestData("title", value);
        }}
        placeholder="제목을 입력해주세요."
        className={`w-[652px] h-[64px] text-[20px] rounded-[20px] ${getBoxClass(
          "title"
        )} px-4 outline-none`}
      />
    </div>
  )
}

export default memo(InputTitleBox)