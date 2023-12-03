import React from 'react';
import { useSelector } from 'react-redux';
import EnergyBar from './EnergyBar.jsx';
import BreakdownBar from './BreakdownBar.jsx';

const StateDetail = () => {
  const stateName = useSelector((state) => state.states.hoverState.state);

  return (
    <div className='stateDetail'>
      <h1 className='stateTitle'>{stateName}</h1>
      <EnergyBar />
      <BreakdownBar />
    </div>
  );
};

export default StateDetail;
