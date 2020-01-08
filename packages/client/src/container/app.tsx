import React, { Component } from 'react';
import { Provider } from 'src/provider';
import { Router } from './router';

export default class App extends Component {
  render() {
    return (
      <Provider>
        <Router />
      </Provider>
    );
  }
}
