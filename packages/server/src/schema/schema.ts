import { buildSchema } from 'type-graphql';
import { resolvers } from './resolver';

export const getSchema = async () => {
  const schema = await buildSchema({
    resolvers,
  });

  return schema;
};
