import React from 'react';
import { ImSpinner } from 'react-icons/im';

const Spinner = () => {
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <ImSpinner className='text-5xl animate-spin' />
    </div>
  );
};

export default Spinner;
