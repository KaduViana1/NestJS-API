import { ObjectType, Field } from '@nestjs/graphql';
import { Game } from 'src/games-graph/entities/games-graph.entity';

@ObjectType()
export class User {
  @Field()
  readonly id: string;

  @Field()
  readonly username: string;

  @Field()
  readonly email: string;

  @Field()
  readonly name: string;

  @Field()
  readonly role: string;

  @Field(() => [Game], { nullable: true })
  readonly games?: Game[];
}
