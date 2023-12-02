import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Nome de usúario não pode estar vazio' })
  @IsString()
  readonly username: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;
}

export class SignInAndUpdateDto extends PartialType(CreateUserDto) {}
