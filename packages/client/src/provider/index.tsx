import React from 'react';
import { ApolloProvider } from './apollo';

interface IProviderProps {
  children?: JSX.Element
}

export const Provider = ({ children }: IProviderProps) => (
  <ApolloProvider>
    {children}
  </ApolloProvider>
);
