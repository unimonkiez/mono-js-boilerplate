import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
} from 'graphql';
import { snooz } from '../snooz';

export const Mutations = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    test: {
      type: GraphQLBoolean,
      args: {
        prop: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      async resolve() {
        await snooz(3000);
        return true;
      },
    },
  },
});
