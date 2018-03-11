import React, { Component } from 'react';
import SearchBar from './../SearchBar/SearchBar';
import MediaContainer from './../MediaContainer/MediaContainer';
import Pagination from './../Pagination/Pagination';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <MediaContainer />
        <SearchBar />
        <Pagination />
      </div>
    );
  }
}

export default App;
