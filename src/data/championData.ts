interface IVoteColorsType {
  background: string;
  text: string;
  hover: string;
  border: string;
}

export const voteColors: IVoteColorsType[] = [
  {
    background: 'bg-[#000000]',
    text: 'text-[#000000]',
    hover: 'hover:[#000000]',
    border: 'border-[#000000]',
  },
  {
    background: 'bg-[#9D2A2C]',
    text: 'text-[#8A1F21]',
    hover: 'hover:[#9D2A2C]',
    border: 'border-[#8A1F21]',
  },
  {
    background: 'bg-[#CACACA]',
    text: 'text-[#7B7B7B]',
    hover: 'hover:[#CACACA]',
    border: 'border-[#CACACA]',
  },
  {
    background: 'bg-[#656565]',
    text: 'text-[#333333]',
    hover: 'hover:[#656565]',
    border: 'border-[#656565]',
  },
  {
    background: 'bg-[#6C0000]',
    text: 'text-[#9B111E]',
    hover: 'hover:[#6C0000]',
    border: 'border-[#6C0000]',
  },
];

export const positionInfo = [
  {
    name: '탑',
    svgw: '/svg/top-w.svg',
    svg: '/svg/top.svg',
    svgDisabled: '/svg/disabled/Top_disabled.svg',
  },
  {
    name: '원딜',
    svgw: '/svg/onedeal-w.svg',
    svg: '/svg/onedeal.svg',
    svgDisabled: '/svg/disabled/Onedeal_disabled.svg',
  },
  {
    name: '미드',
    svgw: '/svg/mid-w.svg',
    svg: '/svg/mid.svg',
    svgDisabled: '/svg/disabled/Mid_disabled.svg',
  },
  {
    name: '정글',
    svgw: '/svg/jungle-w.svg',
    svg: '/svg/jungle.svg',
    svgDisabled: '/svg/disabled/Jungle_disabled.svg',
  },
  {
    name: '서폿',
    svgw: '/svg/supporter-w.svg',
    svg: '/svg/supporter.svg',
    svgDisabled: '/svg/disabled/Support_disabled.svg',
  },
];
