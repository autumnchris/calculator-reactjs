import React, { useState } from 'react';
import CalcButton from './CalcButton';
import calcButtons from '../data/calc-buttons';

const App = () => {
  const [screenValue, setScreenValue] = useState('0');
  const [numA, setNumA] = useState('0');
  const [numB, setNumB] = useState('');
  const [operator, setOperator] = useState('');

  function handleClick(type, value) {

    switch (type) {
      case 'number':
        selectNumber(value);
        break;
      case 'operator':
        selectOperator(value);
        break;
      case 'pos/neg':
        togglePosNeg();
        break;
      case 'percent':
        convertToPercent();
        break;
      case 'clear':
        clearEntry();
        break;
      case 'clear all':
        clearAll();
        break;
      case 'decimal':
        selectDecimal();
        break;
      case 'equals':
        solveEquation();
        break;
    }
  }

  function selectNumber(number) {
    let currentNumA = numA;
    let currentNumB = numB;

    if (!checkIfError()) {

      if (!operator) {
        if(currentNumA === '0') currentNumA = ''; 
        currentNumA += number;
        setNumA(currentNumA);
        setScreenValue(currentNumA);
      }
      else {
        if(currentNumB === '0') currentNumB = ''; 
        currentNumB += number;
        setNumB(currentNumB);
        setScreenValue(currentNumB);
      }
    }
  }

  function selectOperator(operatorValue) {

    if (!checkIfError()) {
      if(numB) solveEquation();
      setOperator(operatorValue);
    }
  }

  function solveEquation() {
    const a = Number(numA);
    const b = Number(numB);
    let formula;

    if (numB && operator) {

      if (operator === '&divide;' && numB === '0') {
        setNumA('');
        setNumB('');
        setOperator('');
        setScreenValue('ERROR');
      }
      else {
        switch (operator) {
          case '+':
            formula = a + b;
            break;
          case '-':
            formula = a - b;
            break;
          case '&times;':
            formula = a * b;
            break;
          case '&divide;':
            formula = a / b;
            break;
        }
        formula = formula.toString();
        setNumA(formula);
        setNumB('');
        setOperator('');
        setScreenValue(formula);
      }
    }
  }

  function selectDecimal() {
    let currentNumA = numA;
    let currentNumB = numB;

    if (!checkIfError()) {

      if (operator && !currentNumB.includes('.')) {
        currentNumB === '0' || currentNumB === '' ? currentNumB = '0.' : currentNumB += '.';
        setNumB(currentNumB);
        setScreenValue(currentNumB);
      }
      else if (checkIfOnNumA() && !currentNumA.includes('.')) {
        currentNumA === '0' || currentNumA === '' ? currentNumA = '0.' : currentNumA += '.';
        setNumA(currentNumA);
        setScreenValue(currentNumA);
      }
    }
  }

  function convertToPercent() {
    let currentNumA = numA;
    let currentNumB = numB;

    if (!checkIfError()) {

      if (checkIfOnNumB()) {
        currentNumB /= 100;
        currentNumB = currentNumB.toString();
        setNumB(currentNumB);
        setScreenValue(currentNumB);
      }
      else if (checkIfOnNumA()) {
        currentNumA /= 100;
        currentNumA = currentNumA.toString();
        setNumA(currentNumA);
        setScreenValue(currentNumA);
      }
    }
  }

  function togglePosNeg() {
    let currentNumA = numA;
    let currentNumB = numB;
    
    if (!checkIfError()) {

      if (checkIfOnNumB()) {
        currentNumB < 0 ? currentNumB = Math.abs(currentNumB) : currentNumB > 0 ? currentNumB = -currentNumB : currentNumB = 0;
        currentNumB = currentNumB.toString();
        setNumB(currentNumB);
        setScreenValue(currentNumB);
      }
      else if (checkIfOnNumA()) {
        currentNumA < 0 ? currentNumA = Math.abs(currentNumA) : currentNumA > 0 ? currentNumA = -currentNumA : currentNumA = 0;
        currentNumA = currentNumA.toString();
        setNumA(currentNumA);
        setScreenValue(currentNumA);
      }
    }
  }

  function clearEntry() {

    if (operator && numB) {
      setNumB('0');
      setScreenValue('0');
    }
    else if (!operator) {
      setNumA('0');
      setScreenValue('0');
    }
    else {
      setOperator('');
    }
  }

  function clearAll() {
    setNumA('0');
    setNumB('');
    setOperator('');
    setScreenValue('0');
  }

  function checkIfError() {
    return screenValue === 'ERROR' ? true : false;
  }

  function checkIfOnNumA() {
    return !numB && !operator ? true : false;
  }

  function checkIfOnNumB() {
    return numB ? true : false;
  }

  return (
    <React.Fragment>
      <header>
      <h1>Calculator</h1>
      </header>
      <main>
        <div className="calculator">
          <div className="screen">{screenValue}</div>
          <div className="calc-buttons-container">{calcButtons.map(calcButton => <CalcButton key={calcButton.id} calcButton={calcButton} handleClick={handleClick} />)}</div>
        </div>
      </main>
      <footer>Created by <a href="https://autumnchris.github.io/portfolio" target="_blank">Autumn Bullard</a> &copy; {new Date().getFullYear()}</footer>
    </React.Fragment>
  );
}

export default App;
