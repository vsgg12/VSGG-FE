import { useEffect, useMemo, useRef, useState } from 'react';
import { getInitialConsonants } from '@/utils/truncateText';

interface UseSearchDropdownParams<T> {
  list: T[];
  getText: (item: T) => string;
}

export const useSearchDropdown = <T>({ list, getText }: UseSearchDropdownParams<T>) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const boxRef = useRef<HTMLDivElement>(null);

  /** 외부 클릭 닫기 */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /** 초성 + 문자열 필터 */
  const filteredList = useMemo(() => {
    if (!query) return list;

    const lowerQuery = query.toLowerCase();
    const queryInitial = getInitialConsonants(lowerQuery);

    return list.filter((item) => {
      const text = getText(item).toLowerCase();
      const initial = getInitialConsonants(text);

      return text.includes(lowerQuery) || initial.includes(queryInitial);
    });
  }, [query, list, getText]);

  return {
    open,
    setOpen,
    query,
    setQuery,
    boxRef,
    filteredList,
  };
};
