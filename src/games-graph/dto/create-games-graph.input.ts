import { InputType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateGamesGraphInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  readonly publisher: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  readonly developer: string;

  @IsDateString()
  @IsNotEmpty()
  @Field(() => GraphQLISODateTime)
  readonly releaseDate: Date;
}
