import React from 'react';

const CalcButton = ({ calcButton }) => {

  return (
    <button type="button" className={`button calc-button ${typeof calcButton.className !== 'undefined' ? calcButton.className : ''}`} dangerouslySetInnerHTML={{__html: calcButton.value}} onClick={calcButton.func} />
  );
}

export default CalcButton;
