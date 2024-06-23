import { ChangeEvent, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

export default function PostHashTag() {
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const handleTagInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTagInput(event.target.value); // 입력값 상태 업데이트
  };

  const removeTag = (index: number) => {
    setHashtags(hashtags.filter((_, idx) => idx !== index)); // 특정 인덱스의 태그 제거
  };

  //hashtags
  const handleTagInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
      event.preventDefault(); // 폼 제출 방지
      const newTag = event.currentTarget.value.trim();
      if (newTag && !hashtags.includes(newTag) && hashtags.length < 5) {
        // 중복 및 빈 문자열 검사
        setHashtags([...hashtags, newTag]);
        setTagInput(''); // 입력 필드 초기화
      }
    }
  };

  return (
    <>
      <input
        type='text'
        className='mb-4 w-full rounded-[30px] border-[1.5px] border-[#828282] px-[30px] py-[10px] outline-none'
        placeholder='#해시태그를 등록하세요 (최대 5개)'
        value={tagInput}
        onChange={handleTagInputChange}
        onKeyDown={handleTagInput}
      />
      <div className='ml-4 flex flex-wrap '>
        {hashtags.map((hashtag, index) => (
          <div
            key={index}
            className='mb-1 mr-3 flex w-fit flex-row items-center justify-center rounded-[150px] border-[1.5px] border-[#333333] px-[15px] py-[5px]'
          >
            <div className='mr-[8px] text-[12px]'># {hashtag}</div>
            <button type='button'>
              <IoCloseOutline className='text-[20px]' onClick={() => removeTag(index)} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
