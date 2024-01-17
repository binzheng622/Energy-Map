import React from 'react';
import { useSelector } from 'react-redux';
import EnergyBar from './EnergyBar';
import BreakdownBar from './BreakdownBar';

const StateDetail = () => {
  const stateName: string = useSelector(
    (state: any) => state.states.hoverState.state
  );

  return (
    <div className='stateDetail'>
      <h1 className='stateTitle'>{stateName}</h1>
      <EnergyBar />
      <BreakdownBar />
    </div>
  );
};

export default StateDetail;
