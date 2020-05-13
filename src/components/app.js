import React, { Component } from 'react';
import CalcButton from './calc-button';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      screenValue: '0',
      calcButtons: [
        {
          value: '+/-',
          func: () => this.togglePosNeg()
        },
        {
          value: '%',
          func: () => this.convertToPercent()
        },
        {
          value: 'CE',
          func: () => this.clearEntry(),
          className: 'clear'
        },
        {
          value: 'AC',
          func: () => this.clearAll(),
          className: 'clear'
        },
        {
          value: '7',
          func: () => this.selectNumber('7'),
          className: 'number'
        },
        {
          value: '8',
          func: () => this.selectNumber('8'),
          className: 'number'
        },
        {
          value: '9',
          func: () => this.selectNumber('9'),
          className: 'number'
        },
        {
          value: '&divide;',
          func: () => this.selectOperator('/'),
          className: 'operator'
        },
        {
          value: '4',
          func: () => this.selectNumber('4'),
          className: 'number'
        },
        {
          value: '5',
          func: () => this.selectNumber('5'),
          className: 'number'
        },
        {
          value: '6',
          func: () => this.selectNumber('6'),
          className: 'number'
        },
        {
          value: '&times;',
          func: () => this.selectOperator('*'),
          className: 'operator'
        },
        {
          value: '1',
          func: () => this.selectNumber('1'),
          className: 'number'
        },
        {
          value: '2',
          func: () => this.selectNumber('2'),
          className: 'number'
        },
        {
          value: '3',
          func: () => this.selectNumber('3'),
          className: 'number'
        },
        {
          value: '-',
          func: () => this.selectOperator('-'),
          className: 'operator'
        },
        {
          value: '0',
          func: () => this.selectNumber('0'),
          className: 'number'
        },
        {
          value: '.',
          func: () => this.selectDecimal()
        },
        {
          value: '=',
          func: () => this.solveEquation()
        },
        {
          value: '+',
          func: () => this.selectOperator('+'),
          className: 'operator'
        }
      ]
    };
    this.result = '0';
  }

  selectNumber(elem) {
    this.result = this.result.split(' ');

    if (this.result[this.result.length - 1] === '0') {
      this.result[this.result.length - 1] = this.result[this.result.length - 1].substr(1);
    }
    this.result[this.result.length - 1] += elem;
    this.setState({
      screenValue: this.result[this.result.length - 1]
    });
    this.result = this.result.join(' ');
  }

  selectOperator(elem) {
    this.solveEquation();

    if (this.result.charAt(this.result.length - 1).match(/\s/)) {
      this.result = this.result.substr(0, this.result.length - 3);
    }
    this.result += ` ${elem} `;
  }

  solveEquation() {
    let num1;
    let num2;

    if (this.result.includes(' ') && !this.result.charAt(this.result.length - 1).match(/\s/)) {
      this.result = this.result.split(' ');
      num1 = Number(this.result[0]);
      num2 = Number(this.result[2]);

      switch (this.result[1]) {
        case '+':
          this.result = num1 + num2;
          break;
        case '-':
          this.result = num1 - num2;
          break;
        case '*':
          this.result = num1 * num2;
          break;
        case '/':
          this.result = num1 / num2;
      }
      this.result = this.result.toString();
      this.setState({
        screenValue: this.result
      });
    }
  }

  togglePosNeg() {

    if (!this.result.charAt(this.result.length - 1).match(/\s/)) {
      this.result = this.result.split(' ');

      if (this.result[this.result.length - 1] < 0) {
        this.result[this.result.length - 1] = Math.abs(this.result[this.result.length - 1]);
      }
      else if (this.result[this.result.length - 1] > 0) {
        this.result[this.result.length - 1] = -this.result[this.result.length - 1];
      }
      else {
        this.result[this.result.length - 1] = 0;
      }
      this.setState({
        screenValue: this.result[this.result.length - 1]
      });
      this.result = this.result.join(' ');
    }
  }

  convertToPercent() {

    if (!this.result.charAt(this.result.length - 1).match(/\s/)) {
      this.result = this.result.split(' ');
      this.result[this.result.length - 1] /= 100;
      this.setState({
        screenValue: this.result[this.result.length - 1]
      });
      this.result = this.result.join(' ');
    }
  }

  clearEntry() {

    if (!this.result.charAt(this.result.length - 1).match(/\s/)) {
      this.result = this.result.split(' ');
      this.result[this.result.length - 1] = '0';
      this.setState({
        screenValue: this.result[this.result.length - 1]
      });
      this.result = this.result.join(' ');
    }
    else {
      this.result = this.result.substr(0, this.result.length - 3);
    }
  }

  clearAll() {
    this.result = '0';
    this.setState({
      screenValue: '0'
    });
  }

  selectDecimal() {

    if (!this.result.charAt(this.result.length - 1).match(/\s/)) {
      this.result = this.result.split(' ');

      if (!this.result[this.result.length - 1].includes('.')){
        this.result[this.result.length - 1] += '.';
        this.setState({
          screenValue: this.result[this.result.length - 1]
        });
      }
      this.result = this.result.join(' ');
    }
  }

  setKeys(event) {

    if (event.shiftKey) {
      switch (event.keyCode) {
        // plus sign
        case 187:
          this.selectOperator(event.key);
          break;
        // multiplication sign
        case 56:
          this.selectOperator(event.key);
          break;
        // percentage
        case 53:
          this.convertToPercent();
      }
    }
    else {
      if (event.keyCode >= 48 && event.keyCode <= 57) {
        this.selectNumber(event.key);
      }
      else {
        switch (event.keyCode) {
          // minus sign
          case 189:
            this.selectOperator(event.key);
            break;
          // division sign
          case 191:
            this.selectOperator(event.key);
            break;
          // equal sign
          case 187:
          // enter
          case 13:
            this.solveEquation();
            break;
          // spacebar
          case 32:
            this.togglePosNeg();
            break;
          // delete/backspace
          case 8:
            this.clearEntry();
            break;
          // escape
          case 27:
            this.clearAll();
            break;
          // decimal/period
          case 190:
            this.selectDecimal();
        }
      }
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', (event) => {
      this.setKeys(event);
    });
  }

  render() {
    return (
      <div className="body">
        {/* HEADER */}
        <header>
          <h1>Calculator</h1>
        </header>
        <main>
          <div className="calculator">
            {/* CALCULATOR SCREEN */}
            <div className="screen">{this.state.screenValue}</div>
            {/* CALCULATOR BUTTONS */}
            <div className="calc-buttons-container">{this.state.calcButtons.map((calcButton, index) => <CalcButton key={index} calcButton={calcButton} />)}</div>
          </div>
        </main>
        {/* FOOTER */}
        <footer>Created by <a href="https://autumnbullard-portfolio.herokuapp.com" target="_blank">Autumn Bullard</a> &copy; {new Date().getFullYear()}</footer>
      </div>
    );
  }
}
