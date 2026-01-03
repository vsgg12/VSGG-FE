import Image from 'next/image';
import React from 'react';
import unrankSVG from '../../public/svg/sidebar/tier/unrankIcon.svg';
import ironSVG from '../../public/svg/sidebar/tier/ironIcon.svg';
import bronzeSVG from '../../public/svg/sidebar/tier/bronzeIcon.svg';
import silverSVG from '../../public/svg/sidebar/tier/silverIcon.svg';
import goldSVG from '../../public/svg/sidebar/tier/goldIcon.svg';
import platinumSVG from '../../public/svg/sidebar/tier/platinumIcon.svg';
import emeraldSVG from '../../public/svg/sidebar/tier/emeraldIcon.svg';
import diamondSVG from '../../public/svg/sidebar/tier/diamondIcon.svg';
import masterSVG from '../../public/svg/sidebar/tier/masterIcon.svg';
import grandMasterSVG from '../../public/svg/sidebar/tier/grandMasterIcon.svg';
import challengerSVG from '../../public/svg/sidebar/tier/challengerIcon.svg';

const tiers = [
  {
    id: 'unrank',
    value: 'UNRANK',
    content: '언랭',
    svg: <Image alt='unrank' src={unrankSVG} width={18} height={18} />,
  },
  {
    id: 'iron',
    value: 'IRON',
    content: '아이언',
    svg: <Image alt='unrank' src={ironSVG} width={18} height={18} />,
  },
  {
    id: 'bronze',
    value: 'BRONZE',
    content: '브론즈',
    svg: <Image alt='unrank' src={bronzeSVG} width={18} height={18} />,
  },
  {
    id: 'silver',
    value: 'SILVER',
    content: '실버',
    svg: <Image alt='unrank' src={silverSVG} width={18} height={18} />,
  },
  {
    id: 'gold',
    value: 'GOLD',
    content: '골드',
    svg: <Image alt='unrank' src={goldSVG} width={18} height={18} />,
  },
  {
    id: 'platinum',
    value: 'PLATINUM',
    content: '플래티넘',
    svg: <Image alt='unrank' src={platinumSVG} width={18} height={18} />,
  },
  {
    id: 'emerald',
    value: 'EMERALD',
    content: '에메랄드',
    svg: <Image alt='unrank' src={emeraldSVG} width={18} height={18} />,
  },
  {
    id: 'diamond',
    value: 'DIAMOND',
    content: '다이아몬드',
    svg: <Image alt='unrank' src={diamondSVG} width={18} height={18} />,
  },
  {
    id: 'master',
    value: 'MASTER',
    content: '마스터',
    svg: <Image alt='unrank' src={masterSVG} width={18} height={18} />,
  },
  {
    id: 'grand_master',
    value: 'GRANDMASTER',
    content: '그랜드마스터',
    svg: <Image alt='unrank' src={grandMasterSVG} width={18} height={18} />,
  },
  {
    id: 'challenger',
    value: 'CHALLENGER',
    content: '챌린저',
    svg: <Image alt='unrank' src={challengerSVG} width={18} height={18} />,
  },
];

export default tiers;
