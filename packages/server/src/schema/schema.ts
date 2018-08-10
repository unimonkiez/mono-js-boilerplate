import {
  GraphQLSchema,
} from 'graphql';
import { RootQuery } from './query';
import { Mutations } from './mutation';

export const Schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations,
});
