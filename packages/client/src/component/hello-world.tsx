import React, { Component } from 'react';
import PropTypes from 'prop-types';

interface HelloWorldProps {
  name: string,
  onNameChange: (String) => void,
}

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
      <h2>
        Hello
        &nbsp;
        <input value={name} onChange={(e) => { onNameChange(e.target.value); }} />
        {}
      </h2>
    );
  }
}
