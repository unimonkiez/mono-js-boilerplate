import graphqlHTTP from 'express-graphql';
import { Schema } from './schema';

export const connectToApp = (app) => {
  app.use('/graphql', graphqlHTTP({
    schema: Schema,
    graphiql: __DEV__,
  }));
};
