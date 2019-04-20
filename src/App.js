import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Test from './components/Test'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1>GrachtenDX - DX Statistics</h1>
        <Test></Test>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            by <code>hilmarx</code>
          </p>
        </header>
      </div>
    );
  }
}

export default App;
