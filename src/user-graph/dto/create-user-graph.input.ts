import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserGraphInput {
  @Field()
  @IsNotEmpty({ message: 'Nome de usúario não pode estar vazio' })
  @IsString()
  readonly username: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
