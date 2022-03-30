import React, { useState } from 'react';
import CalcButton from './calc-button';

const App = () => {
  const calcButtons = [
    {
      value: '+/-',
      func: () => togglePosNeg()
    },
    {
      value: '%',
      func: () => convertToPercent()
    },
    {
      value: 'CE',
      func: () => clearEntry(),
      className: 'clear'
    },
    {
      value: 'AC',
      func: () => clearAll(),
      className: 'clear'
    },
    {
      value: '7',
      func: () => selectNumber('7'),
      className: 'number'
    },
    {
      value: '8',
      func: () => selectNumber('8'),
      className: 'number'
    },
    {
      value: '9',
      func: () => selectNumber('9'),
      className: 'number'
    },
    {
      value: '&divide;',
      func: () => selectOperator('/'),
      className: 'operator'
    },
    {
      value: '4',
      func: () => selectNumber('4'),
      className: 'number'
    },
    {
      value: '5',
      func: () => selectNumber('5'),
      className: 'number'
    },
    {
      value: '6',
      func: () => selectNumber('6'),
      className: 'number'
    },
    {
      value: '&times;',
      func: () => selectOperator('*'),
      className: 'operator'
    },
    {
      value: '1',
      func: () => selectNumber('1'),
      className: 'number'
    },
    {
      value: '2',
      func: () => selectNumber('2'),
      className: 'number'
    },
    {
      value: '3',
      func: () => selectNumber('3'),
      className: 'number'
    },
    {
      value: '-',
      func: () => selectOperator('-'),
      className: 'operator'
    },
    {
      value: '0',
      func: () => selectNumber('0'),
      className: 'number'
    },
    {
      value: '.',
      func: () => selectDecimal()
    },
    {
      value: '=',
      func: () => solveEquation()
    },
    {
      value: '+',
      func: () => selectOperator('+'),
      className: 'operator'
    }
  ];

  const [screenValue, setScreenValue] = useState('0');
  const [numA, setNumA] = useState('0');
  const [numB, setNumB] = useState('');
  const [operator, setOperator] = useState('');

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

      if (operator === '/' && numB === '0') {
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
          case '*':
            formula = a * b;
            break;
          case '/':
            formula = a / b;
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
          <div className="calc-buttons-container">{calcButtons.map((calcButton, index) => <CalcButton key={index} calcButton={calcButton} />)}</div>
        </div>
      </main>
      <footer>Created by <a href="https://autumnchris.github.io/portfolio" target="_blank">Autumn Bullard</a> &copy; {new Date().getFullYear()}</footer>
    </React.Fragment>
  );
}

export default App;