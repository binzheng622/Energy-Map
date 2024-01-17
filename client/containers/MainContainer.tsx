import React from 'react';
import HeaderContainer from './HeaderContainer';
import StateContainer from './StateContainer';
import CompareContainer from './CompareContainer';

const MainContainer = () => {
  return (
    <div className='mainContainer'>
      <HeaderContainer />
      <StateContainer />
      <CompareContainer />
    </div>
  );
};

export default MainContainer;
