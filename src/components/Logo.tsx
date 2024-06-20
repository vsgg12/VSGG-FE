import Link from 'next/link';

export default function Logo() {
  return (
    <>
      <Link href="/home">
        <div className=" mb-[32px] font-['SBAggroB'] text-[52px] text-[#8A1F21]">
          VS.GG
        </div>
      </Link>
    </>
  );
}
