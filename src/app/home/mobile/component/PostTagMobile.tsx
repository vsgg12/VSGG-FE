export default function PostTagMobile({ hashtags }: { hashtags: IHashTagListType[] }) {
  const changeIngameInfoColor = (index: number) => {
    switch (index) {
      case 0:
        return 'border-[#00A438]';
      case 1:
        return 'border-[#8A1F21]';
      case 2:
        return 'border-[#000000]';
      case 3:
        return 'border-[#656565]';
      case 4:
        return 'border-[#6C0000]';
    }
  };

  return (
    <div className='flex w-full gap-[10px]'>
      {hashtags.map((hashtag: IHashTagListType, index: number) => (
        <div
          className={`flex items-center justify-center border-1 rounded-[150px] px-[10px] h-[23px] w-fit text-[12px] whitespace-nowrap ${changeIngameInfoColor(index)}`} key={hashtag.id}
        >
          # {hashtag.name}
        </div>
      ))}
    </div>
  );
}
