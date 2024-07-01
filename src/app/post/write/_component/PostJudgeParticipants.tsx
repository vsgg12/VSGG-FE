import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { IoAddCircleOutline } from 'react-icons/io5';
import topSVG from '../../../../../public/svg/top.svg';
import midSVG from '../../../../../public/svg/mid.svg';
import jungleSVG from '../../../../../public/svg/jungle.svg';
import onedealSVG from '../../../../../public/svg/onedeal.svg';
import supportSVG from '../../../../../public/svg/supporter.svg';

import topWSVG from '../../../../../public/svg/top-w.svg';
import midWSVG from '../../../../../public/svg/mid-w.svg';
import jungleWSVG from '../../../../../public/svg/jungle-w.svg';
import onedealWSVG from '../../../../../public/svg/onedeal-w.svg';
import supportWSVG from '../../../../../public/svg/supporter-w.svg';
import { ChampionDataProps } from '@/types/form';

const positions = [
  {
    id: 'TOP',
    value: 'TOP',
    content: '탑',
    svg: <Image alt='TOP' src={topSVG} />,
    svgW: <Image alt='TOP' src={topWSVG} />,
  },
  {
    id: 'jungle',
    value: 'JUNGLE',
    content: '정글',
    svg: <Image alt='jungle' src={jungleSVG} />,
    svgW: <Image alt='jungle' src={jungleWSVG} />,
  },
  {
    id: 'mid',
    value: 'MID',
    content: '미드',
    svg: <Image alt='mid' src={midSVG} />,
    svgW: <Image alt='mid' src={midWSVG} />,
  },
  {
    id: 'onedeal',
    value: 'ADCARRY',
    content: '원딜',
    svg: <Image alt='onedeal' src={onedealSVG} />,
    svgW: <Image alt='onedeal' src={onedealWSVG} />,
  },
  {
    id: 'support',
    value: 'SUPPORT',
    content: '서폿',
    svg: <Image alt='support' src={supportSVG} />,
    svgW: <Image alt='support' src={supportWSVG} />,
  },
];

const tiers = [
  { id: undefined, value: undefined, content: '티어 선택' },
  { id: 'unrank', value: 'UNRANK', content: '언랭' },
  { id: 'iron', value: 'IRON', content: '아이언' },
  { id: 'bronze', value: 'BRONZE', content: '브론즈' },
  { id: 'silver', value: 'SILVER', content: '실버' },
  { id: 'gold', value: 'GOLD', content: '골드' },
  { id: 'platinum', value: 'PLATINUM', content: '플래티넘' },
  { id: 'emerald', value: 'EMERALD', content: '에메랄드' },
  { id: 'diamond', value: 'DIAMOND', content: '다이아' },
  { id: 'master', value: 'MASTER', content: '마스터' },
  { id: 'grand_master', value: 'GRANDMASTER', content: '그랜드마스터' },
  { id: 'challenger', value: 'CHALLENGER', content: '챌린저' },
];

const intialIngameInfos: IInGameInfoType[] = [
  { id: 0, position: 'TOP', championName: '', tier: '' },
  { id: 1, position: 'TOP', championName: '', tier: '' },
];

