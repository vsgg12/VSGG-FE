import { IPostReturnBtnChildren } from '@/app/types/post';

export default function PostReturnBtn({
  children,
}: IPostReturnBtnChildren): JSX.Element {
  return (
    <button className=" mb-[44px] box-content flex h-[34px] w-[92px] items-center justify-center rounded-[150px] bg-[#8A1F21] text-white">
      <div className="text-[13px]">{children}</div>
    </button>
  );
}
