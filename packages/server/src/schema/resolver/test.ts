import {
  Resolver, Mutation, Arg,
} from 'type-graphql';
import { snooz } from '../snooz';

@Resolver()
export class TestResolver {
  private hidden;

  @Mutation(returns => Boolean)
  async test(
  @Arg('prop') prop: string,
  ) {
    this.hidden = prop;
    console.log(prop);

    await snooz(3000);
    return true;
  }
}
