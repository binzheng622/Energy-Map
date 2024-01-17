import React from 'react';
import CompareState from '../components/CompareState';

const CompareContainer = () => {
  return (
    <div className='compareContainer'>
      <CompareState side='left' />
      <CompareState side='right' />
    </div>
  );
};

export default CompareContainer;
