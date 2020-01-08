import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider as InnerApolloProvider } from '@apollo/client';
import { resolver } from 'src/resolver';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
  resolvers: resolver,
});

interface IApolloProviderProps {
  children?: JSX.Element
}

export const ApolloProvider = ({ children }: IApolloProviderProps) => (
  <InnerApolloProvider client={client}>
    {children}
  </InnerApolloProvider>
);
