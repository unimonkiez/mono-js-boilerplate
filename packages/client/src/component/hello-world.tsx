import React from 'react';

interface HelloWorldProps {
  name: string,
  onNameChange: (String) => void,
}

export const HelloWorld = ({
  name,
  onNameChange,
}: HelloWorldProps) => (
  <h2>
    Hello
    &nbsp;
    <input value={name} onChange={(e) => { onNameChange(e.target.value); }} />
    {}
  </h2>
);
