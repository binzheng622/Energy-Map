import React from 'react';
import HeaderContainer from './HeaderContainer.jsx';
import StateContainer from './StateContainer.jsx';
import CompareContainer from './CompareContainer.jsx';

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
