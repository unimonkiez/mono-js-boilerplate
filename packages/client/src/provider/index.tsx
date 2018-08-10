import React, { Component } from 'react';
import MobixProvider from './mobx-react/provider';


interface ProviderProps {
  children: JSX.Element
}

export default class Provider extends Component<ProviderProps> {
  render() {
    const { children } = this.props;
    return (
      <MobixProvider>
        {children}
      </MobixProvider>
    );
  }
}
