import React, { Component } from 'react';
import MobxHoc from 'src/provider/mobx-react/hoc';
import PropTypes from 'prop-types';
import { HelloWorld as HelloWorldComponent } from '../component/hello-world';

interface HelloWorldProps {
  // Injected - Start
  name?: string,
  onNameChange?: (String) => void,
  // Injected - End
}

@MobxHoc((store): HelloWorldProps => ({
  name: store.name,
  onNameChange: store.setName,
  }))
export class HelloWorld extends Component<HelloWorldProps> {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onNameChange: PropTypes.func.isRequired,
  };

  render() {
    const {
      name,
      onNameChange,
    } = this.props;

    return (
      <HelloWorldComponent
        name={name}
        onNameChange={onNameChange}
      />
    );
  }
}
