import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom'
import Main from './Main'
import SearchUI from './SearchUI'
import Demo from './Demo'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Route path="/user/:hash" component={Main}/>
          <Route path="/demo" component={Demo}/>
          <Route exact path="/" component={SearchUI}/>
      </BrowserRouter>
    );
  }
}

export default App;
