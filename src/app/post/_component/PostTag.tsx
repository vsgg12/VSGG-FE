export default function PostTag({ hashtags }: { hashtags: IHashTagListType[] }) {
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
    <div className='flex flex-row mt-[20px]'>
      {hashtags.map((hashtag: IHashTagListType, index: number) => (
        <div key={index} className='flex flex-row'>
          <div className={changeIngameInfoColor(index) + ' p-content-tag'}># {hashtag.name}</div>
        </div>
      ))}
    </div>
  );
}
