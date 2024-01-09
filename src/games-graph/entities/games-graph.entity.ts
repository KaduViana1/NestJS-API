import { ObjectType, Field, GraphQLISODateTime, ID } from '@nestjs/graphql';
import { User } from 'src/user-graph/entities/user-graph.entity';

@ObjectType()
export class Game {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  publisher: string;

  @Field()
  developer: string;

  @Field(() => GraphQLISODateTime)
  releaseDate: string;

  @Field(() => [User], { nullable: true })
  users?: User[];
}
