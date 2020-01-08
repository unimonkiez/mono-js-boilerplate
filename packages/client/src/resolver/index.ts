import { Resolvers } from '@apollo/client';
import { query } from './query';
import { mutation } from './mutation';

export const resolver: Resolvers = {
  Query: query,
  Mutation: mutation,
};
