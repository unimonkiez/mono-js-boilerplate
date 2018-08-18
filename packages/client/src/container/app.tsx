import React, { Component } from 'react';
import Provider from 'src/provider';
import { MobxRouter } from 'mobx-router';

export default class App extends Component {
  render() {
    return (
      <Provider>
        <MobxRouter />
      </Provider>
    );
  }
}
