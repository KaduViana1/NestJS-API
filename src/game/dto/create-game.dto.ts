import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty({ message: 'Nome do jogo não pode estar vazio' })
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly publisher: string;

  @IsString()
  @IsNotEmpty()
  readonly developer: string;

  @IsDateString()
  readonly releaseDate: Date;
}
