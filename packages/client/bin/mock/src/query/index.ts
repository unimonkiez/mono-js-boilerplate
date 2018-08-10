import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    getKey: {
      type: GraphQLString,
      resolve() {
        return 'Mock key';
      },
    },
  },
});
