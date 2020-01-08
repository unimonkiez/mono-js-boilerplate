import graphqlHTTP from 'express-graphql';
import { getSchema } from './schema';

export const connectToApp = async (app, context) => {
  const schema = await getSchema();
  app.use('/graphql', graphqlHTTP({
    schema,
    context,
    graphiql: true,
  }));
};
