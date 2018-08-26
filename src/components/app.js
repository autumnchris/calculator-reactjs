import React, { Component } from 'react';
import ButtonGroup from './button-group';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      screenValue: '0',
      buttons: [
        {
          value: '+/-'
        },
        {
          value: '%'
        },
        {
          value: 'CE',
          className: 'clear'
        },
        {
          value: 'AC',
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
          func: () => this.selectOperator('/')
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
          func: () => this.selectOperator('*')
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
          func: () => this.selectOperator('-')
        },
        {
          value: '0',
          func: () => this.selectNumber('0'),
          className: 'number'
        },
        {
          value: '.'
        },
        {
          value: '='
        },
        {
          value: '+',
          func: () => this.selectOperator('+')
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

    if (this.result.charAt(this.result.length - 1).match(/\s/)) {
      this.result = this.result.substr(0, this.result.length - 3);
    }
    this.result += ` ${elem} `;
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
            <ButtonGroup buttons={this.state.buttons} />
          </div>
        </main>
        {/* FOOTER */}
        <footer>Coded by <a href="../portfolio" target="_blank">Autumn Bullard</a></footer>
      </div>
    );
  }
}
