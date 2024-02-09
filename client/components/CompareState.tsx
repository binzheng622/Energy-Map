import React from 'react';
import StateInput from './StateInput';
import EnergyPie from './EnergyPie';
import BreakdownPie from './BreakdownPie';

const CompareState = ({ side }: { side: string }) => {
  return (
    <div className='compareState'>
      <StateInput side={side} />
      <EnergyPie side={side} />
      <BreakdownPie side={side} />
    </div>
  );
};

export default CompareState;
