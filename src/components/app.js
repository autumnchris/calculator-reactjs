import React from 'react';
import CalcButton from './calc-button';

class App extends React.Component {

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
    this.endsWithOperator = this.result.charAt(this.result.length - 1).match(/\s/);
  }

  selectNumber(number) {
    this.result = this.result.split(' ');

    if (this.result[this.result.length - 1] === '0') {
      this.result[this.result.length - 1] = this.result[this.result.length - 1].substr(1);
    }
    this.result[this.result.length - 1] += number;
    this.setState({
      screenValue: this.result[this.result.length - 1]
    });
    this.result = this.result.join(' ');
  }

  selectOperator(operator) {
    this.solveEquation();

    if (this.endsWithOperator) {
      this.result = this.result.substr(0, this.result.length - 3);
    }
    this.result += ` ${operator} `;
  }

  togglePosNeg() {

    if (!this.endsWithOperator) {
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

    if (!this.endsWithOperator) {
      this.result = this.result.split(' ');
      this.result[this.result.length - 1] /= 100;
      this.setState({
        screenValue: this.result[this.result.length - 1]
      });
      this.result = this.result.join(' ');
    }
  }

  clearEntry() {

    if (!this.endsWithOperator) {
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

    if (!this.endsWithOperator) {
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

  solveEquation() {
    let a;
    let b;

    if (this.result.includes(' ') && !this.endsWithOperator) {
      this.result = this.result.split(' ');
      a = Number(this.result[0]);
      b = Number(this.result[2]);

      switch (this.result[1]) {
        case '+':
          this.result = a + b;
          break;
        case '-':
          this.result = a - b;
          break;
        case '*':
          this.result = a * b;
          break;
        case '/':
          this.result = a / b;
      }
      this.result = this.result.toString();
      this.setState({
        screenValue: this.result
      });
    }
  }

  setKeys(event) {
    event.preventDefault();

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
            this.solveEquation();
            break;
          // option/alt
          case 18:
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
            break;
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
      <React.Fragment>
        <header>
          <h1>Calculator</h1>
        </header>
        <main>
          <div className="calculator">
            <div className="screen">{this.state.screenValue}</div>
            <div className="calc-buttons-container">{this.state.calcButtons.map((calcButton, index) => <CalcButton key={index} calcButton={calcButton} />)}</div>
          </div>
        </main>
        <footer>Created by <a href="https://autumnchris.github.io/portfolio" target="_blank">Autumn Bullard</a> &copy; {new Date().getFullYear()}</footer>
      </React.Fragment>
    );
  }
}

export default App;
