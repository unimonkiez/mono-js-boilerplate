import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { HelloWorld as HelloWorldComponent } from '../component/hello-world';

const GET_NAME = gql`
  query {
    name @client
  }
`;

const SET_NAME = gql`
  mutation SetName($name: String!) {
    setName(name: $name) @client
  }
`;

interface INameData {
  name: string,
}

export const HelloWorld = () => {
  const { data, loading } = useQuery<INameData>(GET_NAME);
  const [setName] = useMutation(SET_NAME);

  if (loading) {
    return null;
  }

  return (
    <HelloWorldComponent
      name={data.name}
      onNameChange={(newName) => {
        setName({ variables: { name: newName } });
      }}
    />
  );
};
