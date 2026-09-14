import React from 'react';
import AdditionalOptionList from './AdditionalOptionList';

function AdditionalOptionModal() {
  return (
    <div className='w-[192px] h-[265px] rounded-[10px] bg-semantic-background-surface z-[1000]'>
      <AdditionalOptionList />
    </div>
  );
}

export default AdditionalOptionModal;
