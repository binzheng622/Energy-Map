import React from 'react';
import StateInput from './StateInput.jsx';
import EnergyPie from './EnergyPie.jsx';
import BreakdownPie from './BreakdownPie.jsx';

const CompareState = ({ side }) => {
  return (
    <div className='compareState'>
      <StateInput side={side} />
      <EnergyPie side={side} />
      <BreakdownPie side={side} />
    </div>
  );
};

export default CompareState;
