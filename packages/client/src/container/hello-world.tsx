import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { HelloWorld as HelloWorldComponent } from '../component/hello-world';

const GET_NAME = gql`
  query {
    name @client
  }
`;

interface INameData {
  name: string,
}


export const HelloWorld = () => {
  const { data, client } = useQuery<INameData>(GET_NAME);

  return (
    <HelloWorldComponent
      name={data.name}
      onNameChange={(newName) => {
        client.writeData({
          data: {
            name: newName,
          },
        });
      }}
    />
  );
};
