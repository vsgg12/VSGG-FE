import React from 'react';
import SearchItem from './SearchItem';

interface Props {
  postList: IGetPostDTOType[];
}

// 검색 결과 리스트
function SearchList({ postList }: Props) {
  return (
    <>
      {postList.map((postItem) => (
        <SearchItem postItem={postItem} key={postItem.id} />
      ))}
    </>
  );
}

export default SearchList;