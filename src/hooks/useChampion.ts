import { useState, useEffect, useCallback } from 'react';
import { ChampionDataProps, ChampionInfo } from '@/types/form';

const DDRAGON_VERSION = '15.5.1';
const BASE_URL = `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}`;

export function useChampion() {
  const [champions, setChampions] = useState<ChampionInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/data/ko_KR/champion.json`)
      .then((res) => res.json())
      .then((data: ChampionDataProps) => {
        const loadedChampions: ChampionInfo[] = Object.keys(data.data).map((key) => ({
          name: data.data[key].name,
          imageFileName: data.data[key].image.full,
        }));

        setChampions(loadedChampions.sort((a, b) => a.name.localeCompare(b.name)));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const getImageUrlByName = useCallback(
    (name: string) => {
      const target = champions.find((c) => c.name === name);
      if (!target) return '';
      return `${BASE_URL}/img/champion/${target.imageFileName}`;
    },
    [champions],
  );

  return { champions, loading, getImageUrlByName };
}
