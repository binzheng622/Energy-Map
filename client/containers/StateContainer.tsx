import React from 'react';
import StateMap from '../components/StateMap';
import StateDetail from '../components/StateDetail';

const StateContainer = () => {
  return (
    <div className='stateContainer'>
      <StateMap />
      <StateDetail />
    </div>
  );
};

export default StateContainer;
