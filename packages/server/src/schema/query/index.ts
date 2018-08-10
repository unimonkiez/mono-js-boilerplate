import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import devPrivateKey from 'src/pem/dev-private-key.pem';

export const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    getKey: {
      type: GraphQLString,
      resolve() {
        return devPrivateKey;
      },
    },
  },
});
