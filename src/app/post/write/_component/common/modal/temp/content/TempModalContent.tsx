import TempList from '@/app/post/write/_component/common/modal/temp/content/TempList';

const TempModalContent = () => {
  return (
    <div className={'w-full h-full flex flex-col gap-[10px]'}>
      <div
        className={
          'w-full h-[44px] px-[20px] py-[10px] flex items-center bg-[#FCF3F3] text-[16px] font-medium text-[#E20A29]'
        }
      >
        60일동안 저장됩니다
      </div>
      <TempList />
    </div>
  );
};

export default TempModalContent;
