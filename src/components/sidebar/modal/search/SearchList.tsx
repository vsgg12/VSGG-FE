import React from 'react';
import SearchItem from './SearchItem';

interface Props {
  postList: IGetPostDTOType[];
}

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
