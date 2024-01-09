import { IsString } from 'class-validator';
import { CreateGamesGraphInput } from './create-games-graph.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGamesGraphInput extends PartialType(CreateGamesGraphInput) {
  @IsString()
  @Field()
  readonly id: string;
}
