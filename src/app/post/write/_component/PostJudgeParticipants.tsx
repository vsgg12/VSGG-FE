import Image from 'next/image';
import { ChangeEvent, SetStateAction, useEffect, useRef, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { IoAddCircleOutline } from 'react-icons/io5';
import { ChampionDataProps } from '@/types/form';
import { positionInfo } from '@/data/championData';

const tiers = [
  { content: '티어 선택' },
  { content: '언랭' },
  { content: '아이언' },
  { content: '브론즈' },
  { content: '실버' },
  { content: '골드' },
  { content: '플래티넘' },
  { content: '에메랄드' },
  { content: '다이아' },
  { content: '마스터' },
  { content: '그랜드마스터' },
  { content: '챌린저' },
];

interface IPostJedgeParticipantsProps {
  setInGameInfoRequest: React.Dispatch<SetStateAction<IIngameInfoRequestType[]>>;
}

export default function PostJudgeParticipants({
  setInGameInfoRequest,
}: IPostJedgeParticipantsProps) {
  const [selectedPos, setSelectedPos] = useState<{ [key: number]: number }>({
    0: 0,
    1: 0,
  });
  const [ingameInfos, setIngameInfos] = useState<IInGameInfoType[]>([
    { id: 0, position: 'TOP', championName: '', tier: '' },
    { id: 1, position: 'TOP', championName: '', tier: '' },
  ]);
  const isClickedFirst = useRef(false); //뒤로가기 방지용
  const [champions, setChampions] = useState<string[]>(['챔피언 선택']);

  const changePositionRadioStyle = (checked: boolean) => {
    return checked ? 'p-position p-position-selected' : 'p-position p-position-n-selected';
  };

  const addIngameInfo = (): void => {
    const newInfo = {
      id: ingameInfos.length,
      position: 'TOP',
      championName: '',
      tier: '',
    };
    setIngameInfos(ingameInfos.concat(newInfo));

    const updatedSelectedPos = {
      ...selectedPos,
      [newInfo.id]: 0,
    };
    setSelectedPos(updatedSelectedPos);
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

  const handlePositionChange = (index: number, ingameInfoId: number) => {
    const newPosition = positionInfo[index].name;
    setIngameInfos((prevInfos) =>
      prevInfos.map((info) =>
        info.id === ingameInfoId ? { ...info, position: newPosition } : info,
      ),
    );

    const updatedSelectedPos = { ...selectedPos };
    updatedSelectedPos[ingameInfoId] = index;
    setSelectedPos(updatedSelectedPos);
  };

  const handleChampionChange = (event: ChangeEvent<HTMLSelectElement>, ingameInfoId: number) => {
    const newChampionName = event.target.value;
    setIngameInfos((prevInfos) =>
      prevInfos.map((info) =>
        info.id === ingameInfoId ? { ...info, championName: newChampionName } : info,
      ),
    );
  };

  const handleTierChange = (event: ChangeEvent<HTMLSelectElement>, ingameInfoId: number) => {
    const newTier = event.target.value;
    setIngameInfos((prevInfos) =>
      prevInfos.map((info) => (info.id === ingameInfoId ? { ...info, tier: newTier } : info)),
    );
  };

  useEffect(() => {
    const updatedInGameInfoRequest = ingameInfos.map((info) => ({
      championName: info.championName,
      position: info.position,
      tier: info.tier,
    }));
    setInGameInfoRequest(updatedInGameInfoRequest);
  }, [ingameInfos, setInGameInfoRequest]);

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
              {positionInfo.map((pos, index) => (
                <div key={index}>
                  <input
                    type='radio'
                    name={`${pos.name}-${ingameInfo.id}`}
                    value={pos.name}
                    className='p-input-hidden'
                    onChange={() => handlePositionChange(index, ingameInfo.id)}
                    checked={selectedPos[ingameInfo.id] === index}
                  />
                  <label
                    htmlFor={`${pos.name}-${ingameInfo.id}`}
                    className={changePositionRadioStyle(selectedPos[ingameInfo.id] === index)}
                  >
                    <div className='mr-1 py-1'>
                      {' '}
                      {selectedPos[ingameInfo.id] === index ? (
                        <Image alt='position svgw' width={24} height={24} src={pos.svgw} />
                      ) : (
                        <Image alt='position svg' width={24} height={24} src={pos.svg} />
                      )}
                    </div>
                    <div>{pos.name}</div>
                  </label>
                </div>
              ))}
              <select
                id='champions-select'
                className='p-select'
                onChange={(e) => handleChampionChange(e, ingameInfo.id)}
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
                onChange={(e) => handleTierChange(e, ingameInfo.id)}
              >
                {tiers.map((tier, index) => (
                  <option key={index} value={tier.content}>
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
