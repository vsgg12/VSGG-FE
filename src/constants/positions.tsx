import Image from 'next/image';
import topSVG from '../../public/svg/top.svg';
import topWSVG from '../../public/svg/top-w.svg';
import jungleSVG from '../../public/svg/jungle.svg';
import jungleWSVG from '../../public/svg/jungle-w.svg';
import midSVG from '../../public/svg/mid.svg';
import midWSVG from '../../public/svg/mid-w.svg';
import onedealSVG from '../../public/svg/onedeal.svg';
import onedealWSVG from '../../public/svg/onedeal-w.svg';
import supportSVG from '../../public/svg/supporter.svg';
import supportWSVG from '../../public/svg/supporter-w.svg';
import midBSVG from '../../public/svg/postWrite/position/mid-b.svg';
import onedealBSVG from '../../public/svg/postWrite/position/onedeal-b.svg';
import supportBSVG from '../../public/svg/postWrite/position/supporter-b.svg';
import topBSVG from '../../public/svg/postWrite/position/top-b.svg';
import jungleBSVG from '../../public/svg/postWrite/position/jungle-b.svg';
import React from 'react';

const positions = [
  {
    id: 'TOP',
    value: 'TOP',
    content: '탑',
    svg: <Image alt='TOP' src={topSVG} width={18} height={18} />,
    svgW: <Image alt='TOP' src={topWSVG} />,
    svgB: <Image alt='TOP' src={topBSVG} width={18} height={18} />,
  },
  {
    id: 'jungle',
    value: 'JUNGLE',
    content: '정글',
    svg: <Image alt='jungle' src={jungleSVG} width={18} height={18} />,
    svgW: <Image alt='jungle' src={jungleWSVG} width={18} height={18} />,
    svgB: <Image alt='jungle' src={jungleBSVG} width={18} height={18} />,
  },
  {
    id: 'mid',
    value: 'MID',
    content: '미드',
    svg: <Image alt='mid' src={midSVG} width={18} height={18} />,
    svgW: <Image alt='mid' src={midWSVG} width={18} height={18} />,
    svgB: <Image alt='mid' src={midBSVG} width={18} height={18} />,
  },
  {
    id: 'onedeal',
    value: 'ADCARRY',
    content: '원딜',
    svg: <Image alt='onedeal' src={onedealSVG} width={18} height={18} />,
    svgW: <Image alt='onedeal' src={onedealWSVG} width={18} height={18} />,
    svgB: <Image alt='onedeal' src={onedealBSVG} width={18} height={18} />,
  },
  {
    id: 'support',
    value: 'SUPPORT',
    content: '서폿',
    svg: <Image alt='support' src={supportSVG} width={18} height={18} />,
    svgW: <Image alt='support' src={supportWSVG} width={18} height={18} />,
    svgB: <Image alt='support' src={supportBSVG} width={18} height={18} />,
  },
];

export default positions;
