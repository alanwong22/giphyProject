import React, { Component } from 'react';
import SearchBar from './../SearchBar/SearchBar';
import './App.css';

class App extends Component {
  onFocus() {
    console.log("FOCUS");
  }
  render() {
    return (
      <div className="App">
        <SearchBar />
      </div>
    );
  }
}

export default App;
