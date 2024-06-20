'use client';
import { IPostVidUploadTabProps } from '@/app/types/post';
import { useState, useRef } from 'react';
import { IoVideocamOutline } from 'react-icons/io5';
import { IoLinkOutline } from 'react-icons/io5';
import { IoEaselOutline } from 'react-icons/io5';

export default function PostVidUploadTab({ items }: IPostVidUploadTabProps) {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const changeTabTitleStyle = (index: number) => {
    if (selectedTab === index) {
      return 'p-tab-title p-tab-selected';
    } else {
      return 'p-tab-title p-tab-n-selected ';
    }
  };

  const changeTabContentStyle = (index: number) => {
    return `p-tab-content ${selectedTab === index ? '' : 'hidden'}`;
  };

  return (
    <>
      <div className="absolute z-10 ml-[30px] ">
        {items.map((item, index) => (
          <button
            type="button"
            key={index}
            onClick={() => setSelectedTab(index)}
            className={changeTabTitleStyle(index)}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="text-[30px]">
                {index === 0 ? (
                  <IoVideocamOutline />
                ) : index === 1 ? (
                  <IoLinkOutline />
                ) : index === 2 ? (
                  <IoEaselOutline />
                ) : null}
              </div>
              <div className="">{item.title}</div>
            </div>
          </button>
        ))}
      </div>
      <div>
        {items.map((item, index) => (
          <div key={index} className={changeTabContentStyle(index)}>
            {item.content}
          </div>
        ))}
      </div>
    </>
  );
}
