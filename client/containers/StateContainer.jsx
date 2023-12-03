import React from 'react';
import StateMap from '../components/StateMap.jsx';
import StateDetail from '../components/StateDetail.jsx';

const StateContainer = () => {
  return (
    <div className='stateContainer'>
      <StateMap />
      <StateDetail />
    </div>
  );
};

export default StateContainer;
