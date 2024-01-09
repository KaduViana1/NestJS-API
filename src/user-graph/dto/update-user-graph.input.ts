import { CreateUserGraphInput } from './create-user-graph.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserGraphInput extends PartialType(CreateUserGraphInput) {
  @Field()
  id: string;
}
