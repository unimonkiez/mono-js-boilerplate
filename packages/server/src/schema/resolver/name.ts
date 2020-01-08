import {
  Resolver, Query, Mutation, Arg,
} from 'type-graphql';

@Resolver()
export class NameResolver {
  private name = '1232';

  @Query(returns => String)
  get() {
    return this.name;
  }

  @Mutation(returns => String)
  set(
  @Arg('value') name: string,
  ) {
    this.name = name;
    return name;
  }
}
