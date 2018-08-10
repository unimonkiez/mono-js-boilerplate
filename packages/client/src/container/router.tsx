import React, { Component } from 'react';
import MobxHoc from 'src/provider/mobx-react/hoc';

interface RepoDataProps {
  // Injected - Start
  ActiveComponent?: any,
  // Injected - End
}

@MobxHoc((store): RepoDataProps => ({
  ActiveComponent: store.activeComponent,
  }))
export class Router extends Component<RepoDataProps> {
  render() {
    const {
      ActiveComponent,
    } = this.props;

    return (
      <ActiveComponent />
    );
  }
}
