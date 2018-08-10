import createApp from 'server/create-app';
import graphqlHTTP from 'express-graphql';
import { Schema } from './schema';

const app = createApp();

app.use('/graphql', graphqlHTTP({
  schema: Schema,
  graphiql: true,
}));

module.exports = {
  app,
  async connect() {
    // empty
  },
  async disconnect() {
    // empty
  },
};
