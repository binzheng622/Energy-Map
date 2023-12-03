import React from 'react';
import { useDispatch } from 'react-redux';
import { updateState1, updateState2 } from '../reducers/stateReducer.js';
import StateName from '../assets/stateName.js';

const StateInput = ({ side }) => {
  const dispatch = useDispatch();

  const dropFetch = (e) => {
    e.preventDefault();
    const stateSelected = document.getElementById(`${side}`).value;

    fetch(`/data/${stateSelected}`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        if (side === 'left') {
          dispatch(updateState1(data));
        } else if (side === 'right') {
          dispatch(updateState2(data));
        }
      })
      .catch((error) => console.log(error));
  };

  const stateArray = [];
  StateName.forEach((state) => {
    stateArray.push(<option value={state}>{state}</option>);
  });

  return (
    <div className='stateInput'>
      <p>Search by state</p>
      <form>
        <label>Please select a state or territory: </label>
        <select id={`${side}`}>{stateArray}</select>
        <button onClick={dropFetch}>Search</button>
      </form>
    </div>
  );
};

export default StateInput;
