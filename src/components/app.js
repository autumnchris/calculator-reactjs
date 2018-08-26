import React, { Component } from 'react';
import ButtonGroup from './button-group';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
          className: 'number'
        },
        {
          value: '8',
          className: 'number'
        },
        {
          value: '9',
          className: 'number'
        },
        {
          value: '&divide;'
        },
        {
          value: '4',
          className: 'number'
        },
        {
          value: '5',
          className: 'number'
        },
        {
          value: '6',
          className: 'number'
        },
        {
          value: '&times;'
        },
        {
          value: '1',
          className: 'number'
        },
        {
          value: '2',
          className: 'number'
        },
        {
          value: '3',
          className: 'number'
        },
        {
          value: '-'
        },
        {
          value: '0',
          className: 'number'
        },
        {
          value: '.'
        },
        {
          value: '='
        },
        {
          value: '+'
        }
      ]
    };
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
            <div className="screen">0</div>
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
