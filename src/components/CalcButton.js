import React from 'react';

const CalcButton = ({ calcButton, handleClick }) => {

  return (
    <button type="button" className={`button calc-button ${typeof calcButton.className !== 'undefined' ? calcButton.className : ''}`} dangerouslySetInnerHTML={{__html: calcButton.value === '/' ? '&divide;' : calcButton.value === '*' ? '&times;' : calcButton.value}} onClick={() => handleClick(calcButton.type, calcButton.value)} />
  );
}

export default CalcButton;
