import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
// import { UpdateGameDto } from './dto/update-game.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Game } from '@prisma/client';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createGameDto: CreateGameDto): Promise<Game> {
    const { name, publisher, developer } = createGameDto;
    const releaseDate = new Date(createGameDto.releaseDate).toISOString();
    try {
      const newGame = await this.prisma.game.create({
        data: { name, publisher, developer, releaseDate },
      });

      return newGame;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  async findAll(): Promise<Game[]> {
    const games = await this.prisma.game.findMany();
    return games;
  }

  async findOne(id: string): Promise<Game> {
    try {
      const game = await this.prisma.game.findUnique({
        where: {
          id,
        },
      });
      return game;
    } catch (error) {
      throw new ForbiddenException('Jogo não encontrado');
    }
  }

  // update(id: number, updateGameDto: UpdateGameDto) {
  //   return `This action updates a #${id} game`;
  // }

  async remove(id: string) {
    try {
      await this.prisma.game.delete({ where: { id } });
      return `Game deleted`;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}
