import React from 'react'
import Product from './components/Product/Product'
import './App.css';

function App() {

  return (
    <div className="App">
        <Product
            name='LACALUT white'
            price='1600 դրամ'
            desc='Ատամները սպիտակեցնող ատամի մածուկ'
        />
    </div>
  );
}

export default App;
