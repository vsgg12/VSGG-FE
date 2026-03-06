import Image from 'next/image';
import React from 'react';
import unrankSVG from '../../public/svg/postWrite/tier/unrank.svg';
import ironSVG from '../../public/svg/postWrite/tier/iron.svg';
import bronzeSVG from '../../public/svg/postWrite/tier/bronze.svg';
import silverSVG from '../../public/svg/postWrite/tier/silver.svg';
import goldSVG from '../../public/svg/postWrite/tier/gold.svg';
import platinumSVG from '../../public/svg/postWrite/tier/platinum.svg';
import emeraldSVG from '../../public/svg/postWrite/tier/emerald.svg';
import diamondSVG from '../../public/svg/postWrite/tier/diamond.svg';
import masterSVG from '../../public/svg/postWrite/tier/master.svg';
import grandMasterSVG from '../../public/svg/postWrite/tier/grandMaster.svg';
import challengerSVG from '../../public/svg/postWrite/tier/challenger.svg';

const tiers = [
  {
    id: 'unrank',
    value: 'UNRANK',
    content: '언랭',
    color: '#C8C8C8',
    svg: <Image alt='unrank' src={unrankSVG} width={30} height={30} />,
  },
  {
    id: 'iron',
    value: 'IRON',
    content: '아이언',
    color: '#51484A',
    svg: <Image alt='unrank' src={ironSVG} width={30} height={30} />,
  },
  {
    id: 'bronze',
    value: 'BRONZE',
    content: '브론즈',
    color: '#8C513A',
    svg: <Image alt='unrank' src={bronzeSVG} width={30} height={30} />,
  },
  {
    id: 'silver',
    value: 'SILVER',
    content: '실버',
    color: '#80989D',
    svg: <Image alt='unrank' src={silverSVG} width={30} height={30} />,
  },
  {
    id: 'gold',
    value: 'GOLD',
    content: '골드',
    color: '#CD8837',
    svg: <Image alt='unrank' src={goldSVG} width={30} height={30} />,
  },
  {
    id: 'platinum',
    value: 'PLATINUM',
    content: '플래티넘',
    color: '#54AAD2',
    svg: <Image alt='unrank' src={platinumSVG} width={30} height={30} />,
  },
  {
    id: 'emerald',
    value: 'EMERALD',
    content: '에메랄드',
    color: '#149C3A',
    svg: <Image alt='unrank' src={emeraldSVG} width={30} height={30} />,
  },
  {
    id: 'diamond',
    value: 'DIAMOND',
    content: '다이아몬드',
    color: '#7944E2',
    svg: <Image alt='unrank' src={diamondSVG} width={30} height={30} />,
  },
  {
    id: 'master',
    value: 'MASTER',
    content: '마스터',
    color: '#A4584E',
    svg: <Image alt='unrank' src={masterSVG} width={30} height={30} />,
  },
  {
    id: 'grand_master',
    value: 'GRANDMASTER',
    content: '그랜드마스터',
    color: '#756572',
    svg: <Image alt='unrank' src={grandMasterSVG} width={30} height={30} />,
  },
  {
    id: 'challenger',
    value: 'CHALLENGER',
    content: '챌린저',
    color: '#F4C874',
    svg: <Image alt='unrank' src={challengerSVG} width={30} height={30} />,
  },
];

export default tiers;
