import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Calculator from './components/Calculator';

const App = () => {

  return (
    <React.Fragment>
      <Header />
      <main>
        <Calculator />
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default App;