export default function PostJudgeParticipants() {
  const [selectedPos, setSelectedPos] = useState<{ [key: number]: number }>({
    0: 0,
    1: 0,
  });
  const [ingameInfos, setIngameInfos] = useState<IInGameInfoType[]>(intialIngameInfos);
  const isClickedFirst = useRef(false); //뒤로가기 방지용
  const [champions, setChampions] = useState<string[]>(['챔피언 선택']);

  const changePositionRadioStyle = (checked: boolean) => {
    return checked ? 'p-position p-position-selected' : 'p-position p-position-n-selected';
  };

  //ingameInfos
  const addIngameInfo = (): void => {
    const newInfo = {
      id: ingameInfos.length,
      position: 'TOP',
      championName: '',
      tier: '',
    };
    setIngameInfos(ingameInfos.concat(newInfo));

    // Setting the default position for the newly added game info
    const updatedSelectedPos = {
      ...selectedPos,
      [newInfo.id]: 0, // Defaulting to the first position for the new entry
    };
    setSelectedPos(updatedSelectedPos);
  };

  const handlePositionChange = (position: string, index: number) => {
    const updatedIngameInfos = ingameInfos.map((info, idx) =>
      idx === index ? { ...info, position } : info,
    );
    setIngameInfos(updatedIngameInfos);
  };

  const handleChampionChange = (champion: string, index: number) => {
    const updatedIngameInfos = ingameInfos.map((info, idx) =>
      idx === index ? { ...info, champion } : info,
    );
    setIngameInfos(updatedIngameInfos);
  };

  const handleTierChange = (tier: string, index: number) => {
    const updatedIngameInfos = ingameInfos.map((info, idx) =>
      idx === index ? { ...info, tier } : info,
    );
    setIngameInfos(updatedIngameInfos);
  };

  const removeIngameInfo = (index: number): void => {
    setIngameInfos(ingameInfos.filter((_, idx) => idx !== index));
  };

  // 챔피언 선택 부분에 들어갈 챔피언 이름 데이터 받아오기
  useEffect(() => {
    if (!isClickedFirst.current) {
      history.pushState(null, '', '');
      isClickedFirst.current = true;
    }

    fetch('https://ddragon.leagueoflegends.com/cdn/14.9.1/data/ko_KR/champion.json')
      .then((response) => response.json())
      .then((data: ChampionDataProps) => {
        const loadedChampions = Object.keys(data.data).map((key) => data.data[key].name);

        const sortedChampions = loadedChampions.sort(function (a, b) {
          return a.localeCompare(b);
        });

        setChampions((prev) => [...prev, ...sortedChampions]);
      })
      .catch((error) => console.error('Error loading the champions:', error));
  }, []);

  return (
    <>
      {ingameInfos.map((ingameInfo, index) => (
        <div key={index}>
          {index === 0 ? (
            <div className='flex flex-row justify-between'>
              <div className='mb-[15px] text-[12px] text-[#333333]'>
                본인의 챔피언, 포지션, 티어를 선택해주세요.
              </div>
            </div>
          ) : (
            index === 1 && (
              <div className='flex flex-row justify-between'>
                <div className='mb-[15px] mt-[20px] text-[12px] text-[#333333]'>
                  상대의 챔피언, 포지션, 티어를 선택해주세요.
                </div>
                <hr />
              </div>
            )
          )}

          <div className='relative mb-[20px] flex flex-col overflow-hidden rounded-[30px] border-2 border-[#8A1F21] p-[20px]'>
            <div className='flex w-[100%] items-center'>
              {positions.map((pos, index) => (
                <div key={index}>
                  <input
                    type='radio'
                    name={`position-${ingameInfo.id}`}
                    id={`${pos.id}-${ingameInfo.id}`}
                    value={pos.value}
                    className='p-input-hidden'
                    onChange={() => {
                      const updatedSelectedPos = { ...selectedPos };
                      updatedSelectedPos[ingameInfo.id] = index;
                      setSelectedPos(updatedSelectedPos);

                      handlePositionChange(pos.value, ingameInfo.id);
                    }}
                    checked={selectedPos[ingameInfo.id] === index}
                  />
                  <label
                    htmlFor={`${pos.id}-${ingameInfo.id}`}
                    className={changePositionRadioStyle(
                      selectedPos[ingameInfo.id] === index,
                    )}
                  >
                    <div className='mr-1 py-1'>
                      {' '}
                      {selectedPos[ingameInfo.id] === index ? pos.svgW : pos.svg}
                    </div>
                    <div>{pos.content}</div>
                  </label>
                </div>
              ))}
              <select
                id='champions-select'
                className='p-select'
                onChange={(e) => handleChampionChange(e.target.value, index)}
              >
                {champions.map((champion, index) => (
                  <option key={index} value={champion}>
                    {champion}
                  </option>
                ))}
              </select>
              <select
                id='tiers-select'
                className='p-select'
                onChange={(e) => handleTierChange(e.target.value, index)}
              >
                {tiers.map((tier, index) => (
                  <option key={index} id={tier.id} value={tier.value}>
                    {tier.content}
                  </option>
                ))}
              </select>
              {ingameInfo.id === ingameInfos.length - 1 && ingameInfo.id > 1 ? (
                <IoIosClose
                  onClick={() => removeIngameInfo(index)}
                  className='absolute right-2 z-10 cursor-pointer text-[23px] text-[#8A1F21] '
                />
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      ))}

      {ingameInfos.length < 5 && (
        <div
          onClick={addIngameInfo}
          className='flex cursor-pointer flex-row justify-center text-[50px] text-[#333333]'
        >
          <IoAddCircleOutline className='text-[#8A1F21]' />
        </div>
      )}
    </>
  );
}
