import React, { Component } from 'react';
import SearchBar from './../SearchBar/SearchBar';
import MediaContainer from './../MediaContainer/MediaContainer';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <SearchBar />
        <MediaContainer />
      </div>
    );
  }
}

export default App;
