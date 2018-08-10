import React, { Component } from 'react';
import { store } from 'src/store';
import { Provider as MobxProvider } from 'mobx-react';

interface ProviderProps {
  children: JSX.Element,
}

export default class Provider extends Component<ProviderProps> {
  render() {
    const { children } = this.props;

    return (
      <MobxProvider store={store}>
        {children}
      </MobxProvider>
    );
  }
}
