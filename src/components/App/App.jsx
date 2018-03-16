import React, { Component } from 'react';
import { Route } from "react-router-dom";
import SearchBar from './../SearchBar/SearchBar';

import './App.css';

import asyncComponent from "./../AsyncComponent";

const GIFDefinition = asyncComponent(() => import('./../../pages/GIFDefinition'));
const MediaContainer = asyncComponent(() => import('./../MediaContainer/MediaContainer'));

class App extends Component {

  render() {
    return (
      <div className="App">
        <Route path="/" exact component={MediaContainer} />
        <Route path="/gif" exact component={GIFDefinition} />
        <SearchBar />
      </div>
    );
  }
}

export default App;
