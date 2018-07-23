import React, { Component } from 'react';

export default class App extends Component {

  constructor(props) {
    super(props);
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
            <div className="button-row">
              <button type="button">+/-</button>
              <button type="button">%</button>
              <button type="button" className="clear">CE</button>
              <button type="button" className="clear">AC</button>
            </div>
            <div className="button-row">
              <button type="button" className="number">7</button>
              <button type="button" className="number">8</button>
              <button type="button" className="number">9</button>
              <button type="button">&divide;</button>
            </div>
            <div className="button-row">
              <button type="button" className="number">4</button>
              <button type="button" className="number">5</button>
              <button type="button" className="number">6</button>
              <button type="button">&times;</button>
            </div>
            <div className="button-row">
              <button type="button" className="number">1</button>
              <button type="button" className="number">2</button>
              <button type="button" className="number">3</button>
              <button type="button">-</button>
            </div>
            <div className="button-row">
              <button type="button" className="number">0</button>
              <button type="button">.</button>
              <button type="button">=</button>
              <button type="button">+</button>
            </div>
          </div>
        </main>
        {/* FOOTER */}
        <footer>Coded by <a href="../portfolio" target="_blank">Autumn Bullard</a></footer>
      </div>
    );
  }
}
